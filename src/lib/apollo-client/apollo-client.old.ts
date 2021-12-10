import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, Observable } from "apollo-link";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from '~/lib/accessToken';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";
import { api } from "~/config"

const BASE_API_URL = api
// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = `${BASE_API_URL}/graphql`;

const httpLink = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: GRAPHQL_URL,
  credentials: "include",
});



const refreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(`${BASE_API_URL}/refresh_token`, {
      method: "POST",
      credentials: "include"
    });
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  }
});

const authLink = setContext((_request, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors);
  console.log(networkError);
});

const link = ApolloLink.from([refreshLink, authLink, errorLink, httpLink])
/*
const middlewareLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  operation.setContext({
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}`: ""
    }
  });
  return forward(operation);
});

const link = middlewareLink.concat(httpLink);
*/

export const defaultClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link: link,
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {})
    })
);

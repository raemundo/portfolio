import { useMemo } from 'react'
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client'
// import { concatPagination } from '@apollo/client/utilities'
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from '~/lib/accessToken';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";
import cookie from "cookie";
import { getJid } from "~/lib/presist-jid"
import { Platform } from "react-native";
import Constants from 'expo-constants';

const { api: BASE_API_URL } = Constants.manifest.extra;
const isServer = () => typeof window === "undefined" && Platform.OS === "web";


// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = `${BASE_API_URL}/graphql`;


let apolloClient

function createApolloClient(ctx) {
  const httpLink = new HttpLink({
    uri: GRAPHQL_URL, // Server URL (must be absolute)
    credentials: 'include', // Additional fetch() options like `credentials` or `headers`
  })
  // TODO: doesn't work
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

  const authLink = setContext(async (_request, { headers }) => {
    let token;
    let serverAccessToken = "";
    if (isServer()) {
      const cookies = cookie.parse(ctx?.req?.headers?.cookie || "");
      if (cookies.jid) {
        const response = await fetch(`${BASE_API_URL}/refresh_token`, {
          method: "POST",
          credentials: "include",
          headers: {
            cookie: "jid=" + cookies.jid
          }
        })
        const data = await response.json();
        serverAccessToken = data.accessToken
      }
      token = serverAccessToken
    } else {
      const jid = await getJid()
      // console.log({ jid })
      if (jid) {
        const response = await fetch(`${BASE_API_URL}/refresh_token`, {
          method: "POST",
          credentials: "include",
          headers: {
            cookie: "jid=" + jid
          }
        })
        const data = await response.json();
        setAccessToken(data.accessToken)
      }
      token = getAccessToken()
    };
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

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: link,
    cache: new InMemoryCache(
      /*{
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }*/
    ),
  })
}

export function initializeApollo(ctx, initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServer()) return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}

export const defaultClient = initializeApollo(null);
export const getApolloClient = initializeApollo;
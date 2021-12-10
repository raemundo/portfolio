import React from "react";
import App from "next/app";
import { useRouter } from "next/router";
import tw, { useDeviceContext } from "~/lib/tailwind";
import "~/lib/i18n";

function MyApp({ Component, pageProps }) {
  useDeviceContext(tw);
  const router = useRouter();
  return <Component {...pageProps} key={router.asPath} />;
}

export default MyApp;

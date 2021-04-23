import App, { AppInitialProps } from "next/app";
import Head from "next/head";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "react-quill/dist/quill.snow.css";
import React, { ComponentType } from "react";
import { Provider } from "react-redux";
import "../index.css";
import store from "../src/store";
import dataStore from "../src/api/dataStore";

/**
 * manifest.json provides metadata used when your web app is installed on a
 * user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
 * @param param0
 * @returns
 */
const MyApp = ({
  Component,
  pageProps,
  cookie,
  userAgent,
}: {
  Component: ComponentType<AppInitialProps>;
  pageProps: AppInitialProps;
  cookie: any;
  userAgent: any;
}) => {
  // console.log("pageProps: ", pageProps, cookie, userAgent);
  if (!dataStore.getCookieStore() && cookie) dataStore.setCookieStore(cookie);

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

/**
 * https://nextjs.org/docs/advanced-features/custom-app
 * @param appContext
 * @returns
 */
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req } = appContext.ctx;
  const cookie = req ? req.headers.cookie : document.cookie;
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { cookie, userAgent, ...appProps };
};

export default MyApp;

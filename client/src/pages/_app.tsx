import App, { AppInitialProps } from "next/app";
import Head from "next/head";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import React, { ComponentType } from "react";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import { Provider } from "react-redux";
import store from "../app/store";
import "../styles/index.scss";
import {
  getCookiePart,
  getCookieStore,
  setCookieStore,
} from "../utils/cookies";

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
  locale,
}: {
  Component: ComponentType<AppInitialProps>;
  pageProps: AppInitialProps;
  cookie: any;
  userAgent: any;
  locale: any;
}) => {
  // console.log("pageProps: ", locale, pageProps, cookie, userAgent);

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

const checkLocale = (appContext: any) => {
  const { req, res } = appContext.ctx;
  if (!req) return;
  const { locale, defaultLocale } = appContext.router;
  const { cookie } = req.headers;
  if (cookie) {
    if (!getCookieStore()) setCookieStore(cookie);
    const cookieLocale = getCookiePart(cookie, "NEXT_LOCALE");
    // console.log(cookie, locale, req.url);

    if (locale && cookieLocale && cookieLocale !== locale) {
      const location =
        defaultLocale === cookieLocale ? req.url : `/${cookieLocale}${req.url}`;
      res.writeHead(307, { location });
      res.end();
    }
  }
};

/**
 * https://nextjs.org/docs/advanced-features/custom-app
 * @param appContext
 * @returns
 */
MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  checkLocale(appContext);
  const { req } = appContext.ctx;
  const { locale } = appContext.router;
  const cookie = req ? req.headers.cookie : document.cookie;
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { cookie, userAgent, locale, ...appProps };
};

export default MyApp;

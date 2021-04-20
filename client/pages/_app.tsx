import React, { ComponentType } from 'react'
import { Provider } from 'react-redux'
import { AppInitialProps } from 'next/app'
import Head from 'next/head'

import store from '../src/store'

import '../index.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

/**
 * manifest.json provides metadata used when your web app is installed on a
 * user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
 * @param param0 
 * @returns 
 */
const MyApp = ({
  Component,
  pageProps,
}: {
  Component: ComponentType<AppInitialProps>
  pageProps: AppInitialProps
}) => {
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
  )
}

export default MyApp

import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/nprogress.css'
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify'
import { Router } from "next/router"
import NProgress from "nprogress"

import App from 'next/app'
import Auth from '../components/Auth'

NProgress.configure({ parent: '#__next', trickleSpeed: 400 });
Router.events.on('routeChangeStart', url => {
  NProgress.start();
});
Router.events.on('routeChangeError', (err) => {
  console.warn(err.message);
  NProgress.done();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

export default class SiteBuilderApp extends App<AppProps> {
  componentDidMount() {
    const style = document.getElementById('server-side-styles')

    if (style) {
      style.parentNode?.removeChild(style)
    }
  }

  render() {
    const { Component, pageProps: { session, ...pageProps } } = this.props;

    return (
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer />
      </SessionProvider>
    )
  }
}
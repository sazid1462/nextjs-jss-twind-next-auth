import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify'

import App from 'next/app'
import Auth from '../components/Auth'

export default class SiteBuilderApp extends App<AppProps> {
  componentDidMount() {
    const style = document.getElementById('server-side-styles')

    if (style) {
      style.parentNode?.removeChild(style)
    }
  }

  render() {
    const {Component, pageProps: { session, ...pageProps }} = this.props;

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
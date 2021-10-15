import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'

import App from 'next/app'

export default class SiteBuilderApp extends App {
  componentDidMount() {
    const style = document.getElementById('server-side-styles')

    if (style) {
      style.parentNode?.removeChild(style)
    }
  }
}
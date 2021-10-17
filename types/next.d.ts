import type { NextPageContext } from "next"
import type { Session } from "next-auth"
import type { Router } from "next/router"
import React from "react";

export declare module "next/app" {
  type NextComponentType<C extends BaseContext = NextPageContext, IP = {}, P = {}> = ComponentType<P> & {
    /**
     * Used for initial page load data population. Data returned from `getInitialProps` is serialized when server rendered.
     * Make sure to return plain `Object` without using `Date`, `Map`, `Set`.
     * @param ctx Context of `page`
     */
    getInitialProps?(context: C): IP | Promise<IP>;
    /**
     * Used to indicate auth required page.
     */
    auth?: {
      role?: string,
      loading?: React.ReactElement,
      unauthorized: string, // redirect to this url
    };
  };
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, P>
    router: Router
    __N_SSG?: boolean
    __N_SSP?: boolean
    pageProps: P & {
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session
    }
  }
}
import { NextPageContext } from "next"
import React from "react"
import Error from 'next/error'

function ErrorPage({ statusCode }: any) {
  return <Error statusCode={statusCode} />
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
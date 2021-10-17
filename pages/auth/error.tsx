import { NextPageContext } from "next"
import React from "react"
import Error from 'next/error'

function ErrorPage() {
  return <Error statusCode={500} />
}

export default ErrorPage
import Error from 'next/error'
import React from "react"

function ErrorPage() {
  return (
    <Error statusCode={404} />
  )
}

export default ErrorPage
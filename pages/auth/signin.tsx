import { NextPageContext } from "next"
import { getCsrfToken } from "next-auth/react"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
}).required();

export default function SignIn({ csrfToken }: any) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const router = useRouter();
  const callbackUrl =
    router.query.callbackUrl || process.env.APP_BASE_URL;

  const onSubmit = (values: any) => {
    signIn('credentials',
      {
        username: values.username,
        password: values.password,
        // The page where you want to redirect to after a 
        // successful login
        callbackUrl: Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl ?? window.location.origin
      }
    )
  }

  return (
    <div className="w-full max-w-xs absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("csrfToken")} type="hidden" defaultValue={csrfToken} />
        <input {...register("callbackUrl")} type="hidden" defaultValue={callbackUrl} />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" {...register("username")} type="text" placeholder="Username" />
          <p className="text-red-500 text-xs italic">{errors.username?.message}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" {...register("password")} type="password" placeholder="******************" />
          <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2021 Inaayah. All rights reserved.
      </p>
    </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/
import { NextPageContext } from "next"
import { getCsrfToken } from "next-auth/react"
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormData } from "../../libs/dtos/LoginFormData";
import { UserService } from "../../libs/UserService";
import { RegisterFormData } from "../../libs/dtos/RegisterFormData";
import { toast } from "react-toastify";
import { useState } from "react";
import { RouteNames } from "../../constants/RouteNames";
import { useRouter } from "next/router";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").min(4, "Password must be atleast 4 characters long"),
  passwordConfirmation: yup.string().required("Please confirm your password").oneOf([yup.ref('password'), null], 'Passwords must match'),
  email: yup.string().email().required("Email is required"),
  fullName: yup.string().required("Name is required")
}).required();

export default function Register({ csrfToken }: any) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: RegisterFormData) => {
    const apiService = new UserService();
    try {
      setLoading(true);
      const response = await apiService.register(values);
      console.log(response);
      router.push(RouteNames.LOGIN)
      setLoading(false);
    } catch (e: any) {
      toast.error(e.message);
      console.error(e);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xs absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("csrfToken")} type="hidden" defaultValue={csrfToken} />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName" {...register("fullName")} type="text" placeholder="John Doe" />
          <p className="text-red-500 text-xs italic">{errors.fullName?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="username" {...register("username")} type="text" placeholder="johndoe" />
          <p className="text-red-500 text-xs italic">{errors.username?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="email" {...register("email")} type="email" placeholder="johndoe@example.com" />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="password" {...register("password")} type="password" placeholder="********" />
          <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirmation">
            Confirm Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="passwordConfirmation" {...register("passwordConfirmation")} type="password" placeholder="********" />
          <p className="text-red-500 text-xs italic">{errors.passwordConfirmation?.message}</p>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" disabled={loading}>
            Register
          </button>
          <a className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800" href={RouteNames.LOGIN}>
            Already registered. Login?
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
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ToastError, { ToastSuccess } from '../utility/Toastify'
let validator = require('validator');

type user = {
  email: string
  password: string
}

const Page = () => {
  const [user, Setuser] = useState<user>({
    email: "",
    password: ""
  })

  const setFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string, value: string } = e.target;
    Setuser({
      ...user, [name]: value
    })

  }

  const HandleSubmitOnLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user.email) {
      ToastError({ message: "Email cannot be empty" })
      return;
    }
    if (!validator.isEmail(user.email)) {
      ToastError({ message: "Please enter a valid email" })
      return;

    }
    if (!user.password) {
      ToastError({ message: "Password cannot be empty" })
      return;
    }
    console.log(user)
    ToastSuccess({ message: "Login Successfully" })
  }

  const loginwithGoogle = () => {
    ToastSuccess({ message: "Login With GooGle" })
    
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <button className="w-full h-12 rounded-full bg-black/[0.05] hover:bg-black hover:text-white my-3
             focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-black focus:bg-black focus:text-white" onClick={loginwithGoogle}>
                Login with Google</button>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                    onChange={setFields}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={setFields}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</Link>
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={HandleSubmitOnLogin}
                >Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500"

                  >Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>

  )
}

export default Page
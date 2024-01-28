"use client"
import React, { useState } from 'react'
import ToastError, { ToastSuccess, ToastWorn } from '../utility/Toastify';
import { ToastContainer } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { ClipLoader } from 'react-spinners';

type ResponseType = {
    message: string;
    success: number;
    userInfo: any
};
const validator = require('validator')
const Page = () => {
    const [email, setEmail] = useState<string>("");
    const [isloading, setLoading] = useState<boolean>(false)
    const HandleSubmitOnResetPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true)
        console.log("Asd");
        if (!email) {
            ToastWorn({ message: "Please enter email" })
            setLoading(false)
            return;
        } if (!validator.isEmail(email)) {
            ToastWorn({ message: "Please enter a valid email" })
            setLoading(false)
            return;
        }
        const { data }: AxiosResponse<ResponseType> = await axios.post('/api/users/forgot-password', { email }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!data.success) {
            ToastError({ message: data.message })
            setLoading(false)
            return;
        }
        else {
            ToastSuccess({ message: data.message })
            setLoading(false)
            return;
        }


    }
    return (
        <>
            <main className="min-h-screen  pt-16">
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Change Password
                            </h2>
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@exmaple.xyz" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} autoComplete='on' />
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={HandleSubmitOnResetPassword}>

                                    {
                                        isloading ?
                                            <ClipLoader size={20} />
                                            : "Reset password "
                                    }

                                </button>
                            </form>
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </main>
        </>
    )
}

export default Page
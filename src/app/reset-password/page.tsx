"use client"
import axios, { AxiosResponse } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import ToastError, { ToastSuccess, ToastWorn } from '../utility/Toastify'
import { ClipLoader } from "react-spinners";


type PasswordFieldTypes = {
    password: string,
    cpassword: string
}
type ResponseType = {
    message: string;
    success: number;
};
const Page = () => {
    const router = useRouter();
    const [isLoading, SetisLoading] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const [passwords, Setpasswords] = useState<PasswordFieldTypes>({
        password: "",
        cpassword: ""
    })
    const token = searchParams.get('token')

    const SetPasswordFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }: { name: string, value: string } = e.target
        console.log({ name, value })
        Setpasswords({
            ...passwords, [name]: value
        })

    }

    const HandleSubmitOnRestPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        SetisLoading(true)

        if (!passwords.password) {
            ToastWorn({ message: "password filed should not be empty" })
            SetisLoading(false)
            return;
        }
        if (!passwords.cpassword) {
            ToastWorn({ message: "confirm password filed should not be empty" })
            SetisLoading(false)
            return;
        }
        if (passwords.cpassword != passwords.password) {
            ToastError({ message: "password and confirm password must  be same" })
            SetisLoading(false)
            return;
        }
        else {

            if (passwords.password.length < 6) {
                ToastWorn({ message: "New Password must be 6 digits long" })
                SetisLoading(false)
                return;

            }
            const { data }: AxiosResponse<ResponseType> = await axios.post("/api/users/reset-password", { newPassword: passwords.cpassword, token }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            SetisLoading(false)
            console.log(data)
            if (!data.success) {
                ToastError({ message: data.message })
                SetisLoading(false)
                return;
            }
            else {
                ToastSuccess({ message: data.message });
                SetisLoading(false)
                router.replace("/login")
                return true
            }
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
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={SetPasswordFields} />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="confirm-password" name="cpassword" id="confirm-password" placeholder="••••••••"  
                                    autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={SetPasswordFields} />
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={HandleSubmitOnRestPassword}>{isLoading ? <ClipLoader color="white" size={15} /> : "Reset Password"}</button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Page
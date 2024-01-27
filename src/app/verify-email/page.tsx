"use client"
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ToastError, { ToastSuccess } from '../utility/Toastify'
import { ToastContainer } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

const page = () => {
    const [isloading, setisLoading] = useState<boolean>(false)
    const [message, SetMessage] = useState<string>("Email Verification Successfully")
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    console.log(token);

    const sendmail = async () => {
        const { data } = await axios.post("/api/users/verify-email", { token }, {
            headers: {
                "Content-Type": "application-json"
            },
        })
        console.log(data)
        if (!data.success) {
            setisLoading(true)
            SetMessage("Email verfication failed,Invalid Authentication")
        }
        else {
            setisLoading(true)
        }
    }
    useEffect(() => {
        sendmail()
    }, [])

    return (
        <>
            <main className="h-screen  pt-16">
                <div className='h-screen flex justify-center items-center'>
                    {
                        !isloading ? <ClipLoader color="black" size={70} /> : message

                    }
                </div>
            </main>
            <ToastContainer />
        </>
    );
}

export default page

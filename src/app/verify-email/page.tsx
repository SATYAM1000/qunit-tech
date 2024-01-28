/** @format */

"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { FcOk } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { FaXmark } from "react-icons/fa6";

const page = () => {
	const [verificationStatus, SetVerificationStatus] =
		useState<string>("pending");
	const [message, SetMessage] = useState<string>("Verifying your email");
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const router = useRouter();

	useEffect(() => {
		const sendmail = async () => {
			try {
				const { data } = await axios.post(
					"/api/users/verify-email",
					{ token },
					{
						headers: {
							"Content-Type": "application-json",
						},
					}
				);
				if (data.success) {
					SetMessage("Email verified successfully");
					SetVerificationStatus("success");
					router.replace("/login");
				} else {
					SetMessage("Email verification failed");
					SetVerificationStatus("failed");
				}
			} catch (error: any) {
				console.log(error);
				toast.error(error.response.data.message);
				SetVerificationStatus("failed");
				SetMessage("Email verification failed");
			}
		};

		sendmail();
	}, [token]);

	return (
		<>
			<main className="h-screen  pt-16" suppressHydrationWarning>
				<div className="h-screen flex flex-col justify-center items-center bg-slate-50 gap-4 color-black">
					{verificationStatus === "pending" ? (
						<ClipLoader color="#000" size={50} />
					) : verificationStatus === "failed" ? (
						<FaXmark className="text-5xl text-red-600" />
					) : (
						<FcOk className="text-5xl" />
					)}

					{verificationStatus ? (
						<p className="text-black">{message}</p>
					) : (
						<p className="text-black">{message}</p>
					)}
				</div>
			</main>
		</>
	);
};

export default page;

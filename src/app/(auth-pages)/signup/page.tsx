/** @format */

"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

let validator = require("validator");

type useInforType = {
	name: string;
	email: string;
	password: string;
	phone: number | undefined;
	category: "Student" | "Profession" | "Developer";
};
type ResponseType = {
	message: string;
	success: number;
};

const Page = () => {
	const router = useRouter();
	const [isLoading, SetisLoading] = useState<boolean>(false);
	const [userInfo, SetUserInfo] = useState<useInforType>({
		name: "",
		email: "",
		password: "",
		phone: undefined,
		category: "Student",
	});

	const SetFields = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value }: { name: string; value: string } = e.target;
		SetUserInfo({
			...userInfo,
			[name]: value,
		});
	};
	const loginwithGoogle = () => {
		signIn("google", { callbackUrl: "/categories", redirect: true });
	};

	const HandleSumitForRegister = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		SetisLoading(true);
		try {
			if (
				!userInfo.name ||
				!userInfo.email ||
				!userInfo.password ||
				!userInfo.phone ||
				!userInfo.category
			) {
				toast.error("Please fill all fields");
				SetisLoading(false);
				return;
			}

			if (!validator.isEmail(userInfo.email)) {
				toast.error("Please enter a valid email");
				SetisLoading(false);
				return;
			}

			let MobileNumber: string | number = Number(userInfo.phone);
			if (!MobileNumber) {
				toast.error("Please enter a valid mobile number");
				SetisLoading(false);
				return;
			}
			MobileNumber = String(MobileNumber);
			if (MobileNumber.length != 10) {
				toast.error("Please enter a valid mobile number");
				SetisLoading(false);
				return;
			}

			const response: AxiosResponse<ResponseType> = await axios.post(
				"/api/users/signup",
				userInfo,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			SetisLoading(false);
			const { data } = response;
			if (!data.success) {
				toast.error(data.message);
				return;
			}
			toast.success(data.message);
			router.replace("/login");
		} catch (error) {
			SetisLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};
	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-800 pt-5">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-16">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8 pt-5">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create an account
							</h1>
							<button
								onClick={loginwithGoogle}
								className="w-full h-12 rounded-full bg-black/[0.05] hover:bg-black hover:text-white my-3
             focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-black focus:bg-black focus:text-white hover:dark:font-medium dark:border-gray-400 dark:border  dark:text-white hover:dark:bg-white/[0.5] hover:dark:text-black">
								<div className="flex justify-center items-center gap-4 font-medium">
									<FcGoogle size={25} />
									Login with Google
								</div>
							</button>
							<form className="space-y-4 md:space-y-6">
								<div>
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Your Name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Enter your name"
										onChange={SetFields}
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Your email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@example.com"
										onChange={SetFields}
									/>
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										onChange={SetFields}
									/>
								</div>
								<div>
									<label
										htmlFor="phone"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Phone
									</label>
									<input
										type="tel"
										name="phone"
										id="phone"
										placeholder="Enter your Phone number"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										onChange={SetFields}
									/>
								</div>
								<label
									htmlFor="category"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Category
								</label>
								<div className="flex" onChange={SetFields}>
									<div className="flex items-center me-4">
										<input
											id="inline-radio"
											type="radio"
											value="Student"
											name="category"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label
											htmlFor="category"
											className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Student
										</label>
									</div>
									<div className="flex items-center me-4">
										<input
											id="inline-2-radio"
											type="radio"
											value="Profession"
											name="category"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label
											htmlFor="category"
											className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Profession
										</label>
									</div>
									<div className="flex items-center me-4">
										<input
											id="inline-2-radio"
											type="radio"
											value="Developer"
											name="category"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label
											htmlFor="category"
											className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Developer
										</label>
									</div>
								</div>
								<button
									type="submit"
									className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={HandleSumitForRegister}>
									{isLoading ? (
										<ClipLoader color="white" size={15} />
									) : (
										"Create an account"
									)}
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<Link
										href="/login"
										className="font-medium text-blue-600 hover:underline dark:text-blue-500">
										Login here
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Page;

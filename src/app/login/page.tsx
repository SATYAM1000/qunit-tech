"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { login } from "../../../store/userInfo.slice";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { signIn, useSession } from "next-auth/react";

let validator = require("validator");

type user = {
	email: string;
	password: string;
};
type ResponseType = {
	message: string;
	success: number;
	userInfo: any;
};
const Page = () => {
	const [isLoading, SetisLoading] = useState<boolean>(false);
	const router = useRouter();
	const { data: session } = useSession();
	const [user, Setuser] = useState<user>({
		email: "",
		password: "",
	});
	const setFields = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value }: { name: string; value: string } = e.target;
		Setuser({
			...user,
			[name]: value,
		});
	};

	const HandleSubmitOnLogin = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		SetisLoading(true);
		try {
			if (!user.email || !user.password) {
				toast.error("Please fill all fields");
				SetisLoading(false);
				return;
			}
			if (!validator.isEmail(user.email)) {
				toast.error("Please enter a valid email");
				SetisLoading(false);
				return;
			}
			const response = await axios.post("/api/users/login", user);
			SetisLoading(false);
			if (response?.data?.success) {
				toast.success("Login succesfully")
				signIn("credentials", {
					email: user.email,
					password: user.password,
					callbackUrl: "/",
					redirect: true,
				});
			} else {
				toast.error(response?.data.message);
				console.log(response?.data.message);
			}

		} catch (error) {
			console.log(error);
			SetisLoading(false);
			toast.error("Something went wrong");
		}
	};

	// Login functionality

	const loginwithGoogle = () => {
		// signIn("google", {
		// 	callbackUrl: '/'
		// })
		signIn("google", {
			callbackUrl: '/',
			redirect: true
		})

	}
	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-800 ">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
					<div className="w-full bg-white rounded-lg shadow dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-16">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>

							<button
								onClick={loginwithGoogle}
								className="w-full h-12 text-black rounded-full bg-black/[0.05] hover:bg-black hover:text-white my-3
             focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-black focus:bg-black focus:text-white hover:dark:font-medium dark:border-gray-400 dark:border  dark:text-white hover:dark:bg-white/[0.5] hover:dark:text-black">
								<div className="flex justify-center items-center gap-4 font-medium ">
									<FcGoogle size={25} />
									Login with Google
								</div>
							</button>

							<form className="space-y-4 md:space-y-6">
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
										placeholder="name@company.com"
										onChange={setFields}
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
										onChange={setFields}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Link
										href="/forget-password"
										className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
										Forgot password?
									</Link>
								</div>
								<button
									type="submit"
									className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={HandleSubmitOnLogin}>
									{isLoading ? <ClipLoader color="white" size={15} /> : "Login"}
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{" "}
									<Link
										href="/signup"
										className="font-medium text-blue-600 hover:underline dark:text-blue-500">
										Sign up
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

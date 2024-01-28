/** @format */

"use client";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ToastError, { ToastSuccess } from "../utility/Toastify";
import { ToastContainer } from "react-toastify";
import { login, logout } from "../../../store/userInfo.slice";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

type ResponseType = {
	message?: string;
	success: string;
	cookie?: string;
};

const Navbar = () => {
	console.log("rerender");
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false); //mobile view
	const router=useRouter()
	const [Isloggedin, setIsloggedin] = useState(
		useSelector((state) => state.isloggedIn)
	);
	const isUserLoggedIn = useSelector((state) => state.userData).isloggedIn;
	const LogoutUser = async () => {
		const deleteCookie = await axios.get("/api/users/logout");
		const response: ResponseType = deleteCookie.data;
		console.log(deleteCookie.data);
		if (!response.success) {
			ToastError({ message: "Something went wrong while Logging Out" });
		}
		setIsloggedin(false);
		dispatch(logout(null));
		ToastSuccess({ message: "Logout Successfully" });
		router.push("/login")
	};
	const verifyToken = (token: string): any => {
		return jwt.decode(token);
	};
	const getData = async () => {
		const response: any = await axios.get("/api/users/getcookie");
		console.log("getData ",response.data)
		const { TokenCookie } = response.data;
		console.log(TokenCookie);
		if (TokenCookie) {
			setIsloggedin(true);
			const data: any = verifyToken(TokenCookie.value);
			if (data) dispatch(login(data));
		}
	};
	useEffect(() => {
		getData();
	}, [Isloggedin]);

	return (
		<>
			<header className={` bg-white dark:bg-gray-900 fixed w-full z-20 p-2`}>
				<div className="w-full  mx-4 flex items-center justify-between p-2 ">
					<Link
						href={"/"}
						className="flex items-center space-x-3 rtl:space-x-reverse">
						{/* <img src="#" className="h-8" alt="Quint"/> */}
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Quint
						</span>
					</Link>
					<div className="flex w-full items-center justify-between px-4">
						<div>
							<button
								onClick={() => setOpen(!open)}
								id="navbarToggler"
								className={` ${
									open && "navbarTogglerActive "
								} absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-black focus:ring-2 lg:hidden`}>
								<span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
								<span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
								<span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
							</button>
							<nav
								id="navbarCollapse"
								className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
									!open && "hidden"
								} `}>
								<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
									<li>
										<Link
											href="/learning"
											className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
											aria-current="page">
											Learning
										</Link>
									</li>
									<li>
										<Link
											href="/project"
											className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
											Project
										</Link>
									</li>
									<li>
										<Link
											href="/job"
											className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
											Job
										</Link>
									</li>
									<li>
										<Link
											href="/freelancing"
											className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
											Freelancing
										</Link>
									</li>
								</ul>
							</nav>
						</div>
						<div className=" justify-end pr-16 flex lg:pr-0 gap-4">
							{!isUserLoggedIn ? (
								<>
									<Link
										href={"/login"}
										className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										Login
									</Link>
									<Link
										href={"/signup"}
										className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										Signup
									</Link>
								</>
							) : (
								<button
									className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={LogoutUser}>
									Logout
								</button>
							)}
						</div>
					</div>
				</div>
				<ToastContainer />
			</header>
		</>
	);
};

export default Navbar;

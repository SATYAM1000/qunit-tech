/** @format */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DarkModeToggler from "./DarkModeToggler";
import { FaCircleUser } from "react-icons/fa6";
import Logout from "./LogoutButton";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

type ResponseType = {
	message?: string;
	success: string;
	cookie?: string;
};

type UserType = {
	_id: string;
	name: string;
	email: string;
	category: string;
};

const Navbar = () => {
	const { data: session } = useSession();
	const imgSource = session?.user?.image
		? session?.user?.image
		: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
	const [open, setOpen] = useState(false); //mobile view
	const [OpenProfileDropDown, SetopenProfileDropDown] = useState(false); //mobile view
	const router = useRouter();

	return (
		<>
			<header className={` bg-white dark:bg-gray-700 fixed w-full z-20 p-2`}>
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
								<span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white/[0.6]"></span>
								<span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white/[0.6]"></span>
								<span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white/[0.6]"></span>
							</button>
							<nav
								id="navbarCollapse"
								className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white shadow  lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
									!open && "hidden"
								} `}>
								<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  md:dark:bg-gray-700 dark:bg-transparent">
									<li>
										<Link
											href="/learning"
											className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:text-white/[0.8]"
											aria-current="page">
											Learning
										</Link>
									</li>
									<li>
										<Link
											href="/project"
											className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  dark:text-white/[0.8]">
											Project
										</Link>
									</li>
									<li>
										<Link
											href="/job"
											className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  dark:text-white/[0.8]">
											Job
										</Link>
									</li>
									<li>
										<Link
											href="/freelancing"
											className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  dark:text-white/[0.8]">
											Freelancing
										</Link>
									</li>
								</ul>
							</nav>
						</div>
						<div className=" justify-end pr-16 flex lg:pr-0 gap-4">
							{!session ? (
								<>
									<DarkModeToggler />
									<Link
										href={"/login"}
										className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white/[0.8]">
										Login
									</Link>
									<Link
										href={"/signup"}
										className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white/[0.8]">
										Signup
									</Link>
								</>
							) : (
								<>
									<div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative gap-4">
										<DarkModeToggler />
										<button
											type="button"
											id="user-menu-button"
											className="bg-black p-1 rounded-full"
											onClick={() =>
												SetopenProfileDropDown(!OpenProfileDropDown)
											}>
											<FaCircleUser
												size={25}
												className=" w-9 h-9  rounded-full outline-none border-none bg-black text-white dark:bg-white dark:text-black"
											/>
										</button>
										<div
											className={`z-50 absolute  top-10 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600  ${
												!OpenProfileDropDown && "hidden"
											}`}
											id="user-dropdown">
											<Image
												src={imgSource}
												alt={session?.user?.name ?? "fallback_alt_text"}
												title={session?.user?.name ?? "fallback_title_text"}
												className="rounded-full mx-auto my-4"
												width={50}
												height={50}
											/>

											<div className="px-4 py-3">
												<span className="block text-sm  font-extrabold capitalize text-gray-900 dark:text-white">
													{session?.user?.name}
												</span>
												<span className="block text-sm text-center text-gray-500 truncate dark:text-gray-400">
													{session?.user?.email}
												</span>
											</div>
											<ul className="py-2">
												<li>
													<Link
														href="#"
														className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white dark:text-white/[0.8]">
														Dashboard
													</Link>
												</li>
												<li>
													<Link
														href="#"
														className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white dark:text-white/[0.8]">
														Settings
													</Link>
												</li>
												<li>
													<Link
														href={`/profile/${session?.user?.id}`}
														className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white dark:text-white/[0.8]">
														Profile
													</Link>
												</li>
												<li>
													<p
														className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white dark:text-white/[0.8] cursor-pointer"
														onClick={() =>
															signOut({
																callbackUrl: "/login",
																redirect: true,
															})
														}>
														Logout
													</p>
												</li>
											</ul>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;

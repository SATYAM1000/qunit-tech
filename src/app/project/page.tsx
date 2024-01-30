/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { fetchUsers } from "@/helpers/data";
import { ArrowUpRight } from "lucide-react";
import SearchComponent from "../Component/SearchComponent";

const Page = ({ searchParams }: any) => {
	const router = useRouter();
	const [allUsers, setAllUsers] = useState([]);
	const query = searchParams?.query || "";

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const res: any = await fetchUsers(query);
				if (res) {
					setAllUsers(res);
				} else {
					setAllUsers([]);
				}
			} catch (error: any) {
				console.log("error while fetching users");
			}
		};
		getAllUsers();
	}, [query]);

	return (
		<>
			<main className=" w-full h-screen pt-16 dark:bg-gray-400 flex flex-col  gap-4">
				<SearchComponent />
				<div className="grid gap-4 gap-y-10 py-6 md:grid-cols-3 lg:grid-cols-4 bg-white h-auto px-6">
					{allUsers.length === 0 ? (
						<>
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
								No result found
							</h1>
						</>
					) : (
						allUsers.map((user: any) => (
							<>
								<div className="w-[300px] rounded-md border">
									<Image
										src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
										alt="person1"
										className="h-[200px] w-full rounded-t-md object-cover"
										height={200}
										width={200}
									/>
									<div className="p-4">
										<h1 className="inline-flex items-center text-lg text-black font-semibold">
											{user.name} &nbsp; <ArrowUpRight className="h-4 w-4" />
										</h1>
										<p className="mt-3 text-sm text-gray-600">
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Excepturi,
										</p>
										<div className="mt-4">
											<span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
												#Javascript
											</span>
											<span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
												#Nodejs
											</span>
											<span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
												#Expressjs
											</span>
										</div>
										<button
											type="button"
											className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
											Message
										</button>
									</div>
								</div>
							</>
						))
					)}
				</div>
			</main>
		</>
	);
};

export default Page;

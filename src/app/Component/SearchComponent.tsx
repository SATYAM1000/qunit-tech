/** @format */
"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type Props = {};

const SearchComponent = ({ placeholder }: any) => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	const SearchHandler = useDebouncedCallback((e: any) => {
		const params = new URLSearchParams(searchParams);
		if (e.target.value) {
			e.target.value.length > 2 && params.set("query", e.target.value);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);
	return (
		<form className="m-auto mt-5 w-1/2 max-md:w-full max-md:px-4">
			<label
				htmlFor="default-search"
				className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
				Search
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<IoSearch size={20} />
				</div>
				<input
					type="search"
					id="default-search"
					className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search..."
					onChange={SearchHandler}
					autoComplete="off"
				/>
				<button
					type="submit"
					className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Search
				</button>
			</div>
		</form>
	);
};

export default SearchComponent;

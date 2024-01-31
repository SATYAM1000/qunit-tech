/** @format */

"use client";
import React from "react";
import { signOut } from "next-auth/react";

const Logout = ({ type }: { type?: string }) => {
	return (
		<>
			<button
				onClick={() =>
					signOut({
						callbackUrl: type === "admin" ? "/admin/login" : "/login",
						redirect: true,
					})
				}
				className="px-4 py-2 bg-blue-500 text-white rounded-md">
				Logout
			</button>
		</>
	);
};

export default Logout;

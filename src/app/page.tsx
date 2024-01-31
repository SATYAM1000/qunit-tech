/** @format */

import Image from "next/image";
import Logout from "./Component/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export default async function Home() {
	const session = await getServerSession(authOptions);
	const imgSource = session?.user?.image
		? session?.user?.image
		: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
	console.log("home session", session);
	return (
		<div className="flex bg-slate-800 min-h-screen flex-col items-center justify-center gap-4">
			<h1 className="text-3xl font-bold">This is home page</h1>
			<p className="text-2xl">Welcome after login</p>
			{session && (
				<Image
					src={imgSource}
					className="rounded-full"
					alt="Next.js Logo"
					width={80}
					height={80}
				/>
			)}
			<p className="text-2xl text-red-500">{session?.user?.name}</p>
			<p className="text-xs text-red-800">{session?.user?.email}</p>
			<Logout type="user" />
		</div>
	);
}

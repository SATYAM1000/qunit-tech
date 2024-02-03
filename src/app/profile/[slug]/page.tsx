/** @format */
"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

export default function SingleProfilePage({ params }: any) {
	const { data: session, update } = useSession();
	const [updatedData, setUpdatedData] = React.useState<any>({
		name: session?.user?.name,
		email: session?.user?.email,
		phone: session?.user?.phone,
		category: session?.user?.category,
		skills: ["HTML", "CSS", "JavaScript"],
		image: session?.user?.image,
	});
	const allSkills = [
		"HTML",
		"CSS",
		"JavaScript",
		"React",
		"Next.js",
		"Tailwind",
		"Node.js",
		"Docker",
		"Express.js",
		"TypeScript",
		"AWS",
		"MongoDB",
		"MySql",
	];
	const imgSource = session?.user?.image
		? session?.user?.image
		: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

	const handleEdit = async (e: any) => {
		e.preventDefault();
		console.log("data to be updated", updatedData);
		try {
			const res = await axios.post("/api/users/update-profile", updatedData);
			console.log("data updated", res.data);
			if (res.data.success) {
				toast.success("Profile updated successfully");
				await update({
					...session,
					user: {
						...session?.user,
						name: updatedData.name,
						email: updatedData.email,
						phone: updatedData.phone,
						category: updatedData.category,
						image: updatedData.image,
					},
				});
				console.log("new session ", session!);
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log("error", error);
			toast.error("Something went wrong");
		}
	};

	const handleImageChange = async (e: any) => {
		const file = e.target.files[0];
		const url = URL.createObjectURL(file);
		setUpdatedData({ ...updatedData, image: url });
	};
	return (
		<div className="w-full min-h-screen bg-slate-900 flex flex-col items-center justify-center py-8">
			<div className="w-[400px] min-h-[400px] bg-white rounded-md p-4 gap-4 mt-[100px]">
				<div className="flex flex-col items-center justify-center gap-2 border-b-2 py-3">
					<div className="w-[100px] h-[100px] relative rounded-full  flex items-center justify-center">
						
						<Image
							src={updatedData.image === null ? imgSource : updatedData.image}
							alt="User Profile Image"
							fill
							className="rounded-full cursor-pointer"
						/>

						<div className="absolute bottom-0 right-0 bg-black rounded-full p-1.5 ">
							<label htmlFor="upload-photo">
								<MdEdit size={10} />
							</label>
							<input
								type="file"
								name="photo"
								id="upload-photo"
								onChange={handleImageChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center gap-2">
						<h1 className="text-2xl font-bold text-black capitalize">
							{session?.user?.name}
						</h1>
						<p className="text-white text-bold text-xs px-4 py-1 bg-green-500 rounded-full">
							Online
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-2 py-2">
					<div className="flex items-center gap-2">
						<h4 className="text-black font-bold">Edit your profile here</h4>
						<MdEdit className="text-black" />
					</div>
					<form className="flex flex-col gap-2" onSubmit={handleEdit}>
						<div className="flex flex-col gap-2">
							<input
								type="text"
								name="name"
								id="name"
								placeholder={session?.user?.name || "Enter your name"}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
								autoComplete="off"
								value={updatedData.name}
								onChange={(e) =>
									setUpdatedData({ ...updatedData, name: e.target.value })
								}
							/>
							<input
								type="email"
								name="email"
								id="email"
								placeholder={session?.user?.email || "Enter your email"}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
								autoComplete="off"
								value={updatedData.email}
								onChange={(e) =>
									setUpdatedData({ ...updatedData, email: e.target.value })
								}
							/>
							<input
								type="text"
								name="phone"
								id="phone"
								placeholder={session?.user?.phone || "Enter your phone"}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
								autoComplete="off"
								value={updatedData.phone}
								onChange={(e) =>
									setUpdatedData({ ...updatedData, phone: e.target.value })
								}
							/>
							<select
								aria-labelledby="userRoleLabel"
								name="category"
								id="category"
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
								value={session?.user?.category || ""} // Use 'value' instead of 'defaultValue'
								onChange={(e) =>
									setUpdatedData({ ...updatedData, category: e.target.value })
								}>
								<option value="" className="text-gray-500 capitalize" disabled>
									{session?.user?.category || "Why are you here?"}
								</option>
								{session?.user?.category !== "Student" && (
									<option value="Student">Student</option>
								)}
								{session?.user?.category !== "Professional" && (
									<option value="Professional">Professional</option>
								)}
								{session?.user?.category !== "Developer" && (
									<option value="Developer">Developer</option>
								)}
								{session?.user?.category !== "Freelancer" && (
									<option value="Freelancer">Freelancer</option>
								)}
							</select>

							<div className="w-full px-4 py-2 border border-gray-300 rounded-md text-black gap-2 flex flex-wrap ">
								{updatedData.skills.length === 0 ? (
									<p className="text-black ">No skills added</p>
								) : (
									updatedData.skills.map((skill: string, index: number) => {
										return (
											<span
												key={index}
												className="text-white text-xs px-3 py-1 rounded-full bg-gray-500 ">
												{skill}
											</span>
										);
									})
								)}
							</div>
							<div className="w-full h-[50px] px-4 py-2 border border-gray-300 rounded-md text-black flex items-center justify-flex-start gap-2 overflow-x-scroll  -moz-scrollbars-none overflow-y-hidden ">
								{allSkills.map((skill: string, index: number) => (
									<p
										key={index}
										className="text-white text-xs px-3 py-1 bg-green-500 cursor-pointer"
										onClick={() => {
											if (updatedData.skills.includes(skill)) {
												setUpdatedData({
													...updatedData,
													skills: updatedData.skills.filter(
														(s: string) => s !== skill
													),
												});
											} else {
												setUpdatedData({
													...updatedData,
													skills: [...updatedData.skills, skill],
												});
											}
										}}>
										{skill}
									</p>
								))}
							</div>
						</div>
						<button
							type="submit"
							className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
							Save Changes
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

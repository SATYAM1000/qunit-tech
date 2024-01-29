/** @format */
"use client";
import React, { useEffect } from "react";
import CategoryCard from "../Component/category-card/CategoryCard";
import { AiOutlineDollar } from "react-icons/ai";
import { FcGraduationCap } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcSoundRecordingCopyright } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Props = {};

const allCards = [
	{
		title: "Learning",
		icons: <FcGraduationCap />,
	},
	{
		title: "Project",
		icons: <FcSoundRecordingCopyright />,
	},
	{
		title: "Job",
		icons: <FcManager />,
	},
	{
		title: "Freelancing",
		icons: <FcMoneyTransfer />,
	},
];

const PageAfterLogin = (props: Props) => {
	const router = useRouter();
	useEffect(() => {
		const hasVisited = Cookies.get("hasVisited");
		if (hasVisited === "true") {
			router.replace("/");
		}
	}, []);

	


	return (
		<main className="w-full min-h-screen  pt-16 flex justify-center items-center flex-col gap-8 bg-[#f5f5f5] p-16 max-md:flex-col">
			<h2 className="text-black text-4xl font-semibold">
				Why do you want to use <span className="text-[#0d11e9] text-4xl font-semibold">QUnit?</span>
			</h2>
			<div className="w-full flex justify-center items-center flex-wrap gap-8">
				{allCards.map((card, index) => {
					return (
						<CategoryCard key={index} heading={card.title} icons={card.icons} />
					);
				})}
				<CategoryCard heading="All Categories" icons={<FcOk />} />
			</div>
		</main>
	);
};

export default PageAfterLogin;

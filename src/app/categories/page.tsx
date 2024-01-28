/** @format */
"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
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
		<div className={styles.categoriesContainer}>
			<h2>
				Why do you want to use <span>QUnit?</span>
			</h2>
			<div className={styles.wrapper}>
				{allCards.map((card, index) => {
					return (
						<CategoryCard key={index} heading={card.title} icons={card.icons} />
					);
				})}
				<CategoryCard heading="All Categories" icons={<FcOk />} />
			</div>
		</div>
	);
};

export default PageAfterLogin;

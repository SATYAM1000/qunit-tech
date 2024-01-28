/** @format */

import React from "react";
import styles from "./categorycard.module.css";
import { useRouter } from "next/navigation";

type Props = {};

const CategoryCard = (props: any) => {
	const router = useRouter();
	const [cardHeading, setCardHeading] = React.useState<any>(props.heading);
	const categoryCardHandler = (heading: any) => {
		setCardHeading(heading);
		console.log(heading);
		localStorage.setItem('hasVisited',"true");
		router.replace(`/`);
	};
	return (
		<div onClick={()=>categoryCardHandler(props.heading)} className={styles.card}>
			<div className={styles.icon}> {props.icons}</div>
			<h3>{props.heading}</h3>
		</div>
	);
};

export default CategoryCard;

/** @format */

import React from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


type Props = {};

const CategoryCard = (props: any) => {
	const router = useRouter();
	const [cardHeading, setCardHeading] = React.useState<any>(props.heading);
	const categoryCardHandler = (heading: any) => {
		setCardHeading(heading);
		console.log(heading);
		Cookies.set('hasVisited', "true");
		router.replace(`/`);
	};
	return (
		<div onClick={()=>categoryCardHandler(props.heading)} className="w-56 min-h-28 bg-white shadow flex justify-center items-center flex-col gap-2 text-black cursor-pointer transition-all duration-700 hover:bg-black/[0.3] hover:scale-105 dark:bg-black/[0.1] dark:border dark:border-gray-500
		hover:dark:bg-slate-700
		">
			<div className="text-4xl p-2 rounded-[50%] bg-black dark:bg-white/[0.2]"> {props.icons}</div>
			<h3 className="text-lg font-semibold dark:text-white/[0.6]">{props.heading}</h3>
		</div>
	);
};

export default CategoryCard;

/** @format */

import User from "@/models/userModels";
import jwt from "jsonwebtoken";

export const generateToken = async (user: any) => {
	const tokenData = {
		_id: user._id,
		name: user.name,
		email: user.email,
		role: user.role,
	};
	const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
		expiresIn: "30d",
	});
	return token;
};

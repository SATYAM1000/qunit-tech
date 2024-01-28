/** @format */

import { connectToDatabase } from "@/config/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { token } = requestBody;
		const user = await User.findOne({
			emailVerificationToken: token,
			emailVerificationExpiry: { $gt: Date.now() },
		});
		console.log("user ", user);
		if (!user) {
			return NextResponse.json(
				{
					message: "Invalid token",
					success: false,
				}
			);
		}
		user.isVerified = true;
		user.emailVerificationToken = undefined;
		user.emailVerificationExpiry = undefined;
		await user.save();
		return NextResponse.json(
			{
				message: "Email verified successfully",
				success: true,
			}
		);
	} catch (error: any) {
		console.log("Error while email verification: ", error);
		return NextResponse.json(
			{ error: error.message, success: false }
	
		);
	}
}

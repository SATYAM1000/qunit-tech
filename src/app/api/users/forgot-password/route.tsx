/** @format */

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connectToDatabase } from "@/config/dbConfig";
import { hashedPasswordGenerator } from "@/helpers/hashedPasswordGenerator";
import { generateToken } from "@/helpers/jwtTokenGenerator";
import { sendEmail } from "@/helpers/mailer";

connectToDatabase();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { email } = requestBody;
		
		
		if (!email || typeof email !== "string" || !isValidEmail(email)) {
			return NextResponse.json(
				{ message: "Please provide a valid email address", success: false },
		
			);
		}

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return NextResponse.json(
				{ message: "User not found", success: false },
		
			);
		}

		// Send password reset link
		await sendEmail({ email, emailType: "RESET", userId: existingUser._id });

		return NextResponse.json(
			{
				message: "Password reset link sent to your email",
				success: true,
			}
		
		);
	} catch (error: any) {
		console.error("Error while handling forgot password:", error);
		return NextResponse.json(
			{ message: "Internal Server Error", success: false },
			
		);
	}
}

function isValidEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

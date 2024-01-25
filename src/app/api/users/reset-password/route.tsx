/** @format */

import User from "@/models/userModels";
import { connectToDatabase } from "@/config/dbConfig";
import { hashedPasswordGenerator } from "@/helpers/hashedPasswordGenerator";
import { generateToken } from "@/helpers/jwtTokenGenerator";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { newPassword, token } = requestBody;
		if (!newPassword) {
			return NextResponse.json({
				message: "Please provide new password",
				success: false,
			});
		}
        if(newPassword.length < 6){
            return NextResponse.json({
                message: "Password must be at least 6 characters",
                success: false,
            })
        }
		if (!token) {
			return NextResponse.json({
				message: "Invalid token",
				success: false,
			});
		}
		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordExpiry: { $gt: Date.now() },
		});
		if (!user) {
			return NextResponse.json({
				message: "Invalid token",
				success: false,
			});
		}
		const hashedPassword = await hashedPasswordGenerator(newPassword);
		user.password = hashedPassword;
		user.forgotPasswordToken = undefined;
		user.forgotPasswordExpiry = undefined;
		await user.save();
		return NextResponse.json({
			message: "Password reset successfully",
			success: true,
		});
	} catch (error: any) {
		console.log("Error while resetting password: ", error);
		return NextResponse.json({ error: error.message, success: false });
	}
}

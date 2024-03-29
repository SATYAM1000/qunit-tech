/** @format */

import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModels";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/config/dbConfig";
import { generateToken } from "@/helpers/jwtTokenGenerator";

//establishing the database connection
connectToDatabase();

// setting up the login route
export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { email, password } = requestBody;
		if (!email || !password) {
			return NextResponse.json(
				{ message: "Please fill all the fields", success: false },

			);
		}

		// check user is registered or not
		const user = await userModel.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ message: "Invalid credentials", success: false },

			);
		}
		if (!user.isVerified) {
			return NextResponse.json(
				{ message: "Please verify your email", success: false },

			);
		}

		//check password is correct or not
		const comparePassword = await bcrypt.compare(password, user.password);
		if (!comparePassword) {
			return NextResponse.json({
				message: "Invalid credentials",
				success: false,
			});
		}

		//generate jwt token--------------------

		const token =await generateToken(user);
		console.log(token)
		const response: any = NextResponse.json({
			message: "Login successful",
			success: true,
			userInfo: user
		});
		response.cookies.set("token", token, { httpOnly: true });
		return response;
	} catch (error: any) {
		console.log("Error while login", error);
		return NextResponse.json(
			{ message: "Error while login", success: false },
			{ status: 500 }
		);
	}
}

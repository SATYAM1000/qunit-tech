/** @format */

import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModels";
import { connectToDatabase } from "@/config/dbConfig";
import { hashedPasswordGenerator } from "@/helpers/hashedPasswordGenerator";
import { sendEmail } from "@/helpers/mailer";

//establishing the database connection
connectToDatabase();

// creating a new user
export async function GET() {
	return NextResponse.json({ message: "haisdf" })
}

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { name, email, password, phone, category } = requestBody;
		console.log("request body: ", requestBody);

		//check all fields are filled or not
		if (!name || !email || !password || !phone) {
			return NextResponse.json(
				{ message: "Please fill all the fields", success: false }
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ message: "Password must be at least 6 characters", success: false }
			);
		}

		//check email is already exist or not
		const emailExist = await userModel.findOne({ email });
		if (emailExist) {
			return NextResponse.json(
				{ message: "Email already exist", success: false }
			);
		}

		//check phone number already exist or not
		const phoneNumberExist = await userModel.findOne({ phone });
		if (phoneNumberExist) {
			return NextResponse.json(
				{ message: "Phone number already exist", success: false }
			);
		}



		//hashing the password
		const hashedPassword = await hashedPasswordGenerator(password);

		//creating a new user
		const newUser = new userModel({
			name,
			email,
			password: hashedPassword,
			phone,
			category,
		});

		await newUser.save();
		

		//send email ---------------------
		await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

		return NextResponse.json(
			{ message: "A verification link has been sent to your email", success: true },

		);
	} catch (error) {
		console.log("Error while registering user: ", error);
		return NextResponse.json(
			{ message: "Error while registering user", success: false },

		);
	}
}

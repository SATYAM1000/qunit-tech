/** @format */

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connectToDatabase } from "@/config/dbConfig";
import { hashedPasswordGenerator } from "@/helpers/hashedPasswordGenerator";

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

		//check all fields are filled or not
		if (!name || !email || !password || !phone) {
			return NextResponse.json(
				{ message: "Please fill all the fields", success: false }
			);
		}

		//check email is already exist or not
		const emailExist = await User.findOne({ email });
		if (emailExist) {
			return NextResponse.json(
				{ message: "Email already exist", success: false }
			);
		}

		//check phone number already exist or not
		const phoneNumberExist = await User.findOne({ phone });
		if (phoneNumberExist) {
			return NextResponse.json(
				{ message: "Phone number already exist", success: false }
			);
		}

		//hashing the password
		const hashedPassword = await hashedPasswordGenerator(password);

		//creating a new user
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			phone,
			category,
		});
		await newUser.save();
		return NextResponse.json(
			{ message: "User created successfully", success: true },

		);
	} catch (error) {
		console.log("Error while regestring user", error);
		return NextResponse.json(
			{ message: "Error while regestring user", success: false },
		);
	}
}

/** @format */

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/config/dbConfig";

//establishing the database connection

// creating a new user

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { username, email, password, phoneNumber, role } = requestBody;

		//check all fields are filled or not
		if (!username || !email || !password || !phoneNumber) {
			return NextResponse.json(
				{ message: "Please fill all the fields", success: false },
				{ status: 400 }
			);
		}

		//check email is already exist or not
		const emailExist = await User.findOne({ email });
		if (emailExist) {
			return NextResponse.json(
				{ message: "Email already exist", success: false },
				{ status: 400 }
			);
		}

		//check phone number already exist or not
		const phoneNumberExist = await User.findOne({ phoneNumber });
		if (phoneNumberExist) {
			return NextResponse.json(
				{ message: "Phone number already exist", success: false },
				{ status: 400 }
			);
		}

		//hashing the password
		const hashedPassword = await bcrypt.hash(password, 10);

		//creating a new user
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			phoneNumber,
			role,
		});
		await newUser.save();
		return NextResponse.json(
			{ message: "User created successfully", success: true },
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error while regestring user", error);
		return NextResponse.json(
			{ message: "Error while regestring user", success: false },
			{ status: 500 }
		);
	}
}

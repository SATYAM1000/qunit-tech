/** @format */

import userModel from "@/models/userModels";
import { connectToDatabase } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

connectToDatabase();

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		const reqBody = await request.json();
		const { name, email, phone, category, skills, image } = reqBody;
        console.log("session", session?.user?.email);
		const user = await userModel.findOne({ email: session?.user?.email });
		if (!user) {
			return NextResponse.json({ message: "User not found", success: false });
		}
		
		if (name!==undefined && name.length < 3) {
			return NextResponse.json({
				message: "Name must be at least 3 characters",
				success: false,
			});
		}
		if (phone!==undefined && phone.length < 10) {
			return NextResponse.json({
				message: "Phone number must be at least 10 digits",
				success: false,
			});
		}
		if (name !== undefined && name !== user.name) {
			user.name = name;
		}
		if (email !== undefined && email !== user.email) {
			const emailExist = await userModel.findOne({ email });
			if (emailExist) {
				return NextResponse.json({
					message: "Email already exist",
					success: false,
				});
			}
			user.email = email;
		}
		if (phone !== undefined && phone !== user.phone) {
			const phoneNumberExist = await userModel.findOne({ phone });
			if (phoneNumberExist) {
				return NextResponse.json({
					message: "Phone number already exist",
					success: false,
				});
			} else {
				user.phone = phone;
			}
		}
		if (category !== undefined && category !== user.category) {
			user.category = category;
		}
		if (skills !== undefined && skills.length > 0) {
			user.skills = skills;
		}
		if (image !== undefined && image !== user.image) {
			user.image = image;
		}
		await user.save();

		return NextResponse.json({
			message: "Profile updated successfully",
			success: true,
		});
	} catch (error) {
		console.log("Error while updating profile: ", error);
		return NextResponse.json({
			message: "Error while updating profile",
			success: false,
		});
	}
}

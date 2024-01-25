/** @format */

import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { hashedPasswordGenerator } from "./hashedPasswordGenerator";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		const hashedToken = await hashedPasswordGenerator(userId);
		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(
				userId,
				{
					emailVerificationToken: hashedToken,
					emailVerificationExpiry: Date.now() + 10 * 60 * 1000,
				},
				{ new: true, runValidators: true }
			);
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(
				userId,
				{
					forgotPasswordToken: hashedToken,
					forgotPasswordExpiry: Date.now() + 10 * 60 * 1000,
				},
				{ new: true, runValidators: true }
			);
		}
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: "satyamsingh748846@gmail.com",
			to: email,
			subject: emailType === "VERIFY" ? "Email Verification" : "Password Reset",
			html: `<p>Click the link below to ${
				emailType === "VERIFY" ? "verify" : "reset"
			} your email</p> <a href="http://localhost:3000/verify-email?token=${hashedToken}">Click here</a>`,
		};
		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};

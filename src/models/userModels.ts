/** @format */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "username is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "email is required"],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "password is required"],
			trim: true,
		},
		phoneNumber: {
			type: String,
			trim: true,
			unique: true,
			required: [true, "phone number is required"],
			maxlength: 10,
			minlength: 10,
		},
		role: {
			type: String,
			enum: ["ADMIN", "STUDENT", "DEVELOPER"],
			default: "STUDENT",
			trim: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		forgotPasswordToken: String,
		forgotPasswordExpiry: Date,
		emailVerificationToken: String,
		emailVerificationExpiry: Date,
	},
	{ timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

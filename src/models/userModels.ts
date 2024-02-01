/** @format */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
			unique: true,
			maxlength: 10,
			minlength: 10,
		},
		skills: {
			type: [String],
			default: [],
			trim: true,
		},
		category: {
			type: String,
			enum: ['Student', 'Professional', 'Developer', 'Freelancer'],
			default: "Student",
			trim: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		forgotPasswordToken: String,
		forgotPasswordExpiry: Date,
		emailVerificationToken: String,
		emailVerificationExpiry: Date,
		image:String,
	},
	{ timestamps: true }
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;

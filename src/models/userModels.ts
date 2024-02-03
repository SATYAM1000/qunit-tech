
import mongoose from 'mongoose';

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
		category: {
			type: String,
			enum: ['Student', 'Profession', 'Developer'],
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
	},
	{ timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

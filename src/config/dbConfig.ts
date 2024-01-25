
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
	try {
		await mongoose.connect(MONGODB_URI!);

		console.log("Database connection successful");
	} catch (error:any) {
		console.error("Database connection failed", error);
		throw new Error(`Database connection failed: ${error.message}`);
	}
};

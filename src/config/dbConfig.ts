
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/qunittech");
		console.log("Database connection successful");
	} catch (error:any) {
		console.error("Database connection failed", error);
		throw new Error(`Database connection failed: ${error.message}`);
	}
};

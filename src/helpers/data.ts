"use server"
import User from "@/models/userModels"
import { connectToDatabase } from "@/config/dbConfig";

connectToDatabase();

export const fetchUsers=async(query:any)=>{
    const regex=new RegExp(query,'i');
    try {
        const users=await User.find({name:{$regex:regex}}).select("-password -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry");
        if(!users){
            return null;

        }
        return users;
        
    } catch (error:any) {
        console.log("Error while fetching users ");
        throw new Error(`Error while fetching users`);
    }

}
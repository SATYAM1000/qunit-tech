"use server"
import userModel from "@/models/userModels"
import { connectToDatabase } from "@/config/dbConfig";

connectToDatabase();

export const fetchUsers=async(query:any)=>{
    const regex=new RegExp(query,'i');
    try {
        const users=await userModel.find({name:{$regex:regex}}).select("-password -__v -createdAt -updatedAt -_id -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry");
        if(!users){
            return null;

        }
        return users;
        
    } catch (error:any) {
        console.log("Error while fetching users ");
        throw new Error(`Error while fetching users`);
    }

}
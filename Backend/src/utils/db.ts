import { Request, Response } from "express";
import mongoose from "mongoose";

const connectDB = async (req: Request, res: Response) => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("MongoDB Connected Successfully!")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export default connectDB;
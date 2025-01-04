import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Content } from "../models/content.model";

// Create content
export const createContent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, link, type, tags } = req.body;
        const userId = req.id;

        if(!title || !link || !type || !tags) {
            res.status(400).json({
                message: "Please enter all fields",
                success: false,
            });
            return;
        }

        //only a valid user can create the content
        const userExist = await User.findById(userId);
        if(!userExist) {
            res.status(404).json({
                message: "User not found",
                success: false,
            });
            return;
        };

        const newContent = await Content.create({
            title,
            link,
            type,
            tags:[],
            userId
        });

        res.status(201).json({
            message: "Content created",
            success: true,
            newContent,
        });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
        return;
    }
};

// Get all content
export const getAllContent = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.id;
        //find all the content of the user with userID -> userId and also give the name of the user with this userId(pupulating for username)
        const contents = await Content.find({userId: userId}).populate("userId", "username");

        res.status(200).json({
            success: true,
            contents
        });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
        return;
    }
};

// Delete single content
export const deleteContent = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const contentId = req.body.contentId;
        const userId = req.id;

        const content = await Content.findById(contentId);
        if(!content) {
            res.status(404).json({
                message: "Content not found",
                success: false,
            });
            return;
        }

        await Content.findByIdAndDelete(contentId);

        res.status(200).json({
            message: "Content deleted",
            success: true,
        });
        return;
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
        return;
    }
};
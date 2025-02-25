import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Content } from "../models/content.model";
import { Tag } from "../models/tags.model";

// Create content
export const createContent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, link, type, tags } = req.body;  // Expect tags as an array of tag titles or ObjectIds
        const userId = req.id;

        if (!title || !link || !type || !tags) {
            res.status(400).json({
                message: "Please enter all fields",
                success: false,
            });
            return;
        }

        // Check if user exists
        const userExist = await User.findById(userId);
        if (!userExist) {
            res.status(404).json({
                message: "User not found",
                success: false,
            });
            return;
        }

        // Handle tags: Either get existing tags or create new ones
        const tagIds = await Promise.all(
            tags.map(async (tagTitle: string) => {
                let tag = await Tag.findOne({ title: tagTitle });
                if (!tag) {
                    tag = new Tag({ title: tagTitle });
                    await tag.save();
                }
                return tag._id;  // Return the tag ObjectId
            })
        );

        // Create content with tags
        const newContent = await Content.create({
            title,
            link,
            type,
            tags: tagIds,  // Pass the tag ObjectIds here
            userId,
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

        // Find all content and populate the userId and tags fields
        const contents = await Content.find({ userId: userId })
            .populate("userId", "username")
            .populate("tags", "title");  // Ensure tags are populated with their title

        res.status(200).json({
            success: true,
            contents,
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
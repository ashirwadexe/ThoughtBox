import { Request, Response } from "express";
import { Link } from "../models/link.model";
import { random } from "../utils/random";
import { Content } from "../models/content.model";
import { User } from "../models/user.model";

export const shareLink = async (req: Request, res: Response): Promise<void> => {
    const share = req.body.share;
    const userId = req.id;
    if (share) {
        const existingLink = await Link.findOne({
            userId: userId
        });

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }

        const hash = random(10);
        await Link.create({
            userId: userId,
            hash: hash
        });

        res.json({
            hash
        });
    } else {
        await Link.deleteOne({
            userId: userId
        });

        res.json({
            message: "Removed link"
        });
    }
};

export const getSharedLinkContent = async (req: Request, res: Response): Promise<void> => {
    const hash = req.params.shareLink;

    const link = await Link.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }

    const content = await Content.find({
        userId: link.userId
    });

    const user = await User.findOne({
        _id: link.userId
    });

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }

    res.json({
        username: user.username,
        content: content
    });
};

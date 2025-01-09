import mongoose, { Types } from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio', 'tweet']; // Extend as needed

const contentSchema = new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {timestamps: true});

export const Content = mongoose.model("Content", contentSchema);


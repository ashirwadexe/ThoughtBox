import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(404).json({
                message: "Something is missing",
                success: false,
            });
            return;
        }

        const users = await User.findOne({ username });
        if (users) {
            res.status(403).json({
                message: "User Already Exists!",
                success: false,
            });
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashPassword,
        });

        res.status(200).json({
            message: "Account Created!",
            success: true,
        });
        return;  // Return to avoid Promise<Response>
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
        return;
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(404).json({
                message: "Something is missing",
                success: false,
            });
            return;
        }

        const users = await User.findOne({ username });
        if (!users) {
            res.status(403).json({
                message: "User Does Not Exist!",
                success: false,
            });
            return;
        }

        const isMatch = await bcrypt.compare(password, users.password);
        if (!isMatch) {
            res.status(403).json({
                message: "Incorrect Password",
                success: false,
            });
            return;
        }

        const tokenData = {
            userId: users.id,
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY || "8282hu2dh8g28e", {
            expiresIn: '1d',
        });

        res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
            })
            .json({
                message: "Login successful",
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

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                sameSite: 'strict',
            })
            .json({
                message: "Logout Successful",
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

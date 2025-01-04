import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    try {

        const {username, password} = req.body;
        if(!username || !password) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            });
        }

        const users = await User.findOne({username});
        if(!users) {
            return res.status(403).json({
                message: "User Already Exists!",
                success: false
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashPassword
        });

        return res.status(200).json({
            message: "Account Created!",
            success: true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            });
        }

        const users = await User.findOne({username});
        if(!users) {
            return res.status(403).json({
                message: "User Do Not Exists!",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, users.password);
        if(!isMatch) {
            return res.status(403).json({
                message: "Incorrect Password",
                success: false
            });
        }

        const tokenData = {
            userId: users.id
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY || "8282hu2dh8g28e", {expiresIn: '1d'});

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
            message: "Login successful",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0, httpOnly:true, sameSite: 'strict'}).json({
            message: "Logout Successfull",
            success: true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}
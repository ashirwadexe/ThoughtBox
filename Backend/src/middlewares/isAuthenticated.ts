
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req: Request ,res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if(!token) {
            res.status(404).json({
                message: "Unauthorised User!",
                success: false
            });
            return;
        }

        // We cast jwt.verify to jwt.JwtPayload to ensure TypeScript knows decode contains userId. This prevents further errors regarding unknown properties.
        const decode = jwt.verify(token, process.env.SECRET_KEY || "8282hu2dh8g28e") as jwt.JwtPayload;
        if(!decode) {
            res.status(404).json({
                message: "Invalid Token!",
                success: false
            });
            return;
        }

        //typescript do not recognise id so we create a express.d.ts file inside src/types and defines it there
        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;
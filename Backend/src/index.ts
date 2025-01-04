import dotenv from "dotenv";
import express from "express";
const app = express();
import userRouter from "./routes/user.route";
import contentRouter from "./routes/content.route";
import connectDB from "./utils/db";
import cookieParser from "cookie-parser";

//load env files
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

//api's
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter)

app.listen(PORT, () => {
    connectDB();
    console.log(`App is listening on PORT ${PORT}`);
});
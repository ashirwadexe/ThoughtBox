import dotenv from "dotenv";
import express from "express";
const app = express();
import userRouter from "./routes/user.route";
import contentRouter from "./routes/content.route";
import linkRouter from "./routes/link.route"
import connectDB from "./utils/db";
import cookieParser from "cookie-parser";
import cors from "cors";

//load env files
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

//api's
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter)
app.use("/api/v1/brain", linkRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`App is listening on PORT ${PORT}`);
});
import dotenv from "dotenv";
import express from "express";
const app = express();

//load env files
dotenv.config();
app.use(express.json());


const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Home");
});

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
});
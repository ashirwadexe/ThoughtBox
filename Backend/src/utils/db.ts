import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://bappyashirwad:irn7nQDiDgaYl0hW@thoughtbox.wefle.mongodb.net/");
        console.log("MongoDB Connected Successfully!")
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
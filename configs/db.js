import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connected");
    } catch (error) {
        console.log("Error connect to DB", error);
        process.exit(1);
    }
}
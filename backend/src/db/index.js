import dotenv from 'dotenv';
import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';
dotenv.config();

const connectDB = async () => {
    const uri = "mongodb+srv://prepRight:prepRight@cluster0.3sgvsvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    try {
        console.log(`Connection URI: ${uri}/${DB_NAME}`);

        await mongoose.connect(`${uri}/${DB_NAME}`);
        console.log(`Connection URI: ${uri}/${DB_NAME}`);

        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection Error", error);
        process.exit(1);
    }
};

export default connectDB;

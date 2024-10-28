import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const connection_string = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(connection_string, {});
        console.log('MongoDB connected');
    } catch (error) {
        console.log("Unable to connect to mongo db");
        console.error(error.message);
    }
}

export default connectDB;
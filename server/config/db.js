import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log("Unable to connect to mongo db");
        console.error(error.message);
    }
}

export default connectDB;
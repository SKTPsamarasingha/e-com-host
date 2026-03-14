import mongoose from 'mongoose'
import {MONGODB_URI} from "./envConfigs.js";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI)

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });

        // Handle app termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.info('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1)
    }
}

export default connectDB
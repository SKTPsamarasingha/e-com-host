import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';


const Product = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4(),
        },
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        imageUrl: {
            type: String,
            required: true
        },

        category: {
            type: String,
            enum: ["Men", "Women", "Kids"],
            required: true,
            index: true
        },

        sizes: {
            type: [String],
            enum: ["S", "M", "L", "XL"],
            required: true
        },
    }
);

export default mongoose.model("Product", Product);

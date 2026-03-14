import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const CartItem = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },

        product: {
            type: String,
            ref: "Product",
            required: true,
        },

        size: {
            type: String,
            enum: ["XS", "S", "M", "L", "XL", "XXL"],
            required: true,
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },
    },
    {_id: false}
);

const Cart = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },

        user: {
            type: String,
            ref: "User",
            unique: true,
            required: true,
        },

        items: [CartItem],
    },
    {timestamps: true}
);

export default mongoose.model("Cart", Cart);


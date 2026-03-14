import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const OrderItemSchema = new mongoose.Schema({
    itemID: {
        type: String,
        default: () => uuidv4(),
    },
    product: {
        type: String,
        ref: "Product",
        required: true,
    },
    price: Number,
    size: String,
    quantity: Number,
});

const ShippingAddressSchema = new mongoose.Schema({
    fullName: String,
    addressLine1: String,
    city: String,
    postalCode: String,
    country: String,
});

const PaymentSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ["CARD", "CASH_ON_DELIVERY"],
        required: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED"],
        default: "PAID",
    },
});

const OrderSchema = new mongoose.Schema(
    {
        orderID: {
            type: String,
            default: () => uuidv4(),
            unique: true,
        },

        user: {
            type: String,
            ref: "User",
            required: true,
        },

        items: [OrderItemSchema],

        shippingAddress: ShippingAddressSchema,

        payment: PaymentSchema,

        totalPrice: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
            default: "PLACED",
        },

        orderedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {timestamps: true}
);

export default mongoose.model("Order", OrderSchema);

// seed/products.js
import mongoose from "mongoose";
import Product from "../models/products.js";
import {MONGODB_URI} from "../config/envConfigs.js";

const products = [
    // ----- MEN -----
    {
        name: "Classic T-Shirt",
        description: "Comfortable cotton t-shirt for daily wear",
        price: 25,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        name: "Slim Fit Jeans",
        description: "Modern slim fit denim jeans",
        price: 40,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        name: "Casual Hoodie",
        description: "Warm and cozy hoodie for men",
        price: 35,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["M", "L", "XL"],
    },
    {
        name: "Formal Shirt",
        description: "Elegant shirt suitable for office",
        price: 30,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        name: "Leather Jacket",
        description: "Stylish leather jacket for cold weather",
        price: 80,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["M", "L", "XL"],
    },
    {
        name: "Chinos Pants",
        description: "Comfortable and casual chinos",
        price: 35,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        name: "Sports Jacket",
        description: "Lightweight jacket for outdoor sports",
        price: 60,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["M", "L", "XL"],
    },
    {
        name: "V-neck Sweater",
        description: "Elegant v-neck sweater for casual wear",
        price: 28,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Tank Top",
        description: "Perfect for gym or summer",
        price: 20,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        name: "Denim Jacket",
        description: "Classic denim jacket",
        price: 55,
        imageUrl: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg",
        category: "Men",
        sizes: ["M", "L", "XL"],
    },

    // ----- WOMEN -----
    {
        name: "Summer Dress",
        description: "Light and breezy summer dress",
        price: 45,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Elegant Blouse",
        description: "Perfect blouse for office or parties",
        price: 30,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        name: "Skinny Jeans",
        description: "Stylish skinny jeans for women",
        price: 40,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Casual Hoodie",
        description: "Comfortable hoodie for casual wear",
        price: 35,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Pencil Skirt",
        description: "Classic office pencil skirt",
        price: 38,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Cardigan Sweater",
        description: "Soft and cozy cardigan",
        price: 28,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        name: "Tank Top",
        description: "Lightweight tank top for summer",
        price: 22,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Denim Jacket",
        description: "Classic denim jacket",
        price: 55,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Pleated Skirt",
        description: "Stylish pleated skirt for casual & parties",
        price: 35,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Evening Dress",
        description: "Elegant dress for parties and events",
        price: 60,
        imageUrl: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg",
        category: "Women",
        sizes: ["S", "M", "L"],
    },

    // ----- KIDS -----
    {
        name: "Kids T-Shirt",
        description: "Bright and fun t-shirt for kids",
        price: 15,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Kids Shorts",
        description: "Comfortable shorts for playtime",
        price: 18,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Kids Hoodie",
        description: "Warm hoodie for kids",
        price: 25,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Kids Jeans",
        description: "Durable denim jeans",
        price: 30,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Kids Dress",
        description: "Cute dress for girls",
        price: 28,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Kids Sweater",
        description: "Cozy sweater for winter",
        price: 22,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Kids Jacket",
        description: "Lightweight jacket for outdoors",
        price: 35,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Kids Tank Top",
        description: "Perfect for summer fun",
        price: 12,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Kids Pajama Set",
        description: "Comfortable sleepwear",
        price: 20,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
    {
        name: "Kids Overalls",
        description: "Durable and stylish",
        price: 30,
        imageUrl: "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
        category: "Kids",
        sizes: ["S", "M", "L"],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");

        // 1. Clear existing products
        await Product.deleteMany();
        console.log("Existing products removed");

        // 2. Insert demo products
        await Product.insertMany(products);
        console.log("Products seeded successfully");

        process.exit();
    } catch (error) {
        console.error("Error seeding DB:", error);
        process.exit(1);
    }
};

seedDB();

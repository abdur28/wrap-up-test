import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import client from "./mongodb";
import mongoose from "mongoose";
import { unstable_noStore as noStore } from "next/cache";

export const getUser = async () => {
    noStore();
    const { userId } = auth();
    const mongoClient = await client;
    const db = mongoClient.db("Mazamaza-shop");
    const user = await db.collection("users").findOne({ clerkId: userId });
    return user
};

export const isAdmin = async () => {
    noStore();
    const { userId } = auth();
    const mongoClient = await client;
    const db = mongoClient.db("Mazamaza-shop");
    const user = await db.collection("users").findOne({ clerkId: userId });
    if (user?.isAdmin) {
        return true
    }
    return false
};

export const getInformation = async () => {
    noStore();
    try {
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const information = await db.collection("information").find().toArray();
        return information[0]
    } catch (err) {
        console.log(err);
        throw new Error("Failed to get all Information!");
    }
}
export const getServices = async () => {
    noStore();
    try {
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const services = await db.collection("services").find().toArray();
        return services
    } catch (err) {
        console.log(err);
        throw new Error("Failed to get all Services!");
    }
}

export const getServiceById = async (id: string) => {
    noStore();
    try {
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const service = await db.collection("services").findOne({ _id: new mongoose.Types.ObjectId(id) });
        return service
    } catch (err) {
        console.log(err);
        redirect('/not-found')
    }
}

export const getProducts = async () => {
    noStore();
    try {
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const products = await db.collection("products").find().toArray();
        return products
    } catch (err) {
        console.log(err);
        throw new Error("Failed to get all Products!");
    }
}

export const getProductById = async (id: string) => {
    noStore();
    try {
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const product = await db.collection("products").findOne({ _id: new mongoose.Types.ObjectId(id) });
        return product
    } catch (err) {
        console.log(err);
        redirect('/not-found')
    }
}

export const getReceiptById = async (plainReceiptId: string) => {
    noStore();
    try {
        const receiptId = Number(plainReceiptId)
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const receipt = await db.collection("receipts").findOne({ id: receiptId });
        return receipt
    } catch (err) {
        console.log(err);
        redirect('/not-found')
    }
}

export const getApprovedReviews = async () => {
    noStore();
    try {
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const reviews = await db.collection("reviews").find({ approved: true }).toArray();
        return reviews
    } catch (err) {
        console.log(err);
        throw new Error("Failed to get all Reviews!");
    }
}

export const getCart = async () => {
    noStore();
    try {
        const user = await auth();
        if (!user) {
            return;
        }
        const userId = user.userId;
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const currentUser = await db.collection("users").findOne({ clerkId: userId });
        if (!currentUser) {
            return;
        }
        return currentUser.cart
    } catch (err) {
        console.log(err);
    }
}


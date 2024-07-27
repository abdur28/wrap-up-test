import client from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const POST = async (req: Request) => {
    noStore();
   try {
    const { productId } = await req.json();
    const  userId  = auth().userId;
    const mongoClient = await client;
    const db = mongoClient.db("Mazamaza-shop");

    const product = await db.collection("products").findOne({ _id: new mongoose.Types.ObjectId(productId) });
    if (!product) {
        return NextResponse.json({ availableItems: [], message: "Product not found" });
    }    
    const items = product.products;

    const user = await db.collection("users").findOne({ clerkId: userId });
    if (!user) {
        return NextResponse.json({ availableItems: [], message: "User not found" });
    }
    const cart = user.cart;

    const availableItems = items.filter((item: any) => {
        const cartItem = cart.find((cartItem: any) => cartItem.itemId === item.itemId);
        if (cartItem) {
            item.quantity -= cartItem.quantity;
        }
        return item.quantity > 0;
    });

    return NextResponse.json({ availableItems: availableItems });

   } catch (error) {
       console.log(error);
       return NextResponse.json({ availableItems: [], message: "Something went wrong" });
   }

}    
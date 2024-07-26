
import client from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const  userId  = auth().userId;
    const mongoClient = await client;
    const db = mongoClient.db("Mazamaza-shop");
    const user = await db.collection("users").findOne({ clerkId: userId });
    if (!user) {
        return NextResponse.json({ cart: [] });
    }
    const cart = user.cart;
    return NextResponse.json({ cart });
}

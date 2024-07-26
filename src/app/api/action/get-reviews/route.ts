import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const reviews = (await db.collection("reviews").find().toArray()).reverse();
        return NextResponse.json({ reviews });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch reviews" });
    }
}
import client from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const revalidate = 0;
export const dynamic = 'force-dynamic'
export const GET = async (req: Request) => {
    noStore();
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

import client from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const revalidate = 0;
export const dynamic = 'force-dynamic'
export const POST = async (req: Request) => {
    noStore();
    try {
        const { type } = await req.json();
        const  userId  = auth().userId;
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const user = await db.collection("users").findOne({ clerkId: userId });
        if (!user) {
            return NextResponse.json({ cart: [] });
        }
        const cart = user.cart;
        return NextResponse.json({ cart });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false });
    }
}

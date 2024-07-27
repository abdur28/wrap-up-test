import client from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const POST = async (req: Request) => {
    noStore();
    try {
        const { itemId } = await req.json();
        const userId = auth().userId;
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const user = await db.collection("users").findOne({ clerkId: userId });
        if (!user) {
            return NextResponse.json({ success: false });
        }
        const newCart = user.cart.filter((item: any) => item.itemId !== itemId);
        await db.collection("users").updateOne({ clerkId: userId }, { $set: { cart: newCart } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ err });
    }
    
}


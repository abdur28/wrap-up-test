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
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const collection =  db.collection('receipts');
        if (type === "all") {
            const receipts = (await collection.find({}).toArray()).reverse();
            return NextResponse.json({ receipts });
        } else if (type === "single") {
            const { userId } = auth();
            if (!userId) {
                return NextResponse.json({ err: "Not authorized" });
            }
            const receipts = (await collection.find({ "customer.clerkId": userId }).toArray()).reverse();
            // console.log(receipts);
            return NextResponse.json({ receipts });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ err });
    }
}
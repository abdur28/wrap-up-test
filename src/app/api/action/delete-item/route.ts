import client from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const POST = async (req: Request) => {
    try {
        const { type, id } = await req.json();
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const result = await db.collection(type).deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ err });
    }
}
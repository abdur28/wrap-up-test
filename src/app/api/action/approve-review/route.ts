import client from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { id } = await req.json();
    // console.log(id)
    try {
        const mongoClient = await client
        const db = mongoClient.db("Mazamaza-shop")
        const collection = db.collection("reviews")
        await collection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: { approved: true } })
        return NextResponse.json({ success: true })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Failed to approve review" })
    }
}
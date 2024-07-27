import client from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const POST = async (req: Request) => {
    noStore();
    try {
        const { type, id, data } = await req.json();
        // console.log(type, id, data);
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const result = await db
            .collection(type)
            .updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: data });
        // console.log(result);    
        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ err });
    }
}
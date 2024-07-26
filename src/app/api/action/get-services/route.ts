import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const services = await db
            .collection("services")
            .find({})
            .toArray();
        return NextResponse.json({ services });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch services" });
    }
}

import client from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const revalidate = 0;
export const dynamic = 'force-dynamic'
export const POST = async (req: Request) => {
    noStore();
    try {
        const { type } = await req.json();
        if (type === "all") {
            const mongoClient = await client;
            const db = mongoClient.db("Mazamaza-shop");
            const services = await db
                .collection("services")
                .find({})
                .toArray();
            
            return NextResponse.json({ services });
        } else {
            return NextResponse.json({ error: "Invalid type" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch services" });
    }
}

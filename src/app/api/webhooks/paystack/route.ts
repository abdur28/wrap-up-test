import { NextResponse } from "next/server";
import crypto from 'crypto';
import client from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req: Request) {
    const payload = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY as string;
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(payload)).digest('hex');
    const signature = req.headers.get('x-paystack-signature');
    if (hash !== signature) {
        return NextResponse.json({ message: 'Invalid webhook signature' }, { status: 401 });
    }

    // Retrieve the request's body

    // console.log(payload)
    const event = req.body;
    if (payload.event !== 'charge.success') {
        return NextResponse.json({ message: 'Invalid event type' }, { status: 400 });
    }
    const mongoClient = await client;
    const db = mongoClient.db("Mazamaza-shop");
    const user = await db.collection("users").findOne({ email: payload.data.customer.email });

    // console.log(user)

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const receipt = {
        id: payload.data.id,
        amount: payload.data.amount,
        currency: payload.data.currency,
        status: payload.data.status,
        reference: payload.data.reference,
        channel: payload.data.channel,
        domain: payload.data.domain,
        gateway_response: payload.data.gateway_response,
        paidAt: payload.data.paidAt,
        customer: {
            id: payload.data.customer.id,
            clerkId: user.clerkId,
            email: user.email,
            name: user.firstName + " " + user.lastName,
            phone: payload.data.customer.phone,
        },
        cart : user.cart   
    };

    await db.collection("receipts").insertOne(receipt);

    await db.collection("users").updateOne({ email: payload.data.customer.email }, { $set: { cart: [] } });

    // Update your product inventory

    const boughtItems = user.cart.filter((item: any) => item.productId );

    boughtItems.forEach(async (item: any) => {
        const itemId = item.itemId;
        const quantity = item.quantity;
        
        await db.collection("products").findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(item.productId) },
            { $inc: { "products.$[elem].quantity": -quantity } },
            { arrayFilters: [ { "elem.itemId": itemId } ], returnDocument: 'after' }
        );
    });

    // Do something with event  

    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });
}




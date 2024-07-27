import client from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    noStore();
    try {
        const { productId, productName, productImage, itemId, color, size, quantity, price } = await req.json();
        let item = {};
        if (!productId || !size ) {
            item = {itemId, price, quantity, productImage, productName, type: "service" };
        } else {
            item = { productId, productName, productImage, itemId, color, size, quantity, price, type: "product" };
        }    
        const userId = auth().userId;
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const user = await db.collection('users').findOne({ clerkId: userId });
        if (!user) {
            return NextResponse.json({ success: false });
        }
        const existingItem = user.cart.find((cartItem: any) => cartItem.itemId === itemId);
        if (existingItem) {
            if (existingItem.type === "service") {
                return NextResponse.json({ success: false });
            }
            const newCart = user.cart.map((cartItem: any) => {
                if (cartItem.itemId === itemId) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + quantity
                    }
                }
                return cartItem;
            })
            await db.collection("users").updateOne({ clerkId: userId }, { $set: { cart: newCart } });
            return NextResponse.json({ success: true });
        }
        const updatedCart = [...user.cart, item];
        await db.collection("users").updateOne({ clerkId: userId }, { $set: { cart: updatedCart } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ success: false });
    }
    
}


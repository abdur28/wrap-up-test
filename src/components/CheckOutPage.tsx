'use client';

import { useCart } from "@/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaystackButton } from 'react-paystack'

const CheckOut = ({email}: any) => {
    const user = useUser()
    const { cart, isLoading, getCart, removeItem, subtotal, getAvailableItems } = useCart();
    const pathname = usePathname();
    const router = useRouter();
    const publicKey = "pk_test_6ae4404f5b9467016568c849dd6c1ec3dbe91f4a"
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const componentProps = {
        email,
        amount: subtotal * 100,
        first_name: name,
        custom_fields: {
        first_name: name,
        phone,
        },
        publicKey,
        text: "Order Now",
        onSuccess: () => {router.push("/checkout/success")},
        onClose: () => alert("Wait! Don't leave :("),
    }

    useEffect(() => {
        getCart();
    }, [getCart]);

    return (
        <div className="px-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {cart && cart.length === 0 ? (
                <div className="w-full h-[70vh] justify-center items-center flex ">Cart is Empty</div>
            ) : (
                <>
                <h2 className="text-xl font-semibold">Checkout</h2>
                {/* LIST */}
                <div className="flex flex-col gap-8 ">
                    {/* ITEM */}
                    {cart && cart.length > 0 && cart.map((item : any) => (
                    <div className="flex gap-4" 
                    key={item.itemId}
                    >
                    
                    <>
                        {item.productImage && (
                        <div className="flex justify-center items-center">
                        <Image
                            src={item.productImage}
                            alt=""
                            width={72}
                            height={96}
                            className="object-cover aspect-square rounded-md"
                        />
                        </div>    
                        )} 
                        <div className="flex flex-col justify-between w-full">
                        {/* TOP */}
                        <div className="">
                            {/* TITLE */}
                            <div className="flex items-center justify-between gap-8">
                            <h3 className="font-semibold ">
                                {item.productName}
                            </h3>
                            <div className="p-1  flex items-center gap-2">
                                {item.quantity && item.quantity > 1 && (
                            
                                <div className="text-xs text-green-500">
                                    {item.quantity} x{" "}
                                </div>
                                )}
                                ₦{item.price}
                            </div>
                            </div>
                            {/* DESC */}
                            <div className="text-sm text-gray-500">
                            {/* {item.availability?.status} */}
                            </div>
                        </div>
                        {/* BOTTOM */}
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-[0.76rem]">{item.productId ? `Color: ${item.color}` : ""}</span>
                            <span className="text-gray-500 text-[0.76rem]">{item.productId ? `Size: ${item.size.toUpperCase()}` : ""}</span>
                            <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{item.productId ? `Quantity: ${item.quantity}` : ""}</span>
                            </div>
                        </div>
                        
                        </div>
                        </>  
                    </div>
                    
                    ))} 
                </div>
                {/* BOTTOM */}
                <div className="flex flex-col gap-2">
                    <span className="font-semibold">Shipping</span>
                    <span className="text-gray-500 text-center">Coming Soon</span>
                    <div>
                        

                    </div>
                    <div className="flex items-center justify-between font-semibold">
                        <span className="">Subtotal</span>
                        <span className="">₦{subtotal}</span>
                    </div>
                </div>
                </>
            )} 
            </div>
            {cart && cart.length > 0 && (
            <div className="w-full lg:w-1/2 lg:sticky top-20  h-max flex justify-center items-center">
                <div className="w-[400px] h-[500px] rounded-3xl shadow-md shadow-slate-500 bg-[url('/background.jpg')] bg-cover bg-center">
                    <form 
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col gap-4 p-10">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Name:</p>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-2 border border-slate-500 rounded-md"
                            />
                        </div>    
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Phone Number:</p>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="p-2 border border-slate-500 rounded-md"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Address:</p>
                            <input
                                type="text"
                                name="address"
                                className="p-2 border border-slate-500 rounded-md"
                                required
                            />
                        </div>
                        <div className="flex flex-row gap-2">
                            <input
                                type="checkbox"
                                name="terms"
                                className="p-2 border border-slate-500 rounded-md"
                                required
                            />
                            <p className="text-[0.8rem]">I acknowledge that I have read and agree to the <span className="text-blue-500">Terms and Conditions</span></p>
                        </div>
                        <div className="flex justify-center mt-5">
                            {/* <button
                                className="p-2 bg-primary rounded-md w-full text-white"
                            >
                                Order Now
                            </button> */}
                            <PaystackButton  className="p-2 bg-primary rounded-md w-full " {...componentProps} />

                        </div>        
                    </form>
                </div>
            </div>
            )}
        </div>
    )
}

export default CheckOut
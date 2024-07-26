'use client'

import { useAdmin } from "@/hooks/useAdmin";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddModal from "./AddModel";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminOrders = () => {
    const { getReceipts,  receipts } = useAdmin();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        getReceipts();
    }, []);

    useEffect(() => {
        if (receipts.length > 0) {
            setIsLoading(false);
            console.log(receipts);
        }
    }, [receipts]);
    return (
        <>
        { isLoading ? (<div className="flex items-center justify-center h-full w-full">
            <div className="wrapper flex justify-center items-center">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>    
        </div>) : (
            <>
            <div className="flex flex-row w-full h-16 items-center justify-between pt-3 px-10">
                <h1 className="text-2xl font-semibold ">Orders</h1>
            </div>
            <div className="flex flex-col border rounded-2xl shadow-gray-400 shadow-md flex-grow m-3">
                <div className="flex flex-row text-[12px] h-10 border-b border-black px-2 items-center">
                        <div className="w-[10%]">
                            Order No.
                        </div>
                        <div className="w-[15%]">
                            Customer Name
                        </div>
                        <div className="w-[25%]">
                            Customer Email
                        </div>
                        <div className="w-[25%]">
                            Products and Services
                        </div>
                        <div className="w-[10%]">
                            Amount
                        </div>
                        <div className="w-[15%] flex justify-end">   
                            Paid At
                        </div>
                    
                </div>
                <div className="h-[440px] overflow-y-auto">
                <div className="flex flex-col ">
                {receipts.map((receipt: any, idx: number) => (
                    <div className="flex flex-row h-14 text-[12px] overflow-hidden px-2 border-y border-gray-300 items-center cursor-pointer hover:bg-gray-200"
                    onClick={() => router.push(`/receipt/${receipt.id}`)}
                    key={idx}>
                        <div className="w-[10%]">
                            {receipt.id}
                        </div>
                        <div className="w-[15%]">
                            {receipt.customer.name}
                        </div>
                        <div className="w-[25%]">
                            {receipt.customer.email}
                        </div>
                        <div className="w-[25%]">
                            {receipt.cart.length > 1 ? (receipt.cart.length + " items: " + receipt.cart[0].productName + " ..." ).slice(0, 40) : receipt.cart[0].productName.slice(0, 40)}
                        </div>
                        <div className="w-[10%] ">   
                            ₦{receipt.amount/100}
                        </div>
                        <div className="w-[15%] flex justify-end">   
                            {new Date(receipt.paidAt).toLocaleString()}
                        </div>
                    </div>
                   
                ))}    
                </div>
                </div>
            </div>
            </>
        )}
        </>
    
    );
};  

export default AdminOrders;
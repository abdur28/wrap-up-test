"use client";

import { useReceipt } from "@/hooks/useReceipt";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const OrderModal = ({setIsOrderOpen, setShowReviewModal}: {setIsOrderOpen: React.Dispatch<React.SetStateAction<boolean>>, setShowReviewModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { getReceipts, isLoading, receipts } = useReceipt();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getReceipts();
  }, [getReceipts]);

  return (
    <div className="md:w-[400px] w-[330px] absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 -right-12 flex flex-col gap-6 z-20 h-[500px] overflow-y-auto">
      {receipts && receipts.length === 0 ? (
        <div className="w-[330px] justify-center items-center flex h-full">{isLoading ? "Loading..." : "No Notifications"}</div>
      ) : (
        <>
          <div className="flex flex-row justify-between items-center">
              <h2 className="text-xl">Receipts</h2>
              <button className="px-2 py-1 rounded-3xl border border-black hover:bg-black hover:text-white"
              onClick={() => {
                setIsOrderOpen(false);
                setShowReviewModal(true);
              }}
              type="button"
              >
                Add a Review
              </button>
          </div>
          {/* LIST */}
          <div className="flex flex-col gap-2">
            {/* ITEM */}
            {receipts && receipts.length > 0 && receipts.map((receipt : any) => (
              <div className="flex flex-row cursor-pointer border hover:border-black rounded-2xl h-[60px] w-full px-2 justify-between " 
              onClick={() => {
                setIsOrderOpen(false);
                router.push(`/receipt/${receipt.id}`);
              }}
              key={receipt.id}
              >
              
              <div className="flex flex-col justify-between">
                <div className=" text-[0.8rem] text-white px-2 py-0.5 rounded-2xl bg-green-500 w-max mt-2"
                >
                   <span>{receipt.gateway_response}</span>
                </div>
                <p className="text-[0.7rem] ">REF: {receipt.reference}</p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-end mt-2">
                    <h3>₦{receipt.amount/100}</h3>
                </div>
                <p className="text-[0.7rem]">{new Date(receipt.paidAt).toLocaleString()}</p>
              </div>

              </div>
              
            ))} 
          </div>
          
        </>
       )} 
    </div>
  );
};

export default OrderModal;


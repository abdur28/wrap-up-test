"use client";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const CartModal = ({setIsCartOpen}: {setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const { cart, isLoading, getCart, removeItem, subtotal, getAvailableItems } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
      getCart();
  }, [getCart]);


  // if (isLoading) {
  //     return <div>Loading...</div>;
  // }
  return (
    <div className="md:w-[400px] w-[330px] absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 -right-12 flex flex-col gap-6 z-20 h-[500px] overflow-y-auto">
      {cart && cart.length === 0 ? (
        <div className="w-[330px] justify-center items-center flex h-full">{isLoading ? "Loading..." : 'Cart is Empty'}</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart && cart.length > 0 && cart.map((item : any) => (
              <div className="flex gap-4" 
              key={item.itemId}
              >
              
              <>
              
                {item.productImage && (
                  <Image
                    src={item.productImage}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )} 
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold ">
                        {item.productName}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
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
                      <span
                        className="text-blue-500"
                        style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                        onClick={() => {
                          removeItem(item.itemId)
                          if (pathname === `/wrapup/${item.productId}`) {
                            router.refresh();
                          }
                        }}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                  
                </div>
                </>  
              </div>
              
            ))} 
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">₦{subtotal}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-end text-sm">
              {/* <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button> */}
              <button
                type="button"
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                onClick={() => {
                  setIsCartOpen(false)
                  router.push("/checkout");
                }
                }

              >
                Checkout
              </button>
            </div>
          </div>
        </>
       )} 
    </div>
  );
};

export default CartModal;


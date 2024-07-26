'use client';

import { useCart } from "@/hooks/useCart";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




const Add = ({
  productId,
  productName,
  productImage,
  itemId, 
  color,
  size,
  quantity, 
  price
}: {
  productId: string,
  productName: string,
  productImage: string,
  itemId: string,
  color: string,
  size: string,
  quantity: number,
  price: number
}) => {

  const { cart, isLoading, addItem, getCart } = useCart();
  const router = useRouter();

  const sendToCart = () => {
    addItem({
      productId,
      productName,
      productImage,
      itemId, 
      color,
      size,
      quantity, 
      price
    })
    getCart();
    if (size !== "" || color !== "" || productId !== "" ) {
      router.push("/wrapup");
    }
  }


  return (
    <>
      <SignedIn >
        <button
              onClick={() => sendToCart()}
              type="button"
              disabled={isLoading}
              className="w-36 text-sm rounded-3xl ring-1 ring-black text-lama py-2 px-4 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
            >
              Add to Cart
        </button>
      </SignedIn>
      <SignedOut>
      <button
              onClick={() => router.push("/sign-in")}
              type="button"
              disabled={isLoading}
              className="w-36 text-sm rounded-3xl ring-1 ring-black text-lama py-2 px-4 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
            >
              Add to Cart
        </button>
      </SignedOut>
    </>
  )
};

export default Add;

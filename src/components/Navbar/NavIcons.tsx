"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import CartModal from "../CartModal";
import { useCart } from "@/hooks/useCart";
import { useClickOutside } from "@/hooks/useClickOutside";
import OrderModal from "../OrderModal";
import AddReviewModal from "../AddReviewModel";


const NavIcons = ({ isLoggedIn=false, setShowReviewModal }: { isLoggedIn: boolean, setShowReviewModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const { counter, getCart, cart } = useCart();
  const ref = useRef(null);

  // useEffect(() => {
  //   getCart();
  // }, []);

  useClickOutside(ref, () => {
    setIsCartOpen(false);
    setIsOrderOpen(false);
  });

  return (
    <>
    <div className="flex items-center gap-4 xl:gap-6 relative" ref={ref}>
      {isLoggedIn ? (
        <>
          <div 
          className="relative cursor-pointer"
          onClick={() => {
            setIsCartOpen(false);
            setIsOrderOpen((prev) => !prev)}}
          >
          <Image
            src="/notification.png"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />   
          </div> 
          <div
            className="relative cursor-pointer"
            onClick={() => {
              setIsOrderOpen(false);
              setIsCartOpen((prev) => !prev)}}
          >
            <Image src="/cart.png" alt="" width={20} height={20} />
          {counter > 0 ? (
            <div className="absolute -top-2 -right-3 w-4 h-4 bg-primary rounded-full text-black text-xs flex items-center justify-center">
              {counter}
            </div>
          ): ''}  
          </div>
          {isCartOpen && <CartModal setIsCartOpen={setIsCartOpen} />}  
          {isOrderOpen && <OrderModal setShowReviewModal={setShowReviewModal} setIsOrderOpen={setIsOrderOpen} />}
        </>  
      ):( 
      <Link href={"/sign-in"} className="lg:hidden">
        <Image 
        src="/profile.png" 
        alt="" 
        width={30} 
        height={30} />
      </Link>
      )}
      
    </div>
    </>
  );
};

export default NavIcons;


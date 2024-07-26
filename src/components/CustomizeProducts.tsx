"use client";

import { useCart } from "@/hooks/useCart";
import { color } from "framer-motion";
import { useEffect, useState } from "react";
import Add from "./Add";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CustomizeProducts = ({
  productId,
  productImage,
  productName,
  colors,
  sizes,
  items,
}: {
  productId: string;
  productImage: string;
  productName: string;
  colors: string[];
  sizes: string[];
  items: any[];
}) => {
  const { cart, getCart, getAvailableItems, availableItems } = useCart();
  const router = useRouter();

  const [currentList, setCurrentList] = useState(items);
  const [selectedColor, setSelectedColor] = useState(currentList[0]?.color);
  const [selectedSize, setSelectedSize] = useState(currentList[0]?.size);
  const [price, setPrice] = useState(currentList[0]?.price);
  const [quantity, setQuantity] = useState(currentList[0]?.quantity);
  const [itemId, setItemId] = useState(currentList[0]?.itemId);
  const [count, setCount] = useState(1);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const currentItem = currentList.find(
      (item) => item.color === selectedColor && item.size === selectedSize
    );
    if (currentItem) {
      setPrice(currentItem.price);
      setQuantity(currentItem.quantity);
      setItemId(currentItem.itemId);
    }
    if (currentList.find((item) => item.color === selectedColor)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setCount(1);
  }, [selectedColor, selectedSize, getCart, cart]);

  useEffect(() => {
    getAvailableItems(productId); 
    console.log(currentList);
  }, []);

  useEffect(() => {
    setCurrentList(availableItems);
    setSelectedColor(availableItems[0]?.color);
    setSelectedSize(availableItems[0]?.size);
    setPrice(availableItems[0]?.price);
    setQuantity(availableItems[0]?.quantity);
    setItemId(availableItems[0]?.itemId);
    setCount(1);
  }, [cart, availableItems]);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && count > 1) {
      setCount((prev) => prev - 1);
    }
    if (type === "i" && count < quantity) {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <>
    {currentList.length > 0 ? (
      <>
      <h2 className="font-medium text-2xl">₦ {price}</h2>
      <div className="h-[2px] bg-gray-100" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h4 className="font-medium">Choose a Quantity</h4>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                <button
                  className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                  onClick={() => handleQuantity("d")}
                  disabled={count === 1}
                >
                  -
                </button>
                {count}
                <button
                  className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                  onClick={() => handleQuantity("i")}
                  disabled={quantity === count}
                >
                  +
                </button>
              </div>
              {quantity  && (
                <div className="text-xs">
                  Only{" "}
                  <span className="text-orange-500">{quantity}</span> left!
                  <br /> Don&apos;t miss it
                </div>
              )}
            </div>
            {!disabled && 
              <Add
              productId={productId}
              productName={productName}
              productImage={productImage}
              itemId={itemId}
              color={selectedColor}
              size={selectedSize}
              quantity={count}
              price={price}
            />
            }
            
          </div>
        </div>
        <h4 className="font-medium">Choose a color</h4>
        <ul className="flex items-center gap-3">
          {colors.map((color) => {
            const isColorAvailable = currentList.some(
              (item) => item.color === color 
            );
            return (
              <li
                key={color}
                className={`w-8 h-8 rounded-full ring-1 ring-gray-300
                  ${!isColorAvailable ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}
                  relative`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  if (isColorAvailable) {
                    setSelectedColor(color);
                  }
                }}
              >
                {!isColorAvailable && (
                  <div className="absolute w-12 h-[3px] bg-black rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
                {selectedColor === color && (
                  <div className="absolute w-10 h-10 rounded-full ring-black ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </li>
            );
          })}
        </ul>
        <h4 className="font-medium">Choose a size</h4>
        <ul className="flex items-center gap-3">
          {sizes.map((size) => {
            const isSizeAvailable = currentList.some(
              (item) => item.size === size && item.color === selectedColor
            );
            return (
              <li
                key={size}
                className={`ring-1 ring-black text-black rounded-md py-1 px-4 text-sm cursor-pointer
                  ${selectedSize === size ? "bg-black text-white" : ""}
                  ${!isSizeAvailable ? "opacity-25 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                onClick={() => {
                  if (isSizeAvailable) {
                    setSelectedSize(size);
                  }
                }}
              >
                {size.toUpperCase()}
              </li>
            );
          })}
        </ul>
      </div>
      
      </>
      ): (
        <>
        <SignedIn>
            <h3 className="text-center">Out of Stock</h3>
        </SignedIn>
        <SignedOut>
            <button
              onClick={() => {router.push("/sign-in")}}
              className="hover:bg-primary border border-black hover:text-white px-6 py-2 rounded-2xl w-32"
            >Add</button>
        </SignedOut>
        </>
      )}
   </>
  );
};

export default CustomizeProducts;



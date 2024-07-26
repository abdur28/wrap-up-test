'use client';

import { updateItem } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

const EditProduct = ({
    productId,
    items,
    colors,
    sizes,
    description,
    type,
    shortDescription,
    servicePrice
}:{
    type: string;
    productId: string;
    items: any[];
    colors: string[];
    sizes: string[]
    description: string,
    shortDescription: string,
    servicePrice: number
}) => {
    const formRef = useRef<any>();
    const router = useRouter();
    const [state, formAction] = useFormState(updateItem, undefined);
    const [price, setPrice] = useState<number>(0);
    const [categories, setCategories] = useState(items);
    const [quantity, setQuantity] = useState<number>(0);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [descriptionText, setDescriptionText] = useState(description);
    const [shortDescriptionText, setShortDescriptionText] = useState(shortDescription);
    const [loading, setLoading] = useState(false);
    const [servicePriceState, setServicePriceState] = useState(servicePrice);

    const handleQuantity = (type: string) => {
        if (type === "i") {
            setQuantity(quantity + 1);
        } else if (type === "d") {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        const foundItem = categories.find((item) => item.color === selectedColor && item.size === selectedSize);
        if (foundItem) {
            setPrice(foundItem.price);
            setQuantity(foundItem.quantity);
        }
    }, [selectedColor, selectedSize]);

    useEffect(() => {
        setCategories(categories.map((item) => {
            if (item.color === selectedColor && item.size === selectedSize) {
                return {
                    ...item,
                    price,
                    quantity,
                };
            }
            return item;
        }));
        // console.log(categories);
    }, [price, quantity]);



    const handleSubmit = (e: any) => {
        setLoading(true);
        e.preventDefault();
        // const data = {
        //    items: categories,
        //    description: descriptionText
        // }
        const formData = new FormData(formRef.current);
        formData.append("id", productId);
        formData.append("type", type);
        if (type === "products") {
            formData.append("items", JSON.stringify(categories));
            formData.append("description", descriptionText);
        } else if (type === "services") {
            formData.append("description", descriptionText);
            formData.append("shortDescription", shortDescriptionText);
            formData.append("price", servicePriceState.toString());
        }
        
        formAction(formData);
        router.push("/admin");
    }
    

    return (
        <>
        {type === "products" ? (
        <form 
        className="flex flex-col gap-7"
        ref={formRef}
        onSubmit={handleSubmit}
        >
        <div className="flex flex-row items-center">
            <p className="w-1/5 font-medium">Price:</p>
            <input
            type="text"
            value={price || 0}
            onChange={(e) => {
                const value = Number(e.target.value);
                if (!isNaN(value)) {
                    setPrice(value);
                }
            }}
            className="w-3/5 border border-gray-300 bg-gray-200 rounded-2xl px-3 py-1"
            name="price"
            // required
            />
        </div>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
            <h4 className="font-medium">Quantities</h4>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                    <button
                    className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                    onClick={() => handleQuantity("d")}
                    disabled={quantity === 0}
                    type="button"
                    >
                    -
                    </button>
                    {quantity}
                    <button
                    className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                    onClick={() => handleQuantity("i")}
                    type="button"
                    >
                    +
                    </button>
                </div>
            
                </div>
                <div>
                    <button 
                    type="submit" 
                    disabled={loading}
                    className={`py-2 px-8 rounded-3xl border border-black hover:bg-primary ${loading && 'cursor-not-allowed'}`}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
              
                
                
            </div>
            </div>
            <h4 className="font-medium">Choose a color</h4>
            <ul className="flex items-center gap-3">
            {colors?.map((color) => {
                return (
                <li
                    key={color}
                    className={`w-10 h-10 rounded-full p-[3px]  opacity-100 cursor-pointer ${selectedColor === color ? "ring-black ring-2" : ""}`}
                >
                    <div
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    className="w-full h-full rounded-full" />

                </li>
                );
            })}
            </ul>
            <h4 className="font-medium">Choose a size</h4>
            <ul className="flex items-center gap-3">
            {sizes?.map((size) => {
                return (
                <li
                    key={size}
                    className={`ring-1 ring-black text-black rounded-md py-1 px-4 text-sm cursor-pointer
                    ${selectedSize === size ? "bg-black text-white" : ""} opacity-100 cursor-pointer`}
                    onClick={() => {setSelectedSize(size);}}
                >
                    {size.toUpperCase()}
                </li>
                );
            })}
            </ul>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <div>
            <h4 className="font-medium mb-5">Description: </h4>
            <textarea
            name="description"
            rows={20}
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            className="w-full border text-sm border-gray-300 bg-gray-200 rounded-2xl px-3 py-1"
            // required
            />
        </div>
        </form>
        ) : (
        <form
        className="flex flex-col gap-10"
        ref={formRef}
        onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-5">
                <p>Short Description:</p>
                <textarea
                name="shortDescription"
                rows={5}
                value={shortDescription}
                onChange={(e) => setShortDescriptionText(e.target.value)}
                className="w-full border text-sm border-gray-300 bg-gray-200 rounded-2xl px-3 py-1"
                required
                />
            </div>
        
            <div className="h-[2px] bg-gray-100" />
            <div className="flex flex-row justify-between  items-center">
                <p>Price:</p>
                <input
                type="text"
                value={servicePriceState}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value)) {
                        setServicePriceState(value);
                    }
                }}
                className="w-2/4 border border-gray-300 bg-gray-200 rounded-2xl px-3 py-1"
                name="price"
                required
                />
                <button
                disabled={loading}
                type="submit"
                className={`py-2 px-8 rounded-3xl border border-black hover:bg-primary ${loading && 'cursor-not-allowed'}`}
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            </div>
            <div className="h-[2px] bg-gray-100" />
            <div className="flex flex-col gap-5">
                <p>Description:</p>
                <textarea
                name="description"
                rows={20}
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                className="w-full border text-sm border-gray-300 bg-gray-200 rounded-2xl px-3 py-1"
                required
                />
            </div>
        </form>
        )}
        </>
    );
};
export default EditProduct;

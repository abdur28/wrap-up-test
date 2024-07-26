'use client'

import { addItem } from "@/lib/action";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

const AddModal = ({type, setIsAddOpen}: any) => {
    const formRef = useRef<any>();
    const [state, formAction] = useFormState(addItem, undefined);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState('');
    const [currentColor, setCurrentColor] = useState("");
    const [currentSize, setCurrentSize] = useState("");
    const [featured, setFeatured] = useState<boolean>(false);
    const [colors, setColors] = useState<any>([]);
    const [sizes, setSizes] = useState<any>([]);

    const handleSubmit = (e: any) => {
        setLoading(true);
        e.preventDefault();
        if (type === "products") {
            if (isNaN(Number(price))) {
                alert("Please enter a number");
                setLoading(false);
                setPrice('');
                return;
            }
            if (colors.length === 0 || sizes.length === 0) {
                alert("Please add colors and sizes");
                setLoading(false);
                return;
            }
        }
        const formData = new FormData(formRef.current);
        formData.append("type", type);
        formData.append("name", name); 
        formData.append("price", price);
        formData.append("shortDescription", shortDesc); 
        formData.append("description", description); 
        formData.append("featured", featured.toString()); 
        formData.append("colors", colors); 
        formData.append("sizes", sizes); 
        formAction(formData);
        setIsAddOpen(false);
    };
        

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="w-[700px] h-[500px] bg-white rounded-md p-4 mt-20 overflow-y-auto">
                <form className="flex flex-col gap-5"
                ref={formRef}
                onSubmit={handleSubmit}
                >
                    <div className="flex flex-row  justify-between">
                        <h1 className="text-xl font-bold">New {type === "products" ? "Product" : "Service"}</h1>
                        <div
                        onClick={() => setIsAddOpen(false)}
                        >
                            <Image
                            src="/cross.png" 
                            alt="edit" 
                            className="cursor-pointer hover:scale-125 transition-all"
                            width={20} 
                            height={20} />        
                        </div>
                    </div>
                    <div className="flex flex-row text-sm items-center">
                        <p className="w-1/5">Name:</p>
                        <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-1"
                        name="name"
                        required
                        />
                    </div>
                    
                    <div className="flex flex-row text-sm items-center">
                        <p className="w-1/5">Short Desc:</p>
                        <textarea
                        className="w-full border border-gray-300 rounded-md p-1"
                        onChange={(e) => setShortDesc(e.target.value)}
                        rows={5}
                        name="shortDescription"
                        required
                        />
                    </div>
                    <div className="flex flex-row text-sm items-center">
                        <p className="w-1/5">Description:</p>
                        <textarea
                        className="w-full border border-gray-300 rounded-md p-1"
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        name="description"
                        required
                        />
                    </div>
                    {type === "services" ? (
                        <div className="flex flex-row text-sm items-center">
                            <p className="w-1/5">Price:</p>
                            <input
                            type="text"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            className="w-full border border-gray-300 rounded-md p-1"
                            name="price"
                            required
                            />
                        </div>
                    ) : (
                        <>
                        <div className="flex flex-row text-sm items-center">
                            <p className="w-1/5">Colors:</p>
                            <div className="flex flex-col w-full gap-1">
                                <div className="flex flex-row gap-2">
                                    <input
                                    type='text'
                                    className="w-4/5 border border-gray-300 rounded-md p-1"
                                    name="colors"
                                    value={currentColor}
                                    onChange={(e) => setCurrentColor(e.target.value)}
                                    />
                                    <div className="w-1/5 justify-center items-center flex">
                                    <Image
                                    src="/plus.png"
                                    className="cursor-pointer hover:scale-125 transition-all"
                                    alt=""
                                    width={20}
                                    height={20}
                                    onClick={() => {
                                        setColors([...colors, currentColor])
                                        setCurrentColor("")
                                    }}
                                    />
                                    </div>
                                    
                                </div>
                                
                                <div className="flex flex-row gap-4">
                                    {colors.map((color: string, index: number) => (
                                        <div className="flex flex-row"
                                        key={index}
                                        >
                                            <div
                                            key={color}
                                            style={{ backgroundColor: color }}
                                            className="w-7 h-7 rounded-full border"
                                            >
                                            </div>
                                            <div 
                                            onClick={() => setColors(colors.filter((c: string) => c !== color))}
                                            className="text-[red]  cursor-pointer hover:scale-125 transition-all items-start flex"
                                            >X</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row text-sm items-center">
                            <p className="w-1/5">Sizes:</p>
                            <div className="flex flex-col w-full gap-1">
                                <div className="flex flex-row gap-2">
                                    <input
                                    type='text'
                                    className="w-4/5 border border-gray-300 rounded-md p-1"
                                    name="colors"
                                    value={currentSize}
                                    onChange={(e) => setCurrentSize(e.target.value.toLowerCase())}
                                    />
                                    <div className="w-1/5 justify-center items-center flex">
                                    <Image
                                    src="/plus.png"
                                    className="cursor-pointer hover:scale-125 transition-all"
                                    alt=""
                                    width={20}
                                    height={20}
                                    onClick={() => {
                                        if (currentSize.length > 3){
                                            alert("Max 3 characters")
                                            return
                                        }

                                        setSizes([...sizes, currentSize])
                                        setCurrentSize("")
                                    }}
                                    />
                                    </div>
                                    
                                </div>
                                
                                <div className="flex flex-row gap-4">
                                    {sizes.map((size: string) => (
                                        <div className="flex flex-row">
                                            <div
                                            key={size}
                                            className="text-lg"
                                            >
                                                {size.toUpperCase()}
                                            </div>
                                            <div 
                                            onClick={() => setSizes(sizes.filter((s: string) => s !== size))}
                                            className="text-[red]  cursor-pointer hover:scale-125 transition-all items-start flex"
                                            >X</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row text-sm items-center">
                            <p className="w-1/5">Featured:</p>
                            <div className="flex justify-center items-center">
                                <input
                                type="checkbox"
                                className="w-5 h-5 border border-gray-300 rounded-md p-1"
                                name="featured"
                                onClick={() => setFeatured(!featured)}
                                />
                            </div>
                        </div>
                        </>
                    )}
                    
                    <div className="flex  text-sm items-center">
                        <button
                        type="submit"
                        className="w-1/5 py-2 px-4 rounded-2xl border border-black hover:bg-primary"
                        >
                            {loading ? "Loading..." : "Add"}
                        </button>
                    </div>    
                </form>
            </div>
        </div>
    );
};   

export default AddModal
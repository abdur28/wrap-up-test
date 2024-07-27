'use client'

import { useAdmin } from "@/hooks/useAdmin";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddModal from "./AddModel";

const AdminProducts = () => {
    const { products, getProducts, deleteItem, deleteImage, isLoading } = useAdmin();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deletedItem , setDeletedItem] = useState<any>();

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
         { isLoading ? (
            <div className="flex items-center justify-center h-full w-full">
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
                <Image 
                src="/plus.png" 
                className="cursor-pointer hover:scale-125 transition-all"
                onClick={() => setIsAddOpen(true)}
                alt="" 
                width={30} 
                height={30} />

                <Image 
                src="/reload.png" 
                className="cursor-pointer hover:scale-125 transition-all"
                onClick={() => getProducts()}
                alt="" 
                width={30} 
                height={30} />
            </div>
            {isAddOpen && <AddModal type="products" setIsAddOpen={setIsAddOpen}/>}
            <div className="flex flex-col border rounded-2xl shadow-gray-400 shadow-md flex-grow m-3 ">
                <div className="flex flex-row text-[12px] h-10 border-b border-black px-2 items-center">
                    <div className=" w-[40px] ">S/No.</div>
                    <div className=" w-[200px] pl-8">Name</div>
                    <div className=" w-[300px] ">Short Desc</div>
                    <div className=" w-[150px] ">Colors</div>
                    <div className=" w-[100px] ">Sizes</div>
                    <div className=" w-[60px] ">Featured</div>
                </div>
                <div className="h-[440px] overflow-y-auto">
                <div className="flex flex-col ">
                {products && products.map((product, index) => (
                    <>
                        {deletedItem === product._id ? null : (
                            <div className="flex flex-row h-10 text-[12px] overflow-hidden px-2 border-y border-gray-300 items-center "
                            key={index}>
                                <div className=" w-[40px]  flex justify-center items-center">{index + 1}.</div>
                                <div className=" w-[200px]  flex flex-row items-center gap-2   ">
                                    <div className="w-[25px] h-[25px]">
                                        <Image 
                                        src={product.images[0] || '/image-placeholder.png'} 
                                        alt="" 
                                        width={20} 
                                        height={20} />
                                    </div>
                                    {product.name.length < 20 ? product.name : (product.name?.slice(0, 20) + "...")}
                                </div>
                                <div className=" w-[300px]  ">{product.shortDescription?.length < 40 ? product.shortDescription : (product.shortDescription?.slice(0, 40) + "...")}</div>
                                <div className=" w-[150px]  flex flex-row gap-2 ">
                                    {product.colors.map((color: string) => (
                                        <div
                                        key={color}
                                        style={{ backgroundColor: color }}
                                        className="w-[25px] h-[25px] rounded-full border"
                                        >
                                            {/* {color} */}
                                        </div>
                                    ))}
                                    
                                </div>
                                <div className=" w-[100px] ">
                                    {product.sizes.join(', ').toUpperCase()}
                                </div>
                                <div className={` w-[60px]  ${product.featured ? 'text-blue-500' : 'text-red-500'}`}>{product.featured ? 'True' : 'False'}</div>
                                <div className=" h-full flex-grow flex flex-row gap-8 items-center justify-center">
                                    <Link 
                                    href={`/admin/products/${product._id}`}
                                    className="">
                                        <Image 
                                        src="/edit.png" 
                                        alt="edit" 
                                        className="cursor-pointer hover:scale-125 transition-all"
                                        width={20} 
                                        height={20} />
                                    </Link>
                                    <div>
                                        <Image 
                                        src="/cross.png" 
                                        alt="edit" 
                                        onClick={() => {
                                            deleteImage(product.images);
                                            deleteItem({type: 'products', id: product._id});
                                            getProducts();
                                            setDeletedItem(product._id);
                                        }}
                                        className="cursor-pointer hover:scale-125 transition-all"
                                        width={20} 
                                        height={20} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ))}
                </div>
            </div>
            </div>
            </>
        )}
        </>
    );
};  

export default AdminProducts;
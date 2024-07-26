'use client'

import { useAdmin } from "@/hooks/useAdmin";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddModal from "./AddModel";
import Link from "next/link";

const AdminServices = () => {
    const { services, getServices, deleteItem, deleteImage } = useAdmin();
    const [isLoading, setIsLoading] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deletedItem , setDeletedItem] = useState<any>();

    useEffect(() => {
        setIsLoading(true);
        getServices();
    }, []);

    useEffect(() => {
        if (services.length > 0) {
            setIsLoading(false);
            console.log(services);
        }
    }, [services]);
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
                onClick={() => getServices()}
                alt="" 
                width={30} 
                height={30} />
            </div>
            {isAddOpen && <AddModal type="services" setIsAddOpen={setIsAddOpen}/>}
            <div className="flex flex-col border rounded-2xl shadow-gray-400 shadow-md flex-grow m-3">
                <div className="flex flex-row text-[12px] h-10 border-b border-black px-2 items-center">
                    <div className=" w-[40px] ">S/No.</div>
                    <div className=" w-[300px] pl-8">Name</div>
                    <div className=" w-[410px] ">Short Desc</div>
                    <div className=" w-[100px] ">Price</div>
                    
                </div>
                <div className="h-[440px] overflow-y-auto">
                <div className="flex flex-col ">
                {services.map((service: any, idx: number) => (
                    <>
                    {deletedItem === service._id ? null : (
                        <div className="flex flex-row h-10 text-[12px] overflow-hidden px-2 border-y border-gray-300 items-center "
                        key={idx}>
                            <div className=" w-[40px]  flex justify-center items-center">{idx + 1}.</div>
                            <div className=" w-[300px]  flex flex-row items-center gap-2   ">
                                <div className="w-[25px] h-[25px]">
                                    <Image 
                                    src={service.images[0] || '/image-placeholder.png'} 
                                    alt="" 
                                    width={20} 
                                    height={20} />
                                </div>
                                {service.name.length < 35 ? service.name : (service.name?.slice(0, 35) + "...")}
                            </div>
                            <div className=" w-[410px]  ">{service.shortDescription.length < 55 ? service.shortDescription : (service.shortDescription?.slice(0, 55) + "...")}</div>
                            <div className=" w-[100px]  flex flex-row gap-2 ">
                                ₦ {service.price}
                            </div>
                            <div className=" h-full flex-grow flex flex-row gap-8 items-center justify-center">
                                <Link
                                href={`/admin/services/${service._id}`}
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
                                    className="cursor-pointer hover:scale-125 transition-all"
                                    onClick={() => {
                                        deleteImage(service.images);
                                        deleteItem({type: 'services', id: service._id});
                                        getServices();
                                        setDeletedItem(service._id);
                                    }}
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

export default AdminServices;
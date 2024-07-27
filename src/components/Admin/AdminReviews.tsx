'use client'

import { useAdmin } from "@/hooks/useAdmin";
import Image from "next/image";
import { useEffect, useState } from "react";

const AdminReviews = () => {
    const { reviews, getReviews, deleteReview, approveReview } = useAdmin();
    const [isLoading, setIsLoading] = useState(false);
    const [deletedItem , setDeletedItem] = useState<any>();
    const [approvedItemIndex , setApprovedItemIndex] = useState<any>([]);

    useEffect(() => {
        getReviews();
    }, []);

    useEffect(() => {
        if (reviews.length > 0) {
            reviews.forEach((review: any, index: number) => {
                if (review.approved) {
                    setApprovedItemIndex((prev: any) => [...prev, index]);
                }
            })
        }
    }, [reviews]);
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
                <h1 className="text-2xl font-semibold ">Reviews</h1>
                <Image 
                src="/reload.png" 
                className="cursor-pointer hover:scale-125 transition-all"
                onClick={() => getReviews()}
                alt="" 
                width={30} 
                height={30} />

            </div>
            <div className="flex flex-col border rounded-2xl shadow-gray-400 shadow-md flex-grow m-3">
                <div className="flex flex-row text-[12px] h-10 border-b border-black px-2 items-center">
                            <div className="w-[5%]">
                                S/No.
                            </div>
                            <div className="w-[7%]">
                                Profile
                            </div>
                            <div className="w-[15%]">
                                Name
                            </div>
                            <div className="w-[58%] pl-[7px]">
                                Comment
                            </div>
                            <div className="w-[15%] pl-[20px]">
                                Review
                            </div>
                            <div className="w-[5%] mr-[10px]">
                                Approve
                            </div>    
                            <div className="w-[5%]">
                                Delete
                            </div>
                    
                </div>
                <div className="h-[440px] overflow-y-auto">
                <div className="flex flex-col ">
                {reviews.map((review: any, idx: number) => (
                    <>
                    {deletedItem === review._id ? null : (
                        <div className="flex flex-row h-16 text-[12px] overflow-hidden px-2 border-y border-gray-300 items-center "
                        key={idx}>
                            <div className="w-[5%]">
                                {idx + 1}.
                            </div>
                            <div className="w-[7%]">
                                <Image
                                src={review.profilePicture}
                                alt=""
                                width={40}
                                height={40}
                                className="rounded-full"
                                />
                            </div>
                            <div className="w-[15%]">
                                {review.name}
                            </div>
                            <div className="w-[58%]">
                                {review.comment}
                            </div>
                            <div className="w-[15%] flex flex-row justify-start items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Image 
                                    key={i}
                                    src="/star.png" 
                                    className="cursor-pointer hover:scale-125 transition-all"
                                    alt="" 
                                    width={18} 
                                    height={18} />
                                ))}
                            </div>
                            <div className="w-[5%]">
                                <svg className="overflow-visible cursor-pointer" viewBox="0 0 64 64" height="1.7em" width="1.7em"
                                onClick={() => {
                                    if (!review.approved) {
                                        approveReview({id: review._id})
                                        getReviews()
                                        setApprovedItemIndex([...approvedItemIndex, idx])
                                    }
                                }}
                                >
                                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" 
                                    pathLength="575.0541381835938" 
                                    className="path "
                                    fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                                    style={{ 
                                    transition: "stroke-dashoffset 0.5s ease 0s, stroke-dasharray 0.5s ease 0s" ,
                                    strokeDasharray: approvedItemIndex.includes(idx) ? "70.5096664428711 9999999" : "241 9999999",
                                    strokeDashoffset: approvedItemIndex.includes(idx)  ? "-262.2723388671875" : "0",
                                    }}
                                    ></path>
                                </svg>
                            </div>    
                            <div className="w-[5%]">
                                <Image 
                                src="/cross.png" 
                                className="cursor-pointer hover:scale-125 transition-all"
                                onClick={() => {
                                    deleteReview({id: review._id})
                                    getReviews()
                                    setDeletedItem(review._id)
                                }}
                                alt="" 
                                width={25} 
                                height={25} />
                                
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

export default AdminReviews;
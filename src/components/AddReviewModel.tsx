'use client'

import { addReview } from "@/lib/action";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import './addReviewModel.scss'
import { useAlert } from "@/hooks/useAlert";

const AddReviewModal = ({setShowReviewModal, setAlert}: {setShowReviewModal: React.Dispatch<React.SetStateAction<boolean>>, setAlert: React.Dispatch<React.SetStateAction<any>>}) => {
    const formRef = useRef<any>();
    const [state, formAction] = useFormState(addReview, undefined);
    const { showAlert, hideAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number>(1);

    const handleSubmit = (e: any) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(formRef.current); 
        formData.append("product", product);
        formData.append("comment", comment);
        formData.append("rating", rating.toString());
        formAction(formData);
    };

    useEffect(() => {
        if (state) {
            hideAlert();
            setShowReviewModal(false);
            if (state.status === "success"){
                showAlert({
                    text: "Thank you for your review 😃",
                    type: "success",
                    show: true
                });
                setLoading(false);
                setTimeout(() => {
                hideAlert();
                }, 5000);
            
            } else {

                    showAlert({
                        show: true,
                        text: state.message,
                        type: "danger",
                    });
                    setLoading(false);
                    setTimeout(() => {
                    hideAlert();    
                    }, 5000);
                    // router.refresh()
            }
        }
    },[state])
        
    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="w-[300px] lg:w-[400px] h-max bg-white rounded-2xl p-4 mt-20 overflow-y-auto">
                <form className="flex flex-col gap-5"
                ref={formRef}
                onSubmit={handleSubmit}
                >
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl font-semibold">Add Review</h2>
                        <div className="items-center">
                        <Image
                        src={"/cross.png"}
                        alt=""
                        width={30}
                        height={30}
                        className="cursor-pointer"
                        onClick={() => setShowReviewModal(false)}
                        />
                        </div>
                    </div>    
                    <div className="flex flex-col gap-2">
                        <p>Product Name:</p>
                        <input
                        type="text"
                        name="product"
                        value={product}
                        className="border rounded-2xl px-2 py-1 focus:border-black"
                        onChange={(e) => setProduct(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Rating:</p>
                        <div className="flex justify-start items-center">
                        <div className="rating">
                            <input value="5" name="rating" id="star5" type="radio" onChange={(e) => setRating(Number(e.target.value))}/>
                            <label htmlFor="star5"></label>
                            <input value="4" name="rating" id="star4" type="radio" onChange={(e) => setRating(Number(e.target.value))}/>
                            <label htmlFor="star4"></label>
                            <input value="3" name="rating" id="star3" type="radio" onChange={(e) => setRating(Number(e.target.value))}/>
                            <label htmlFor="star3"></label>
                            <input value="2" name="rating" id="star2" type="radio" onChange={(e) => setRating(Number(e.target.value))}/>
                            <label htmlFor="star2"></label>
                            <input value="1" name="rating" id="star1" type="radio" defaultChecked onChange={(e) => setRating(Number(e.target.value))}/>
                            <label htmlFor="star1"></label>
                        </div>
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Commment:</p>
                        <textarea
                        name="comment"
                        className="border rounded-2xl px-2 py-1 text-sm focus:border-black"
                        rows={5}
                        maxLength={150}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="text-xs text-right text-gray-500">{comment.length}/150</div>
                    </div>
                    <button
                    className="hover:bg-black hover:text-white border border-black rounded-2xl px-2 py-1"
                    type="submit"
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};   

export default AddReviewModal
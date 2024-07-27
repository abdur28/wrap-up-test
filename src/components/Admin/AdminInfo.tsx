'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { updateInfo } from "@/lib/action";
import { CldUploadWidget } from 'next-cloudinary';

const AdminInfo = ({infoAsString}: any) => {

    const info = JSON.parse(infoAsString || "{}");

    const formRef = useRef<any>();
    const [state, formAction] = useFormState(updateInfo, undefined);
    const [styleSavantHomeText, setStyleSavantHomeText] = useState(info.styleSavantHomeText);
    const [address, setAddress] = useState(info.address);
    const [wrapUpHomeText, setWrapUpHomeText] = useState(info.wrapUpHomeText);
    const [wrapUpPhoneNumber, setWrapUpPhoneNumber] = useState(info.wrapUpPhoneNumber);
    const [wrapUpEmail, setWrapUpEmail] = useState(info.wrapUpEmail);
    const [wrapUpInstagram, setWrapUpInstagram] = useState(info.wrapUpInstagram);
    const [wrapUpTwitter, setWrapUpTwitter] = useState(info.wrapUpTwitter);
    const [servicesIntroduction, setServicesIntroduction] = useState(info.servicesIntroduction);
    const [servicesDescription, setServicesDescription] = useState(info.servicesDescription);
    const [servicesImage, setServicesImage] = useState(info.servicesImage);
    const [servicesHomeText, setServicesHomeText] = useState(info.servicesHomeText);
    const [servicesPhoneNumber, setServicesPhoneNumber] = useState(info.servicesPhoneNumber);
    const [servicesEmail, setServicesEmail] = useState(info.servicesEmail);
    const [servicesInstagram, setServicesInstagram] = useState(info.servicesInstagram);
    const [servicesTwitter, setServicesTwitter] = useState(info.servicesTwitter);
    const [faqs, setFaqs] = useState<any[]>(info.faqs);
    const [openFaqs, setOpenFaqs] = useState<number>();
    const [uploadImage, setUploadImage] = useState<any>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (uploadImage) {
            // console.log(uploadImage?.secure_url)
            setServicesImage(uploadImage?.secure_url);
        }
    }, [uploadImage])

    const handleSubmit = (e: any) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.append("styleSavantHomeText", styleSavantHomeText);
        formData.append("address", address);
        formData.append("wrapUpHomeText", wrapUpHomeText);
        formData.append("wrapUpPhoneNumber", wrapUpPhoneNumber);
        formData.append("wrapUpEmail", wrapUpEmail);
        formData.append("wrapUpInstagram", wrapUpInstagram);
        formData.append("wrapUpTwitter", wrapUpTwitter);
        formData.append("servicesIntroduction", servicesIntroduction);
        formData.append("servicesDescription", servicesDescription);
        formData.append("servicesImage", servicesImage);
        formData.append("servicesHomeText", servicesHomeText);
        formData.append("servicesPhoneNumber", servicesPhoneNumber);
        formData.append("servicesEmail", servicesEmail);
        formData.append("servicesInstagram", servicesInstagram);
        formData.append("servicesTwitter", servicesTwitter);
        if (faqs.filter((faq: any) => !faq.question || !faq.answer).length > 0) {
            alert("Please fill in all questions");
            setLoading(false);
            return;
        }
        formData.append("faqs", JSON.stringify(faqs));
        formAction(formData);
        setLoading(false);
    }
    

    return (
        <>
           <form 
           ref={formRef}
           onSubmit={handleSubmit}
           className="flex flex-col overflow-y-auto gap-7 p-7">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl font-semibold">General Information</h1>
                        <button
                        className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} bg-black text-white rounded-3xl px-4 py-2`}
                        disabled={loading}
                        type="submit"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                    <div className="w-full h-[1px] bg-black"/>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">Style Savant</h2>
                    <div className="flex flex-row ">
                        <p className="w-1/6">Home Text:</p>
                        <textarea
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        name="styleSavantHomeText"
                        value={styleSavantHomeText}
                        onChange={(e) => setStyleSavantHomeText(e.target.value)}
                        rows={5}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Address:</p>
                        <input
                        type="text"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        name="address"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">Style with Mini Mazamaza</h2>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Introduction:</p>
                        <input
                        type="text"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={servicesIntroduction}
                        onChange={(e) => setServicesIntroduction(e.target.value)}
                        name="servicesIntroduction"
                        />
                    </div>
                    <div className="flex flex-row ">
                        <div className="w-1/6 flex flex-col justify-center items-start gap-2">
                            <div className="flex aspect-square w-24 border border-black overflow-hidden">
                                <Image
                                src={ servicesImage || "/image-placeholder.png"}
                                alt=""
                                width={100}
                                height={100}
                                className="object-cover"
                                />
                            </div>
                            <CldUploadWidget uploadPreset="mazamaza_shop" 
                            options={
                            {maxFiles: 1}
                            }
                            // onShowCompleted={(e) => console.log(uploadImage, e, "show")}
                            onSuccess={(result) => {setUploadImage(result.info)}}>
                            {({ open }) => {
                                return (
                                <div className="flex items-center justify-center w-24">
                                    <Image
                                    src="/plus.png"
                                    onClick={() => open()}
                                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} hover:scale-125 transition-none`}
                                    alt="plus"
                                    width={20}
                                    height={20}
                                    />
                                </div>
                                );
                            }}
                            </CldUploadWidget>
                            
                        </div>
                        <textarea
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={servicesDescription}
                        onChange={(e) => setServicesDescription(e.target.value)}
                        name="servicesDescription"
                        rows={5}
                        />
                    </div>
                    <div className="flex flex-row ">
                        <p className="w-1/6">Home Text:</p>
                        <textarea
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={servicesHomeText}
                        onChange={(e) => setServicesHomeText(e.target.value)}
                        name="servicesHomeText"
                        rows={5}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Phone Number:</p>
                        <input
                        type="text"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={servicesPhoneNumber}
                        onChange={(e) => setServicesPhoneNumber(e.target.value)}
                        name="servicesPhoneNumber"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Email:</p>
                        <input
                        type="email"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={servicesEmail}
                        onChange={(e) => setServicesEmail(e.target.value)}
                        name="servicesEmail"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Instagram:</p>
                        <input
                        type="text"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={servicesInstagram}
                        onChange={(e) => setServicesInstagram(e.target.value)}
                        name="servicesInstagram"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Twitter :</p>
                        <input
                        type="text"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={servicesTwitter}
                        onChange={(e) => setServicesTwitter(e.target.value)}
                        name="servicesTwitter"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">Wrap Up</h2>
                    <div className="flex flex-row ">
                        <p className="w-1/6">Home Text:</p>
                        <textarea
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={wrapUpHomeText}
                        onChange={(e) => setWrapUpHomeText(e.target.value)}
                        name="wrapUpHomeText"
                        rows={5}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Phone Number:</p>
                        <input
                        type="text"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={wrapUpPhoneNumber}
                        onChange={(e) => setWrapUpPhoneNumber(e.target.value)}  
                        name="wrapUpPhoneNumber"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Email:</p>
                        <input
                        type="email"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={wrapUpEmail} 
                        onChange={(e) => setWrapUpEmail(e.target.value)}
                        name="wrapUpEmail"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Instagram:</p>
                        <input
                        type="text"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={wrapUpInstagram}
                        onChange={(e) => setWrapUpInstagram(e.target.value)}
                        name="wrapUpInstagram"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="w-1/6">Twitter :</p>
                        <input
                        type="text"
                        className="w-full border rounded-2xl px-4 py-2 text-sm" 
                        value={wrapUpTwitter}
                        onChange={(e) => setWrapUpTwitter(e.target.value)}
                        name="wrapUpTwitter"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">FAQs</h2>
                    {faqs &&faqs.map((faq, index) => (
                    <div className="flex flex-col gap-2 "
                    key={index}
                    >
                        <div className="flex flex-row items-center">
                            <p className="w-1/6">Question:</p>
                            <div className="w-full flex flex-row gap-10 justify-center items-center">
                                <input
                                className="w-full border rounded-2xl px-4 py-2 text-sm " 
                                value={faq.question}
                                onChange={(e) => {
                                    const newFaqs = [...faqs];
                                    newFaqs[index].question = e.target.value;
                                    setFaqs(newFaqs);
                                }}
                                name="question"
                                required
                                /> 
                                <div className="w-24 h-full flex flex-row justify-between">
                                    <Image  src="/edit.png" alt="edit" width={25} height={25} 
                                    className="cursor-pointer hover:scale-125 transition-none"
                                    onClick={() => {
                                        setOpenFaqs(index);
                                    }}
                                    />
                                    <Image  src="/cross.png" alt="delete" width={25} height={25}
                                    className="cursor-pointer hover:scale-125 transition-none"
                                    onClick={() => {
                                        const newFaqs = [...faqs];
                                        newFaqs.splice(index, 1);
                                        setFaqs(newFaqs);
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                        {openFaqs === index && (
                            <div className="flex flex-row ">
                                <p className="w-1/6">Answer:</p>
                                <div className="w-full flex flex-row gap-10 justify-center items-center">
                                    <textarea
                                    className="w-full border rounded-2xl px-4 py-2 text-sm " 
                                    value={faq.answer}
                                    onChange={(e) => {
                                        const newFaqs = [...faqs];
                                        newFaqs[index].answer = e.target.value;
                                        setFaqs(newFaqs);
                                    }}
                                    name="question"
                                    rows={2}
                                    required
                                    /> 
                                    <div className="w-24 h-full"></div>
                                </div>
                            </div>  
                        )}
                        
                    </div>
                    ))}
                    <div className="w-20 h-20">
                        <Image
                        src="/plus.png"
                        alt="add"
                        width={25}
                        height={25}
                        onClick={() => {
                            if (faqs) {
                                setFaqs([...faqs, { question: "", answer: "" }]);
                            } else {
                                setFaqs([{ question: "", answer: "" }]);
                            }
                        }}
                        />
                    </div>
                </div>
           </form>
        </>
    );
};  

export default AdminInfo;
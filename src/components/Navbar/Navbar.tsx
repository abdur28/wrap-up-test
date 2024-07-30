'use client'

import Image from "next/image"
import Link from "next/link"
import NavIcons from "./NavIcons"
import Sidebar from "./Sidebar"
import { ClerkLoaded, ClerkLoading, SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import { useState } from "react"
import AddReviewModal from "../AddReviewModel"
import Alert from "../Alert"
import { useAlert } from "@/hooks/useAlert"


const Navbar = ({admin}: {admin: boolean}) => {
    const [showReviewModal,  setShowReviewModal] = useState(false)
    const {text, type, show, showAlert, hideAlert} = useAlert();
    const [alret, setAlert] = useState({show: false, text: "", type: ""});

    

    return (
        <>
     
           <div className="sticky top-0 z-30 backdrop-blur-lg bg-[#a0a0a015]">
            <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 lg:hidden">
                {/* MOBILE */}
                <div className="h-full pr-12 flex  items-center justify-between ">
                    <Link href="/" className="flex  items-center gap-1 ">
                        <Image src="/logo.png" alt="" width={35} height={35} />
                        <div className="text-3xl tracking-wide font-Tangerine">Style Savant</div>
                    </Link>
                    <ClerkLoading>
                        <div className="flex flex-row items-center  gap-2">
                            <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></div>
                            <Sidebar admin={admin} />
                        </div>    
                    </ClerkLoading>
                    <ClerkLoaded>
                    <div className="flex flex-row items-center gap-2">
                        <SignedIn>
                            <div className=" flex flex-row gap-5 items-center justify-center">
                                <NavIcons setShowReviewModal={setShowReviewModal} isLoggedIn={true} />
                                <UserButton />
                                
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <div className="flex  flex-row items-center gap-2 ">
                                <>
                                    <NavIcons setShowReviewModal={setShowReviewModal} isLoggedIn={false} />
                                </>
                            </div>
                        </SignedOut>    
                        <Sidebar admin={admin}/>
                    </div>
                    </ClerkLoaded>
                </div>
            </div>
           </div>

            <div className="sticky top-0 z-30 hidden lg:block">
            <div className="h-24 sticky top-0 w-screen lg:flex justify-center items-center z-30 hidden ">
                <div className="flex justify-center items-center gap-6 py-2 px-5 font-Satoshi font-normal text-sm bg-white/30 backdrop-blur-lg rounded-xl border">
                    <div className="flex flex-row items-center gap-1">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo.png" alt="" width={30} height={30} />
                        
                    </Link>
                    <Link href={'/'}  className="font-Tangerine text-2xl">Style Savant</Link>
                    </div>
                    <Link href={'/wrapup'} >Wrap Up</Link>
                    <Link href="/services"  >Services</Link>
                    {/* <Link href="/">Deals</Link> */}
                    <Link href="/contact">Contact</Link>
                    <ClerkLoading>
                        <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></div>
                    </ClerkLoading>
                    <ClerkLoaded>
                        <SignedIn >
                            {admin && (
                                <Link href="/admin">Admin</Link>
                            )}
                            <NavIcons setShowReviewModal={setShowReviewModal} isLoggedIn={true} />
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <div className="flex flex-row items-center gap-5">
                                <Link href={"/sign-in"}  className="font-semibold cursor-pointer flex flex-row justify-center items-center font-Satoshi gap-1">
                                    SignIn
                                    <Image 
                                    src="/profile.png" 
                                    alt="" 
                                    width={18} 
                                    height={18} />
                                </Link>
                            </div>
                            <NavIcons setShowReviewModal={setShowReviewModal} isLoggedIn={false} />
                        </SignedOut>
                    </ClerkLoaded>
                 
                </div>
            </div>
            </div>
    
        {show && <Alert text={text} type={type} />}
        {showReviewModal && <AddReviewModal setAlert={setAlert}  setShowReviewModal={setShowReviewModal} />}
        </>     
    )    
}

export default Navbar

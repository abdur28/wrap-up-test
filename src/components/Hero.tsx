'use client'

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
    const textVariants = {
        initial: {
            x: -500,
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.1,
            },
        },
        // scrollButton: {
        //     opacity: 0,
        //     y: 10,
        //     transition: {
        //         duration: 2,
        //         repeat: Infinity,
        //     },
        // },
    }

    return (
        <div className=" md:h-[calc(100vh-0px)] h-[50vh] w-screen overflow-hidden ">
            <div className="absolute top-0 left-0 w-full h-full z-[-1] ">
                <div className="absolute top-0 left-0 w-full h-full z-10 "></div>
                    <Image src="/bg-hero.png" alt="hero" layout="fill" objectFit="cover" />
                </div>
            <motion.div 
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="flex w-full h-full md:pt-10 pt-36 items-center flex-col ">
                <div className="flex justify-center items-center">
                    <motion.h1 variants={textVariants} className="text-black md:text-[150px] text-7xl font-bold font-Tangerine">Style Savant</motion.h1> 
                </div>
                <div className="md:w-[500px] w-[300px] text-center">
                    <motion.p variants={textVariants} className="text-black md:text-2xl  font-Satoshi italic">Breaking boundaries with timeless style and innovation.</motion.p>
                </div>
                {/* <div className="flex w-1/2 justify-center items-center">
                    <Image src="/woman.png" alt="hero" width={100} height={100} />
                </div> */}
            </motion.div>
        </div>
    );
};

export default Hero;



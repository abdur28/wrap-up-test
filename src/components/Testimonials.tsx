'use client';

import Image from "next/image";
import InfiniteCarousel from "./InfiniteCarousel";
import ServiceCard from "./ServiceCard";
import ReviewCard from "./ReviewCard";
import ReviewCarousel from "./ReviewCarousel";
import Marquee from "./magicui/marquee";
import { useEffect, useState } from "react";

const Testimonials = () => {
    const [smallSize, setSmallSize] = useState(false);

    const images = [
        "/image-1.jpg",
        "/image-2.jpg",
        "/image-3.jpg",
        "/image-4.jpg",
        
    ];

    useEffect(() => {
        const handleResize = () => {
            setSmallSize(window.innerWidth < 768);
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="pt-44">
            <div className="flex items-center flex-col">
                <div className="rounded-2xl border-2 w-24 h-8 text-sm border-gray-700 flex justify-center items-center">
                    Testimonials
                </div>
                <div className="md:text-4xl text-lg text-center font-Satoshi md:w-[500px] w-[350px] pt-20">
                    There&rsquo;s a reason people are&nbsp;
                    <span className="font-Tangerine md:text-6xl text-4xl">raving</span>&nbsp;about us.
                </div>
                <div className="relative flex md:h-[500px] w-[80%]  md:w-full my-24 flex-row items-center justify-center overflow-hidden">
                    <Marquee
                        pauseOnHover
                        vertical={!smallSize}
                        className="[--duration:30s] [--gap:1rem]"
                    >
                        {[...images, ...images].map((item, idx) => (
                            <ReviewCard key={idx} />
                        ))}
                    </Marquee>
                    <Marquee
                        pauseOnHover
                        vertical={true}
                        reverse={true}
                        className="[--duration:40s] [--gap:1rem] hidden md:flex"
                    >
                        {[...images, ...images].map((item, idx) => (
                            <ReviewCard key={idx} />
                        ))}
                    </Marquee>
                    <Marquee
                        pauseOnHover
                        vertical={true}
                        className="[--duration:35s] [--gap:1rem] hidden lg:flex"
                    >
                        {[...images, ...images].map((item, idx) => (
                            <ReviewCard key={idx} />
                        ))}
                    </Marquee>
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-secondary dark:from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-secondary dark:from-background"></div> */}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;

'use client'

import Image from "next/image";
import ServiceCard from "./ServiceCard"
import Marquee from "./magicui/marquee";
import { motion } from "framer-motion";

const Services = async ({ homeText, servicesAsString }: { homeText: string, servicesAsString: string }) => {
    const services = JSON.parse(servicesAsString);
    
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
    };

    return (
        <div className="md:h-[calc(220vh-0px)]  ">
            <motion.div className="flex  items-center flex-col "
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1, x: 0 , transition: { duration: 2 } }}
            viewport={{ once: true, margin: '-200px'}}
            >
                {/* <div className="rounded-2xl border-2 w-20 h-8 text-sm flex justify-center items-center">
                    Services
                </div> */}
                <div className="flex w-full h-full items-center justify-center">
                    <motion.div 
                    className="flex flex-row">
                            <Image
                                src="/mimi-logo.png"
                                alt="Styles by Mimi"
                                width={1000}
                                height={1000}
                                className="object-contain lg:w-[500px] md:w-[400px] w-[300px]"
                            />
                    </motion.div>
                </div>
                
                <motion.div variants={textVariants}  className="lg:text-lg md:text-md text-sm text-center lg:w-[500px] md:w-[400px] w-[300px] ">
                   {homeText}
                </motion.div>
               
                <div className="relative flex  w-[80%] my-48  flex-col items-center justify-center overflow-hidden  ">
                        <Marquee pauseOnHover className="[--duration:25s] [--gap:2rem] ">
                            {services.map((service: any, idx: number) => (
                                <ServiceCard key={idx} name={service.name} image={service.images[0]} shortDescription={service.shortDescription} price={service.price} id={service._id.toString()} />
                            ))}
                        </Marquee>
                        {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary dark:from-background"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary dark:from-background"></div> */}
                </div>
                
                
            </motion.div>
            
        </div>
        
    )
}

export default Services
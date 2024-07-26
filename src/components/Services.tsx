import Image from "next/image";
import InfiniteCarousel from "./InfiniteCarousel"
import ServiceCard from "./ServiceCard"
import Marquee from "./magicui/marquee";
import { getServices } from "@/lib/data";

const Services = async ({ homeText }: { homeText: string }) => {

    const services = await getServices();

    return (
        <div className="md:h-[calc(220vh-0px)]  ">
            <div className="flex  items-center flex-col ">
                {/* <div className="rounded-2xl border-2 w-20 h-8 text-sm flex justify-center items-center">
                    Services
                </div> */}
                <div className="flex w-full h-full items-center justify-center">
                    <div className="flex flex-row">
                            <Image
                                src="/mimi-logo.png"
                                alt="Styles by Mimi"
                                width={1000}
                                height={1000}
                                className="object-contain lg:w-[500px] md:w-[400px] w-[300px]"
                            />
                    </div>
                </div>
                
                <div className="lg:text-lg md:text-md text-sm text-center lg:w-[500px] md:w-[400px] w-[300px] ">
                   {homeText}
                </div>
               
                <div className="relative flex  w-[80%] my-48  flex-col items-center justify-center overflow-hidden  ">
                        <Marquee pauseOnHover className="[--duration:25s] [--gap:2rem] ">
                            {services.map((service, idx) => (
                                <ServiceCard key={idx} name={service.name} image={service.images[0]} shortDescription={service.shortDescription} price={service.price} id={service._id.toString()} />
                            ))}
                        </Marquee>
                        {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary dark:from-background"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary dark:from-background"></div> */}
                </div>
                
                
            </div>
            
        </div>
        
    )
}

export default Services
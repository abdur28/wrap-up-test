import Image from "next/image";
import HowItWorks from "@/components/HowItWorks";
import ServiceCard from "@/components/ServiceCard";
import Frame from "@/components/Frame";
import { getInformation, getServices } from "@/lib/data";


const Services = async () => {
    const services = await getServices();
    const info = await getInformation();
    const text = info?.servicesDescription
    const paragraphs = text?.split('\n');

    return(
        <div className="w-screen overflow-hidden">
            
            <div className=" h-[calc(50vh-0px)]  md:h-[calc(70vh-0px)] w-screen overflow-hidden ">
            <   div className="absolute top-0 left-0 w-full md:h-full h-[45vh] z-[-1] ">
                    <div className="absolute top-0 left-0 w-full h-full z-10 bg-transparent backdrop-blur-sm"></div>
                    <Image src="/bg-clothes.png" alt="hero" fill className="object-cover" />
                </div>
                <div className="flex w-full h-full items-center justify-center">
                    <div className="flex flex-col ">
                            <Image
                                src='/mimi-logo.png'
                                alt="Styles by Mimi"
                                width={1000}
                                height={1000}
                                className="object-contain lg:w-[500px] md:w-[400px] w-[300px]"
                            />
                            
                            {/* <p className="absolute right-[35%] md:right-[40%] lg:right-[50%] lg:top-[57%] text-3xl font-Great_Vibes">Styles by Mimi Mazamaza</p> */}
                    </div>
                </div>
            </div>
            {/* <div className="h-[calc(50vh-0px)] md:h-[calc(100vh-0px)] w-screen overflow-hidden ">
                <div className="flex h-full items-center justify-center">
                    <BlurredText text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sint at porro animi quos repellat molestias ea mollitia iusto, quia nulla reprehenderit omnis? Possimus officia quia praesentium, voluptate odit ad?' />
                </div>    
            </div> */}
            <Frame image={info?.servicesImage} introduction={info?.servicesIntroduction} paragraphs={paragraphs} />
            <HowItWorks/>
            <div className="overflow-hidden flex flex-col gap-20 md:px-20 md:pb-20 justify-center items-center">
                <div className="flex w-full justify-center items-center">
                    <div className="rounded-2xl border-2 w-20 h-8 text-sm flex justify-center items-center">
                        Services
                    </div>
                </div>
                <div className="flex flex-col sm:flex-col md:flex-row gap-20 md:flex-wrap justify-center">
                    {services?.map((service, index) => (
                        <ServiceCard name={service.name} image={service.images[0]} shortDescription={service.shortDescription} price={service.price} id={service._id.toString()} key={index} home={false}/>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Services;

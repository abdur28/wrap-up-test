import Image from "next/image";

const Hero = () => {
    return (
        <div className=" md:h-[calc(100vh-0px)] h-[50vh] w-screen overflow-hidden ">
            <div className="absolute top-0 left-0 w-full h-full z-[-1] ">
                <div className="absolute top-0 left-0 w-full h-full z-10 "></div>
                    <Image src="/bg-hero.png" alt="hero" layout="fill" objectFit="cover" />
                </div>
            <div className="flex w-full h-full md:pt-10 pt-36 items-center flex-col ">
                <div className="flex justify-center items-center">
                    <h1 className="text-black md:text-[150px] text-7xl font-bold font-Tangerine">Style Savant</h1> 
                </div>
                <div className="md:w-[500px] w-[300px] text-center">
                    <p className="text-black md:text-2xl  font-Satoshi italic">Breaking boundaries with timeless style and innovation.</p>
                </div>
                {/* <div className="flex w-1/2 justify-center items-center">
                    <Image src="/woman.png" alt="hero" width={100} height={100} />
                </div> */}
            </div>
        </div>
    );
};

export default Hero;



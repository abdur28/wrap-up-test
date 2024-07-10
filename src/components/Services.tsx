import Image from "next/image";
import InfiniteCarousel from "./InfiniteCarousel"
import ServiceCard from "./ServiceCard"

const Services = () => {
    const images = [
        "/image-1.jpg",
        "/image-2.jpg",
        "/image-3.jpg",
        "/image-4.jpg",
        "/image-5.jpg",
        "/image-6.jpg",
        "/image-7.jpg",
        "/image-8.jpg",
      ];

    return (
        <div className="md:h-[calc(220vh-0px)] h-[calc(270vh-0px)]">
            <div className="flex  items-center flex-col">
                <div className="rounded-2xl border-2 w-20 h-8 text-sm flex justify-center items-center">
                    Services
                </div>
                <div className="lg:text-4xl md:text-2xl text-lg pt-10 font-Satoshi">
                    Need a friend to help you &nbsp;
                    <span className="font-Tangerine md:text-5xl text-3xl lg:text-6xl">Style</span>
                    &nbsp; ?
                </div>
                <div className="lg:text-lg md:text-md text-sm text-center lg:w-[500px] md:w-[400px] w-[300px] pt-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam officia doloribus, deserunt tenetur id sit, 
                </div>
                <InfiniteCarousel >
                    {[...images, ...images].map((item, idx) => (
                    <ServiceCard image={`/background.jpg`} key={idx} />
                    ))}
                </InfiniteCarousel>
            </div>
            <div className="flex md:flex-row flex-col mt-20">
                <div className="flex flex-col md:w-1/2 px-16 pt-7">
                    <h1 className="md:text-4xl md:text-left text-2xl text-center font-Satoshi font-semibold">It's easy as 1,2,3!</h1>
                    <p className="md:text-md text-sm text-center md:text-left font-Satoshi mt-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum ad at alias iure nostrum molestiae, sed repellendus. Reprehenderit quae quaerat nisi necessitatib</p>
                    <div className="flex flex-col mt-10 gap-5">
                        <div className="flex flex-row gap-5">
                            <p className="font-Satoshi text-7xl">1.</p>
                            <p className="text-sm  font-Satoshi"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint voluptate reprehenderit mollitia esse fugit nemo error alias, natus ex voluptas obcaecati quis! Saepe ipsam maxime iste autem eius sunt quod! </p>
                        </div>
                        <div className="flex flex-row gap-5">
                            <p className="font-Satoshi text-7xl">2.</p>
                            <p className="text-sm font-Satoshi"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint voluptate reprehenderit mollitia esse fugit nemo error alias, natus ex voluptas obcaecati quis! Saepe ipsam maxime iste autem eius sunt quod! </p>
                        </div>
                        <div className="flex flex-row gap-5">
                            <p className="font-Satoshi text-7xl">3.</p>
                            <p className="text-sm font-Satoshi"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint voluptate reprehenderit mollitia esse fugit nemo error alias, natus ex voluptas obcaecati quis! Saepe ipsam maxime iste autem eius sunt quod! </p>
                        </div>
                    </div>
                   
                </div>
                <div className="flex md:w-1/2 md:px-10 md:pt-0 px-20 pt-24 justify-center items-center">
                    <Image src="/giphy.gif" alt="gif" width={500} height={500} />
                </div>
            </div>
        </div>
        
    )
}

export default Services
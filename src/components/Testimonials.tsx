import Image from "next/image";
import InfiniteCarousel from "./InfiniteCarousel"
import ServiceCard from "./ServiceCard"
import ReviewCard from "./ReviewCard";
import ReviewCarousel from "./ReviewCarousel";

const Testimonials = () => {

    const images = [
        "/image-1.jpg",
        "/image-2.jpg",
        "/image-3.jpg",
      ];

    return (
        <div className="h-[calc(140vh-0px)] ">
            <div className="flex  items-center flex-col">
                <div className="rounded-2xl border-2 w-24 h-8 text-sm flex justify-center items-center">
                    Testimonials
                </div>
                <div className="md:text-4xl text-lg text-center font-Satoshi md:w-[500px] w-[350px] pt-10">
                    There's a reason people are &nbsp;
                    <span className="font-Tangerine md:text-6xl text-4xl">ravivg</span>&nbsp; about us.
                </div>
                <ReviewCarousel >
                    {[...images, ...images].map((item, idx) => (
                    <ReviewCard key={idx}/>
                    ))}
                </ReviewCarousel>

                {/* <ReviewCard/> */}
            </div>
        </div>
        
    )
}

export default Testimonials
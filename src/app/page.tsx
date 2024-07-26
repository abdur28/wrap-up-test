import BlurredText from "@/components/BlurredText"
import Canvas from "@/components/Canvas"
import FeaturedProducts from "@/components/FeaturedProducts"
import Hero from "@/components/Hero"
import ProductList from "@/components/ProductList"
import Services from "@/components/Services"
import SingleFaq from "@/components/SIngleFaq"
import Testimonials from "@/components/Testimonials"
import { getApprovedReviews, getInformation } from "@/lib/data"
import Image from "next/image"

const HomePage = async () => {
  const info = await getInformation()
  const approvedReviews = await getApprovedReviews()
  const reviews = JSON.stringify(approvedReviews)

  return (
    <div className='w-screen overflow-hidden'>
      {/* <Canvas /> */}
      <Hero />
      <div className="md:h-[calc(100vh-0px)] h-[70vh] flex justify-center items-center flex-col">
        <BlurredText text={info.styleSavantHomeText} />
        {/* <button className="mt-10 rounded-2xl ring-1 ring-black text-black w-max py-2 px-4 text-lg hover:bg-primary hover:text-white">
            More
        </button> */}
      </div>  
      <Services homeText={info.servicesHomeText}/>
      <FeaturedProducts homeText={info.wrapUpHomeText}/>
            <div className="flex md:flex-row flex-col mt-20">
                <div className="flex flex-col md:w-1/2 px-16 pt-7">
                    <h1 className="md:text-4xl md:text-left text-2xl text-center font-Satoshi font-semibold">It&rsquo;s easy as 1,2,3!</h1>
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
                    <Image src="/giphy.gif" alt="gif" unoptimized width={500} height={500} />
                </div>
            </div>
      <Testimonials reviewsAsString={reviews}/>
      <div className=" mt-10 flex flex-col  items-center">
        <div className="rounded-2xl border-2 border-gray-700 w-20 h-8 text-sm flex justify-center items-center">
            FAQS
        </div>
        <div className="flex flex-col items-center gap-5 mt-10">
          {info.faqs.map((faq: any, idx: number) => (
            <SingleFaq key={idx} faqs={faq} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
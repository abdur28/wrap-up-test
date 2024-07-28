import ProductList from "./ProductList"
import ViewAllButton from "./ViewAllButton"

const FeaturedProducts = ({homeText}: {homeText: string}) => {

    return (    
        <div className="mt-24 mb-40 ">
            <div className=" flex h-[30vh] px-16 lg:h-[50vh] justify-center items-center">
                <h1 className="text-6xl lg:text-8xl font-semibold font-Great_Vibes lg:leading-[40px] leading-[25px] text-gray-700">
                    Wrap Up
                    <br />
                    <span className="font-normal font-Tangerine lg:text-4xl text-3xl">Experience style and innovation.</span>
                    {/* <br /> Selected Products */}
                </h1>
            </div>
            <div className="flex px-16  items-center flex-col">
                <p className="md:text-lg text-sm  pb-20 font-Satoshi text-center md:w-[700px] w-[350px]"> 
                    {homeText}
                </p>
            </div>
            
            <div className="md:px-16">
                <ProductList featured={true}/>
            </div>
           <div className="mt-20">
                <ViewAllButton location="wrapup"/>
           </div>
        </div>
    )
}

export default FeaturedProducts
import ProductList from "./ProductList"

const FeaturedProducts = () => {

    return (    
        <div className="mt-24 mb-40 px-16">
            <div className="flex items-center flex-col">
                <div className="rounded-2xl border-2 w-36 h-8 text-sm flex justify-center items-center">
                    Featured Products
                </div>
                <p className="md:text-lg text-sm pt-10 pb-5 font-Satoshi text-center md:w-[700px] w-[350px]"> 
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere eum corporis vitae expedita nobis voluptatibus rem, dolorem at excepturi
                </p>
            </div>
            
            <ProductList/>
        </div>
    )
}

export default FeaturedProducts

import Image from "next/image";
import Link from "next/link";


const PRODUCT_PER_PAGE = 8;

const ProductList = async () => {


  const items = [
    {
      name: "Product 1",
      price: "40",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFnfGVufDB8fDB8fHww",
      slug: "product-1",
      description: "This is the first product",
    },
    {
      name: "Product 2",
      price: "50",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      slug: "product-2",
      description: "This is the second product",
    },
    {
      name: "Product 3",
      price: "60",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcnR8ZW58MHx8MHx8fDA%3D",
      slug: "product-3",
      description: "This is the third product",
    }, 
    {
      name: "Product 4",
      price: "70",
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFzZXxlbnwwfHwwfHx8MA%3D%3D",
      slug: "product-4",
      description: "This is the fourth product",
    }
  ]

  

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {items.map((product) => (
        <Link
          href={"/products/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product.slug}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.image || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            
              <Image
                src="/product.png"
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price}</span>
          </div>
         
            <div
              className="text-sm text-gray-500"
              // dangerouslySetInnerHTML={{
              //   __html: DOMPurify.sanitize(
              //     product.additionalInfoSections.find(
              //       (section: any) => section.title === "shortDesc"
              //     )?.description || ""
              //   ),
              // }}
            >
              {product.description}
            </div>
          
          <button className="rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      
    </div>
  );
};

export default ProductList;

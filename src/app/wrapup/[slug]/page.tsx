
// import Reviews from "@/components/Reviews";
// import { wixClientServer } from "@/lib/wixClientServer";
import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  // const wixClient = await wixClientServer();

  // const products = await wixClient.products
  //   .queryProducts()
  //   .eq("slug", params.slug)
  //   .find();

  // if (!products.items[0]) {
  //   return notFound();
  // }

  // const product = products.items[0];

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

  const product = items.find((item) => item.slug === params.slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages 
        // items={product.media?.items} 
        />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product?.name}</h1>
        <p className="text-gray-500">{product?.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {/* {product.price?.price === product.price?.discountedPrice ? ( */}
          <h2 className="font-medium text-2xl">${product?.price}</h2>
        {/* ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.price?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )} */}
        <div className="h-[2px] bg-gray-100" />
        {/* {product.variants && product.productOptions ? ( */}
          <CustomizeProducts
            // productId={product._id!}
            // variants={product.variants}
            // productOptions={product.productOptions}
          />
        {/* ) : ( */}
          {/* <Add
            // productId={product._id!}
            // variantId="00000000-0000-0000-0000-000000000000"
            // stockNumber={product.stock?.quantity || 0}
          /> */}
        {/* )} */}
        {/* <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))}
        <div className="h-[2px] bg-gray-100" /> */}
        {/* REVIEWS */}
        {/* <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense> */}
      </div>
    </div>
  );
};

export default SinglePage;

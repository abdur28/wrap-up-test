
// import Reviews from "@/components/Reviews";
// import { wixClientServer } from "@/lib/wixClientServer";
import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SinglePage = async ({ params }: { params: { slug: string } }) => {

  const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio laborum nemo eaque, sit enim libero voluptatum dicta ipsam obcaecati id possimus modi praesentium, vel blanditiis cumque perspiciatis accusamus. Quasi, temporibus! \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ducimus laborum eaque eveniet quisquam itaque magnam, animi, obcaecati culpa facilis reprehenderit, atque voluptas doloremque distinctio ut corrupti recusandae accusantium maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, culpa porro sint possimus earum praesentium enim suscipit dignissimos, fugit debitis rerum eaque eius, nam accusantium quaerat neque nulla modi autem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, beatae eum! Saepe amet, dolor voluptatem commodi autem, dolore animi nemo fuga ratione laudantium consectetur deserunt provident repellendus corporis asperiores nulla! \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, totam beatae praesentium, et reprehenderit itaque recusandae quidem tempora culpa, eum non dicta. Nostrum ipsum similique natus temporibus, quisquam sit? Ipsam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos libero numquam odit dicta optio tenetur architecto nulla veritatis hic, magnam quam quidem nihil. Vitae quaerat cum exercitationem id saepe ipsum."

  const id = params.slug;
  const product = await getProductById(id);


  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages 
          editable={false}
          type=""
          id=''
          images={product?.images}
        />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product?.name}</h1>
        <p className="text-gray-500">{product?.description}</p>
        
        <div className="h-[2px] bg-gray-100" />
          <CustomizeProducts productName={product?.name} productId={id} items={product?.products} colors={product?.colors} sizes={product?.sizes} productImage={product?.images[0]}/>

        <div className="h-[2px] bg-gray-100" />
        <h1 className="text-xl font-medium">Additional Information</h1>
        {(product?.additionalInfo  || text ).split('\n').map((section: any) => (
          <div className="text-sm" key={section}>
            <h4 className="font-medium ">{section}</h4>
          </div>
        ))}
       
      </div>
    </div>
  );
};

export default SinglePage;

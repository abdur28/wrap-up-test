import EditProduct from "@/components/EditProduct";
import ProductImages from "@/components/ProductImages";
import { getProductById, isAdmin } from "@/lib/data";
import { notFound } from "next/navigation";

const UpdateProduct = async ({ params }: { params: { slug: string } }) => {

  const id = params.slug;
  const product = await getProductById(id);
  const adminPresent = await isAdmin()

    if (!adminPresent) {
        return <div>{notFound()}</div>
    }


  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages 
          type="products"
          id={id}
          editable={true}
          images={product?.images}
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product?.name}</h1>
        <p className="text-gray-500">{product?.shortDescription}</p>
        
        <div className="h-[2px] bg-gray-100" />
        <EditProduct type="products" servicePrice={0} shortDescription={''} productId={id} items={product?.products} colors={product?.colors} sizes={product?.sizes} description={product?.description}/>
      </div>
    </div>
  );
};

export default UpdateProduct;

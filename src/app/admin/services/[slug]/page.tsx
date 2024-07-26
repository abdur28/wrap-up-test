import EditProduct from "@/components/EditProduct";
import ProductImages from "@/components/ProductImages";
import { getProductById, getServiceById, isAdmin } from "@/lib/data";
import { notFound } from "next/navigation";

const UpdateService = async ({ params }: { params: { slug: string } }) => {

  const id = params.slug;
  const service = await getServiceById(id);
  const adminPresent = await isAdmin()

  if (!adminPresent) {
      return <div>{notFound()}</div>
  }


  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages 
          type="services"
          id={id}
          editable={true}
          images={service?.images}
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{service?.name}</h1>
        
        <EditProduct type="services" productId={id} servicePrice={service?.price} shortDescription={service?.shortDescription} items={[]} colors={[]} sizes={[]} description={service?.description}/>
      </div>
    </div>
  );
};

export default UpdateService;

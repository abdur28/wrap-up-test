import ProductImages from '@/components/ProductImages';
import { notFound } from 'next/navigation';
import Add from '@/components/Add';
import { getServiceById } from '@/lib/data';

const SingleService = async ({ params }: { params: { slug: string } }) => {
    const parameter = params.slug

    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio laborum nemo eaque, sit enim libero voluptatum dicta ipsam obcaecati id possimus modi praesentium, vel blanditiis cumque perspiciatis accusamus. Quasi, temporibus! \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ducimus laborum eaque eveniet quisquam itaque magnam, animi, obcaecati culpa facilis reprehenderit, atque voluptas doloremque distinctio ut corrupti recusandae accusantium maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, culpa porro sint possimus earum praesentium enim suscipit dignissimos, fugit debitis rerum eaque eius, nam accusantium quaerat neque nulla modi autem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, beatae eum! Saepe amet, dolor voluptatem commodi autem, dolore animi nemo fuga ratione laudantium consectetur deserunt provident repellendus corporis asperiores nulla! \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, totam beatae praesentium, et reprehenderit itaque recusandae quidem tempora culpa, eum non dicta. Nostrum ipsum similique natus temporibus, quisquam sit? Ipsam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos libero numquam odit dicta optio tenetur architecto nulla veritatis hic, magnam quam quidem nihil. Vitae quaerat cum exercitationem id saepe ipsum."

    const service = await getServiceById(parameter);

    if (!service) {
        notFound();
    }


    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
            {/* IMG */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductImages type="services" id={service._id.toString()} editable={false} images={service?.images}/>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-10">
                <h1 className="text-4xl font-medium">{service?.name}</h1>
                <p className="text-black">{service?.description}</p>
                <div className="h-[2px] bg-gray-100" />
                <div className="flex items-center justify-between">
                    <h2 className="font-medium text-2xl">₦ {service?.price}</h2>
                    <Add itemId={service._id.toString()} price={service.price} productName={service.name} productImage={service.images[0]} quantity={1} size={''} color={''} productId={''}  />
                </div>     
                <div className="h-[2px] bg-gray-100" />
                <h1 className="text-xl font-medium">Additional Information</h1>
                {(service?.additionalInfo  || text ).split('\n').map((section: any) => (
                <div className="text-sm" key={section}>
                    <h4 className="font-medium ">{section}</h4>
                </div>
                ))}      
                
            </div>
        </div>
    )
}

export default SingleService;
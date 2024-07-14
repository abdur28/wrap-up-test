import ProductImages from '@/components/ProductImages';
import { notFound } from 'next/navigation';
import Add from '@/components/Add';

const SingleService = ({ params }: { params: { slug: string } }) => {
    const parameter = params.slug

    const services = [
        {   
            id: 1,
            name: "Body Shape Consultation",
            description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Facere culpa minus nemo! Sed quisquam fuga amet repellendus ea deleniti atque consequatur dolorem dignissimos expedita!",
            image: "https://images.pexels.com/photos/322548/pexels-photo-322548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 2,
            name: "Color Consultation",
            description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Facere culpa minus nemo! Sed quisquam fuga amet repellendus ea deleniti atque consequatur dolorem dignissimos expedita!",
            image: "https://images.pexels.com/photos/322548/pexels-photo-322548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 3,
            name: "Wardrobe Analysis",
            description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Facere culpa minus nemo! Sed quisquam fuga amet repellendus ea deleniti atque consequatur dolorem dignissimos expedita!",
            image: "https://images.pexels.com/photos/322548/pexels-photo-322548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 4,
            name: "Public Figure Consultation",
            description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Facere culpa minus nemo! Sed quisquam fuga amet repellendus ea deleniti atque consequatur dolorem dignissimos expedita!",
            image: "https://images.pexels.com/photos/322548/pexels-photo-322548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 5,
            name: "Photoshoot",
            description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Facere culpa minus nemo! Sed quisquam fuga amet repellendus ea deleniti atque consequatur dolorem dignissimos expedita!",
            image: "https://images.pexels.com/photos/322548/pexels-photo-322548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ]

    const service = services.find((service) => service.id === Number(parameter));

    if (!service) {
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

            <div className="w-full lg:w-1/2 flex flex-col gap-10">
                <h1 className="text-4xl font-medium">{service?.name}</h1>
                <p className="text-black">{service?.description}</p>
                <div className="flex justify-center items-center ">
                    <button className=" rounded-2xl ring-1 ring-black text-black w-1/2 lg:w-full text-lg py-1 px-5 bg-white  hover:bg-black hover:text-white hover:ring-transparent">
                        Book
                    </button>
                </div>           
                
            </div>
        </div>
    )
}

export default SingleService;
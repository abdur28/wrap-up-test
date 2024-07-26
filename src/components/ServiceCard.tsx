'use client'

import Image from "next/image";
import "./serviceCard.scss";
import { useRouter } from "next/navigation";

interface CardProps {
  name: string;
  image: string;
  shortDescription: string;
  price: number;
  id: string;
}

const ServiceCard: React.FC<CardProps> = ({ name, image, shortDescription, price, id }) => {
  const router = useRouter();
  return (
    <div className="card  flex flex-col bg-secondary"
    onClick={() => router.push(`/services/${id}`)}>
        <div className="flex h-1/2">
          <Image
            src={image || "/image-placeholder.png"}
            alt={name}
            width={1000}
            height={1000}
            className="img"
          />
   
        </div>

      <div className="service-text flex flex-col justify-between p-6">
          <p className="h3"> {name} </p>
          <p className="p">{shortDescription.slice(0, 250)} ...</p>
        <div className="flex justify-between items-end ">
          <p className="h3">₦ {price}</p>
          <button className=" rounded-2xl ring-1 ring-black text-black w-max py-1 px-3  hover:bg-primary hover:text-white hover:ring-transparent"
          onClick={() => router.push(`/services/${id}`)}
          >
              Book
          </button>
        </div>
        
      </div>
    </div>
  );
}
  

export default ServiceCard;
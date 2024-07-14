'use client'

import Image from "next/image";
import "./serviceCard.scss";
import { useRouter } from "next/navigation";

interface CardProps {
  service: {
    name: string;
    description: string;
    image: string;
  }
}

const ServiceCard: React.FC<CardProps> = ({ service }) => {
  const router = useRouter();
  return (
    <div className="card flex flex-col bg-secondary"
    onClick={() => router.push(`/wrapup/${service?.name}`)}>
        <div className="flex h-1/2">
          <Image
            src='/background.jpg'
            alt={service?.name}
            width={1000}
            height={1000}
            className="img"
          />
   
        </div>

      <div className="text flex flex-col justify-between p-6">
          <p className="h3"> {service?.name} </p>
          <p className="p">{service?.description}</p>
        <div className="flex justify-end items-end ">
        <button className=" rounded-2xl ring-1 ring-black text-black w-max py-1 px-3  hover:bg-primary hover:text-white hover:ring-transparent">
            Book
        </button>
        </div>
        
      </div>
    </div>
  );
}
  

export default ServiceCard;
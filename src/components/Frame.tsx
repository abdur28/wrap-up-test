import Image from "next/image";
import { Suspense } from "react";

interface FrameProps {
  image: string;
}

const Frame = ({ image }: FrameProps) => {

  return (
    <div
      className={`bg-secondary p-5 pb-5 m-6 md:m-12 shadow-lg border border-gray-100 transition duration-500 relative`}
    >
      <Suspense fallback='Loading...'>
          <Image
            unoptimized
            src={image}
            alt=""
            quality={100}
            width={500}
            height={500}
            className="smooth-edges w-full aspect-square object-cover h-auto"
          />
      </Suspense>
    </div>
  );
};

export default Frame;


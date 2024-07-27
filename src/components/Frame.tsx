'use client'

import Image from "next/image";
import { Suspense } from "react";
import { motion } from "framer-motion";

interface FrameProps {
  image: string;
  introduction: string;
  paragraphs: any[];
}

const Frame = ({ image, introduction, paragraphs }: FrameProps) => {
  const itemVariants = {
    end: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      },
    },
    intialFrame: {
      x: -200,
      opacity: 0,
      scale: 0
    },
    intialText: {
      x: 200,
      opacity: 0,
      scale: 0
    },
  };

  return (
    <div className="flex flex-col md:flex-row pt-40">
        <div className="md:w-1/2 w-full justify-center items-center lg:p-20 md:p-12 p-10">
        <motion.div
          variants={itemVariants}
          initial={"intialFrame"}
          whileInView={"end"}
          viewport={{ once: true }}
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
        </motion.div>
        </div>
        <motion.div
        variants={itemVariants}
        initial={"intialText"}
        whileInView={"end"}
        viewport={{ once: true }}
        className="font-normal text-center text-base md:text-start md:px-0 px-12 md:pr-20  md:w-1/2 w-full my-auto ">
            <div className="block md:hidden">
                <p className="text-3xl font-Satoshi font-bold mb-6">{introduction}<span className="animate-wave">👋</span></p>
            </div>
            <p className="hidden md:block text-3xl font-Satoshi  mb-6">{introduction}
                <span className="animate-wave">👋</span>
            </p>

            {paragraphs?.map((paragraph: string, index: number) => ( 
                <p key={index} className="mb-4">
                {paragraph}
                </p>
            ))}
        </motion.div>
    </div>
  );
};

export default Frame;


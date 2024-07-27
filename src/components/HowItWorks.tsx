'use client'

import Lottie from 'lottie-react';
import selectAnimation from '../../public/select-animation.json';
import fillForm from '../../public/fill-form.json';
import dialogue from '../../public/dialogue.json';
import confirm from '../../public/confirm.json';
import { motion } from 'framer-motion';

const HowItWorks = () => {
    const options = [
        {
            id: 1,
            name: 'Select your service of choice',
            animation: selectAnimation
        },
        {
            id: 2,
            name: 'Fill your preferences',
            animation: fillForm
        },
        {
            id: 3,
            name: 'Consult an expert',
            animation: dialogue
        },
        {
            id: 4,
            name: 'Get personalized services',
            animation: confirm
        }
    ]

    const itemVariants = {
        end: {
          y: 0,
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5
          },
        },
        intial: {
          y: 50,
          opacity: 0,
          scale: 0
        },
      };

    return (
        <div className="my-40 w-screen overflow-hidden ">
                <div className="flex h-full flex-col gap-24 items-center justify-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-Satoshi">How it works ?</h1>
                    </div>
                    <motion.div 
                    className='flex flex-col lg:justify-start lg:items-start lg:flex-row gap-24 lg:gap-24'>
                        {options.map((option) => (
                            <motion.div 
                            variants={itemVariants}
                            initial={"intial"}
                            whileInView={"end"}
                            viewport={{ once: true }}
                            className='flex justify-center items-center flex-col gap-5 ' key={option.id}>
                                {/* <p className='text-lg flex justify-center items-center lg:text-3xl font-Satoshi'>{option.id}.</p> */}
                                <div className='w-[120px] lg:w-[170px] lg:h-[170px] flex '>  
                                    <Lottie 
                                        animationData={option.animation} 
                                        autoPlay={true}
                                        width={100}
                                        height={100}
                                        loop={true} />
                                </div>
                                <p className='text-md font-Satoshi text-center flex text-lg w-[200px] lg:text-2xl lg:w-[200px] justify-center items-center'>
                                    {option.name}
                                </p>    
                            </motion.div>
                        ))}
                    </motion.div>
                    
                </div>    
            </div>
    )
}

export default HowItWorks;
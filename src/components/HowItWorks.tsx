'use client'

import Lottie from 'lottie-react';
import selectAnimation from '../../public/select-animation.json';
import fillForm from '../../public/fill-form.json';
import dialogue from '../../public/dialogue.json';
import confirm from '../../public/confirm.json';

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

    return (
        <div className="h-[90vh] md:h-[110vh] w-screen overflow-hidden ">
                <div className="flex h-full flex-col gap-10 items-center justify-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-Satoshi">How it works ?</h1>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-10 lg:gap-24'>
                        {options.map((option) => (
                            <div className='flex flex-row lg:flex-col gap-5 ' key={option.id}>
                                <p className='text-lg flex justify-center items-center lg:text-3xl font-Satoshi'>{option.id}.</p>
                                <div className='w-[60px] lg:w-[100px] flex lg:ml-10'>  
                                    <Lottie 
                                        animationData={option.animation} 
                                        autoPlay={true}
                                        width={100}
                                        height={100}
                                        loop={true} />
                                </div>
                                <p className='text-md font-Satoshi flex lg:text-lg justify-center items-center'>
                                    {option.name}
                                </p>    
                            </div>
                        ))}
                    </div>
                    
                </div>    
            </div>
    )
}

export default HowItWorks;
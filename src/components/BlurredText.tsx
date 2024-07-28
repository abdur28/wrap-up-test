'use client'

import { motion } from 'framer-motion';

const BlurredText = ({ text }: { text: string }) => {
    

    return (
        <>
            <motion.div       
                initial={{ filter: 'blur(6px)' }}
                transition={{ duration: 0.2 }}
                whileInView={{ filter: 'blur(0px)' }}
                className="hidden md:flex blurred-text lg:text-3xl md:text-2xl text-xl text-center lg:px-44 md:px-32 px-12"
                viewport={{once: true, margin: '-300px'}}
            >
                {text}
            </motion.div>
            <motion.div       
                initial={{ filter: 'blur(6px)' }}
                transition={{ duration: 0.1 }}
                whileInView={{ filter: 'blur(0px)' }}
                viewport={{once: true, margin: '-200px'}}
                className="md:hidden blurred-text lg:text-3xl md:text-2xl text-xl text-center lg:px-44 md:px-32 px-12"
            >
                {text}
            </motion.div>
        </>
    );
};

export default BlurredText;

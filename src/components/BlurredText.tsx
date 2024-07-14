'use client'

import { motion, useAnimation, inView } from 'framer-motion';

const BlurredText = ({ text }: { text: string }) => {
    

    return (
            <motion.div       
                initial={{ filter: 'blur(6px)' }}
                transition={{ duration: 0.2 }}
                whileInView={{ filter: 'blur(0px)' }}
                className="blurred-text lg:text-3xl md:text-2xl text-xl text-center lg:px-44 md:px-32 px-12"
                viewport={{once: true, margin: '-300px'}}
            >
                {text}
            </motion.div>

    );
};

export default BlurredText;

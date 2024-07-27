'use client'

import { useState } from "react";
import ExpandButton from "./ExpandButton";
import { motion } from "framer-motion";

const SingleFaq = ({ faqs }: { faqs: { question: string, answer: string } }) => {
  const [open, setOpen] = useState(false);
  const variants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="flex flex-col p-3 md:w-[650px] w-[80vw] border-gray-700 rounded-lg border-2"
      onClick={() => setOpen(!open)}
      animate={open ? "open" : "closed"}
      initial="closed"
    >
      <div className="flex flex-row justify-between">
        <div className="md:text-lg font-Satoshi font-semibold">
          {faqs.question}
        </div>
        <div>
          <ExpandButton setOpen={setOpen} />
        </div>
      </div>
      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={variants}
        className="overflow-hidden"
      >
        <div className="text-sm mt-3 font-Satoshi">
          {faqs.answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SingleFaq;

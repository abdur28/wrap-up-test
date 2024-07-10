'use client'

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

const InfiniteCarousel = ({ children }: { children: React.ReactNode }) => {
  const FAST_DURATION = 40;
  const SLOW_DURATION = 125;

  const [duration, setDuration] = useState(FAST_DURATION);
  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 1 - 8;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [rerender, xTranslation, duration, width]);

  return (
    <div className="relative mt-16 w-[calc(80vw)]  overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-secondary to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary to-transparent pointer-events-none z-10" />
      <div className="flex justify-center">
        <motion.div
          className="flex gap-5 w-[calc(100vw+8rem)]" // Adjust the width calculation as needed
          style={{ x: xTranslation }}
          ref={ref}
          onHoverStart={() => {
            setMustFinish(true);
            setDuration(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish(true);
            setDuration(FAST_DURATION);
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default InfiniteCarousel;

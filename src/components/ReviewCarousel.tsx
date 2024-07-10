'use client'

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

const ReviewCarousel = ({ children }: { children: React.ReactNode }) => {
  const FAST_DURATION = 10;
  const SLOW_DURATION = 125;

  const [duration1, setDuration1] = useState(FAST_DURATION);
  const [duration2, setDuration2] = useState(FAST_DURATION);
  const [duration3, setDuration3] = useState(FAST_DURATION);

  let [ref1, { height: height1 }] = useMeasure();
  let [ref2, { height: height2 }] = useMeasure();
  let [ref3, { height: height3 }] = useMeasure();

  const yTranslation1 = useMotionValue(0);
  const yTranslation2 = useMotionValue(50);  // Start with +50px
  const yTranslation3 = useMotionValue(20);  // Start with +20px

  const [mustFinish1, setMustFinish1] = useState(false);
  const [mustFinish2, setMustFinish2] = useState(false);
  const [mustFinish3, setMustFinish3] = useState(false);

  const [rerender1, setRerender1] = useState(false);
  const [rerender2, setRerender2] = useState(false);
  const [rerender3, setRerender3] = useState(false);

  const animateCarousel1 = () => {
    let controls;
    let finalPosition = -height1 / 1 - 8;

    if (mustFinish1) {
      controls = animate(yTranslation1, [yTranslation1.get(), finalPosition], {
        ease: "linear",
        duration: duration1 * (1 - yTranslation1.get() / finalPosition),
        onComplete: () => {
          setMustFinish1(false);
          setRerender1(prev => !prev);
        },
      });
    } else {
      controls = animate(yTranslation1, [0, finalPosition], {
        ease: "linear",
        duration: duration1,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  };

  const animateCarousel2 = () => {
    let controls;
    let finalPosition = -height2 / 1 - 8;

    if (mustFinish2) {
      controls = animate(yTranslation2, [yTranslation2.get(), finalPosition], {
        ease: "linear",
        duration: duration2 * (1 - yTranslation2.get() / finalPosition),
        onComplete: () => {
          setMustFinish2(false);
          setRerender2(prev => !prev);
        },
      });
    } else {
      controls = animate(yTranslation2, [50, finalPosition], {
        ease: "linear",
        duration: duration2,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  };

  const animateCarousel3 = () => {
    let controls;
    let finalPosition = -height3 / 1 - 8;

    if (mustFinish3) {
      controls = animate(yTranslation3, [yTranslation3.get(), finalPosition], {
        ease: "linear",
        duration: duration3 * (1 - yTranslation3.get() / finalPosition),
        onComplete: () => {
          setMustFinish3(false);
          setRerender3(prev => !prev);
        },
      });
    } else {
      controls = animate(yTranslation3, [20, finalPosition], {
        ease: "linear",
        duration: duration3,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  };

  useEffect(() => {
    const stop1 = animateCarousel1();
    return stop1;
  }, [rerender1, duration1, mustFinish1, height1]);

  useEffect(() => {
    const stop2 = animateCarousel2();
    return stop2;
  }, [rerender2, duration2, mustFinish2, height2]);

  useEffect(() => {
    const stop3 = animateCarousel3();
    return stop3;
  }, [rerender3, duration3, mustFinish3, height3]);

  return (
    <div className="relative mt-16 h-[calc(80vh)] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-secondary to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-secondary to-transparent pointer-events-none z-10" />
      <div className="flex justify-center gap-5">
        <motion.div
          className="flex flex-col gap-5 h-[calc(100vh+8rem)]" // Adjust the height calculation as needed
          style={{ y: yTranslation1 }}
          ref={ref1}
          onHoverStart={() => {
            setMustFinish1(true);
            setDuration1(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish1(true);
            setDuration1(FAST_DURATION);
          }}
        >
          {children}
        </motion.div>
        <motion.div
          className="md:flex flex-col hidden gap-5 h-[calc(100vh+8rem)]" // Adjust the height calculation as needed
          style={{ y: yTranslation2 }}
          ref={ref2}
          onHoverStart={() => {
            setMustFinish2(true);
            setDuration2(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish2(true);
            setDuration2(FAST_DURATION);
          }}
        >
          {children}
        </motion.div>
        <motion.div
          className="lg:flex flex-col hidden gap-5 h-[calc(100vh+8rem)]" // Adjust the height calculation as needed
          style={{ y: yTranslation3 }}
          ref={ref3}
          onHoverStart={() => {
            setMustFinish3(true);
            setDuration3(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish3(true);
            setDuration3(FAST_DURATION);
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default ReviewCarousel;

"use client";
import { useScroll, useTransform, motion, useInView } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans px-4 sm:px-6 md:px-8 lg:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative container mx-auto space-y-10">
        {data.map((item, index) => {
          const itemRef = useRef<HTMLDivElement>(null);
          const isInView = useInView(itemRef, { once: true, margin: "-100px" });
          return (
            <motion.div
              key={index}
              ref={itemRef}
              className="grid grid-cols-5"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="col-span-1 sticky flex flex-col md:flex-row z-40 items-center top-36 sm:top-38 md:top-42 self-start max-w-xs lg:max-w-md xl:max-w-lg md:w-full">
                <motion.div
                  className="h-8 sm:h-10 md:h-12 absolute left-2 sm:left-3 md:left-4 w-8 sm:w-10 md:w-12 rounded-full md:bg-white flex items-center justify-center md:shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <motion.div
                    className="hidden md:block h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 rounded-full bg-vina-primary border border-neutral-300"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                  />
                  <motion.h3
                    className="md:hidden block ml-2 text-xl sm:text-2xl mb-3 sm:mb-4 md:mb-6 text-left font-bold text-vina-primary leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    {item.title}
                  </motion.h3>
                </motion.div>
                <motion.h3
                  className="hidden md:block text-2xl lg:text-3xl xl:text-4xl md:pl-16 lg:pl-20 xl:pl-24 font-bold text-vina-primary  leading-tight"
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  {item.title}
                </motion.h3>
              </div>

              <div className="col-span-4 relative w-full">
                <motion.div
                  className="text-sm sm:text-base md:text-lg  text-neutral-700 dark:text-neutral-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.7, delay: index * 0.1 + 0.5 }}
                >
                  {item.content}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-6 sm:left-7 md:left-8 lg:left-10 top-0 overflow-hidden w-[1.5px] sm:w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[50%] via-neutral-200  to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[1.5px] sm:w-[2px] bg-gradient-to-t from-purple-500 via-vina-primary to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

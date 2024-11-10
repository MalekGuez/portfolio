"use client";
import { useEffect, useState } from "react";
import { useMenuContext } from "@/app/context/MenuContext";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./style.module.css";
import LoadingBar from "./bar";

export default function Loading() {
  const { isLoading, setIsLoading, loadCount, setLoadCount } = useMenuContext();

  useEffect(() => {
    if (isLoading && loadCount === 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleLoadComplete = () => {
    loadCount === 0 && setLoadCount(1);
    console.log(loadCount)
  };

  return (
    <AnimatePresence mode="sync">
      {(isLoading && loadCount === 0) ? (
        <motion.div
          className={styles.loading}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.8, duration: 0.2 } }}
          onAnimationComplete={handleLoadComplete}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490.81 286.03"
            width="58"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { delay: 0.4, duration: 0.4 },
            }}
          >
            <motion.path
              initial={{
                strokeDasharray: 1400,
                strokeDashoffset: 1400,
                opacity: 0,
                fill: "white",
                fillOpacity: 0,
                strokeWidth: 10,
              }}
              animate={{
                strokeDashoffset: [1400, 0],
                opacity: 1,
                fillOpacity: 1,
                strokeWidth: 0,
                transition: {
                  duration: 1.2,
                  ease: "easeInOut",
                  fillOpacity: { delay: 1, duration: 0.8, ease: "easeInOut" },
                  strokeWidth: {
                    delay: 1.15,
                    duration: 0.9,
                    ease: "easeInOut",
                  },
                },
              }}
              style={{ stroke: "#fff", strokeMiterlimit: 10 }}
              d="M485.81,201.5c0,27.16-.65,53.02-1.3,78.22-11.14.99-22.92,1.31-35.35,1.31s-24.87-.32-36.33-1.31l-5.24-49.09c-2.62,10.79-22.9,49.09-57.92,49.09-22.16,0-44.31-12.98-61.77-34.41V42.84c21.17-23.37,51.9-37.7,91.55-37.7,30.76,0,55.96,8.51,75.6,22.9,14.41,10.8,23.56,22.92,28.8,31.42-8.83,9.16-18.65,18.65-29.78,28.47-12.77,11.45-25.54,20.94-36.99,29.45-4.25-22.9-19.31-34.03-37.64-34.03-32.07,0-49.09,26.51-49.09,58.9s30.1,59.24,62.17,59.24c5.24,0,10.15-.99,15.06-2.94v-39.61h-25.85v-33.06c16.35-.65,33.71-1.3,51.71-1.3s34.69.65,51.06,1.3c.65,24.55,1.3,49.75,1.3,75.61Z"
            />
            <motion.path
              initial={{
                strokeDasharray: 1640,
                strokeDashoffset: 1640,
                opacity: 0,
                fill: "white",
                fillOpacity: 0,
                strokeWidth: 10,
              }}
              animate={{
                fillOpacity: 1,
                strokeDashoffset: [1640, 0],
                opacity: 1,
                strokeWidth: 0,
                transition: {
                  duration: 1.2,
                  ease: "easeInOut",
                  fillOpacity: { delay: 1, duration: 0.8, ease: "easeInOut" },
                  strokeWidth: {
                    delay: 1.15,
                    duration: 0.9,
                    ease: "easeInOut",
                  },
                },
              }}
              style={{ stroke: "#fff", strokeMiterlimit: 10 }}
              d="M256.02,137.54c0,47.45-.33,93.93-1.31,139.42-9.82.65-20.29,1.31-31.75,1.31h-7.2c-13.42,0-26.18-.33-37.96-1.31-.98-38.95-1.96-78.55-1.96-119.13v-18.65c0-17.02,0-26.84.33-43.53l-45.49,91.63-45.49-90.65c0,16.04.33,24.55.33,40.91,0,47.45-.65,93.93-1.64,139.42-9.82.65-20.29,1.31-31.42,1.31h-7.2c-13.75,0-26.51-.33-38.29-1.31-1.31-44.84-1.96-90.65-1.96-137.78S5.65,49.84,6.96,6.96c11.13-1.31,23.56-1.96,37.31-1.96h1.96c13.42,0,25.85.65,36.98,1.96l.65,1.64,46.8,101.13L177.8,7.62l.33-.65c10.8-1.31,23.24-1.96,36.65-1.96h5.89c12.44,0,23.89.98,34.04,1.96.98,42.87,1.31,86.4,1.31,130.58Z"
            />
          </motion.svg>
          <motion.span
            className={styles.text}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 1, duration: 0.8, ease: "easeInOut" },
            }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            Portfolio
          </motion.span>
        </motion.div>
      ) : loadCount === 1 && (
        <LoadingBar isLoading={isLoading} />
      )}
    </AnimatePresence>
  );
}

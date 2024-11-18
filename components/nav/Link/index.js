import React from "react";
import { useMenuContext } from "@/app/context/MenuContext";
import { motion } from "framer-motion";
import Link from "next/link";

import styles from "./style.module.css";

export default function index({ data, lang }) {
  const { isLoading, setIsLoading, setIsActive, delayLoadingBar } = useMenuContext();

  const nbLink = 4;

  const slide = {
    initial: {
      y: "25px",
      skewY: "10deg",
      opacity: 0,
    },
    enter: (i) => ({
      y: "0px",
      skewY: "0deg",
      opacity: isLoading ? 0 : 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: isLoading ? 0.05 : 0.05 * i,
        skewY: {
          delay: 0.45,
          duration: 0.5,
        },
        opacity: {
          duration: 0.4,
          delay: isLoading ? 0.15 : 0.15 * i,
        },
      },
    }),
    exit: (i) => ({
      y: "-25px",
      skewY: "-10deg",
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.24, 0, 0.24, 1],
        delay: delayLoadingBar && 0.05 * (nbLink - i - 1),
        skewY: {
          delay: 0.25,
          duration: 0.5,
        },
      },
    }),
  };

  const handleLinkClick = () => {
    setIsLoading(true);
    setIsActive(false);
  };

  return (
    <motion.div
      variants={slide}
      custom={data.index}
      initial="initial"
      animate="enter"
      exit="exit"
      whileHover="hovered"
      style={{
        width: "fit-content",
        minWidth: lang === "fr" ? "450px" : "350px",
      }}
    >
      <Link
        href={data.href}
        className={styles.link}
        passHref
        onClick={handleLinkClick}
      >
        <span className={styles.linkNumber}>{"0" + (data.index + 1)}</span>
        <div>
          {data.title.split("").map((l, i) => {
            return (
              <motion.span
                variants={{ initial: { y: 0 }, hovered: { y: "-125%" } }}
                transition={{
                  duration: 0.2,
                  delay: 0.025 * i,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block" }}
                key={i}
                className={styles.linkText}
              >
                {l === " " ? "\u00A0" : l}
              </motion.span>
            );
          })}
        </div>
        <div className={styles.textAbs} style={{ position: "absolute", left: "69px" }}>
          {data.title.split("").map((l, i) => {
            return (
              <motion.span
                variants={{
                  initial: { y: "100%" },
                  hovered: { y: 0 },
                }}
                transition={{
                  duration: 0.2,
                  delay: 0.025 * i,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block" }}
                key={i}
                className={styles.linkText}
              >
                {l === " " ? "\u00A0" : l}
              </motion.span>
            );
          })}
        </div>
      </Link>
    </motion.div>
  );
}

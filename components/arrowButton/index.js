import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.css";

export default function index({ text, handleClick, containerHover, animated = true}) {
  const [isHovered, setIsHovered] = useState(false);
  const currentHover = containerHover || isHovered;
  const letters = text.split('').map((char, i) => ({ char, isSpace: char === ' ' }));

  return (
    <button className={styles.buttonContainer} onClick={handleClick}>
      <motion.div
        className={styles.buttonContent}
        initial={{ x: "-26px" }}
        animate={{ x: currentHover ? "0px" : "-26px" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="5"
          stroke="currentColor"
          style={{ width: "18px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
        <div className={styles.textContainer}>
          {animated ? letters.map((letter, index) => (
            letter.isSpace ? (
              <span key={index}>&nbsp;</span>
            ) : (
              <motion.span
                key={index}
                className={styles.letter}
                animate={!currentHover ? { 
                  opacity: [0.5, 1, 0.5],
                  y: [0, -2, 0]
                } : {
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 2,
                  repeat: !currentHover ? Infinity : 0,
                  delay: !currentHover ? index * 0.1 : 0,
                  ease: "easeInOut"
                }}
              >
                {letter.char}
              </motion.span>
            )
          )) : text}
        </div>
        <motion.div
          className={styles.underline}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: currentHover ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        />
      </motion.div>
    </button>
  );
}

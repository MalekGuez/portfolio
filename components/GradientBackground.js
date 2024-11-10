"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../app/styles/GradientBackground.module.css";
import { useMenuContext } from "@/app/context/MenuContext";

export default function GradientBackground() {
  const interactive = useRef(null);

  const [positions, setPositions] = useState([]);
  const targetPositionsRef = useRef([]);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);

  const { isActive, bgVisible, bgMoveCount, setBgMoveCount } = useMenuContext();

  const generateRandomPosition = () => ({
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
  });

  useEffect(() => {
    const initialPositions = Array.from({ length: 5 }, generateRandomPosition);
    setPositions(initialPositions);
    targetPositionsRef.current = initialPositions;

    const intervalId = setInterval(() => {
      if (!initialAnimationComplete || isActive) return;
      const newPositions = targetPositionsRef.current.map(
        generateRandomPosition
      );
      setPositions(newPositions);
      targetPositionsRef.current = newPositions;
    }, 5900);

    return () => clearInterval(intervalId);
  }, [isActive, initialAnimationComplete]);

  useEffect(() => {
    if (isActive) {
      setInitialAnimationComplete(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (interactive.current) {
      let curX = 0;
      let curY = 0;
      let tgX = window.innerWidth / 2;
      let tgY = window.innerHeight * (-1.1);

      function onMouseMove(event) {
        tgX = event.clientX;
        tgY = event.clientY;
      }

      function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interactive.current.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
          move();
        });
      }

      window.addEventListener("mousemove", onMouseMove);

      move();
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, []);

  return (
    <div className={styles.gradient}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="gradientFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            result="gradientFilter"
          />
          <feBlend in="SourceGraphic" in2="gradientFilter" />
        </filter>
      </svg>
      <div className={styles.gradients}>
        <AnimatePresence mode="sync">
          {!isActive && bgVisible &&
            positions.map((pos, index) => (
              <motion.div
                key={index}
                className={styles[`g${index + 1}`]}
                initial={{
                  x: `${pos.x > 0 ? 100 : -100}%`,
                  y: `${pos.y > 0 ? 100 : -100}%`,
                  opacity: 0,
                  scale: 0.5,
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                  },
                }}
                animate={{
                  x: `${pos.x}%`,
                  y: `${pos.y}%`,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: bgMoveCount === 0 && 3.2,
                    duration: initialAnimationComplete ? 6 : 1,
                    ease: "easeInOut",
                  },
                }}
                onAnimationComplete={() => {
                  if (!initialAnimationComplete) {
                    setInitialAnimationComplete(true);
                  }
                  bgMoveCount === 0 && setBgMoveCount((m) => m+1);
                }}
                exit={{
                  x: `${pos.x > 0 ? 125 : -125}%`,
                  y: `${pos.y > 0 ? 125 : -125}%`,
                  opacity: 0,
                  scale: 0.5,
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}
        </AnimatePresence>
        <motion.div
          className={styles.interactive}
          ref={interactive}
          initial={false}
          animate={{
            opacity: isActive || !bgVisible ? 0 : 0.7,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        />
      </div>
    </div>
  );
}

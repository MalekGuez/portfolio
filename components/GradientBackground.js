"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../app/styles/GradientBackground.module.css";
import { useMenuContext } from "@/app/context/MenuContext";
import { usePathname } from "next/navigation";

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mql.matches);
    const handler = () => setIsMobile(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function useIsLowPerformance() {
  const [isLow, setIsLow] = useState(false);
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : 8;
    const lowMemory = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
    setIsLow(reducedMotion || cores <= 4 || lowMemory);
  }, []);
  return isLow;
}

export default function GradientBackground() {
  const pathname = usePathname();
  const interactive = useRef(null);
  const isMobile = useIsMobile();
  const isLowPerformance = useIsLowPerformance();

  const [positions, setPositions] = useState([]);
  const targetPositionsRef = useRef([]);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);

  const { isActive, bgVisible, bgMoveCount, setBgMoveCount, setBgVisible, loadCount } = useMenuContext();
  const generateRandomPosition = () => ({
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
  });

  useEffect(() => {
    if (isMobile || isLowPerformance) return;
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
  }, [isMobile, isLowPerformance, isActive, initialAnimationComplete]);

  useEffect(() => {
    if (isMobile || isLowPerformance) return;
    if (isActive || ["/", "/about"].includes(pathname)) {
      setInitialAnimationComplete(false);
    }
  }, [isMobile, isLowPerformance, isActive, pathname]);
  
  useEffect(() => {
    if (["/", "/about"].includes(pathname)) {
      setBgVisible(true);
      loadCount === 0 && setBgMoveCount(0);
    }
    else {
      setBgVisible(false);
      bgMoveCount === 0 && setBgMoveCount((m) => m + 1);
    }
  }, [pathname, setBgVisible, setBgMoveCount, bgMoveCount, loadCount]);
  

  useEffect(() => {
    if (isMobile || isLowPerformance || !interactive.current) return;

    let curX = 0;
    let curY = 0;
    let tgX = window.innerWidth / 2;
    let tgY = window.innerHeight * (-1.1);
    let rafId = null;
    let running = false;
    const idleThreshold = 2;

    function onMouseMove(event) {
      tgX = event.clientX;
      tgY = event.clientY;
      if (!running) {
        running = true;
        move();
      }
    }

    const roundTo = 5;
    function move() {
      if (!interactive.current) return;
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      const x = Math.round(curX / roundTo) * roundTo;
      const y = Math.round(curY / roundTo) * roundTo;
      interactive.current.style.transform = `translate(${x}px, ${y}px)`;
      const idle = Math.abs(curX - tgX) < idleThreshold && Math.abs(curY - tgY) < idleThreshold;
      if (idle) {
        running = false;
      } else {
        rafId = requestAnimationFrame(move);
      }
    }

    running = true;
    rafId = requestAnimationFrame(move);

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [isMobile, isLowPerformance]);

  if (isMobile || isLowPerformance) return null;

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
          {(!isActive && bgVisible) &&
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
                    delay: bgMoveCount === 0 ? 3.2 : 0,
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
            opacity: (!isActive && bgVisible) ? 0.7 : 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        />
      </div>
    </div>
  );
}

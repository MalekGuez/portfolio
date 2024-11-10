"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMenuContext } from "./context/MenuContext";
import styles from "./styles/page.module.css";
import Link from "next/link";

export default function Home() {
  const { isActive, isLoading, loadCount, setIsLoading } = useMenuContext();

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              className={styles.introContainer}
              initial={{
                opacity: 0,
                y: "200%",
                skewY: "-5deg",
              }}
              animate={{
                opacity: isActive ? 0 : 1,
                y: isActive ? "200%" : ["200%", "-15%", "0%"],
                skewY: isActive ? ["0deg", "5deg", "0deg"] : ["-5deg", "0deg"],
                transition: {
                  duration: 0.8,
                  delay: isActive ? 0 : (loadCount === 0) ? 1.4 : 0.4,
                  ease: "easeInOut",
                },
              }}
            >
              <h1>
                <span className={styles.titleStroke}>Hey, I'm</span> Malek.
              </h1>
              <p>
                I am a front-end developer driven by a passion for building
                high-performance, visually appealing, and accessible websites
                and applications.
              </p>
              <div className={styles.introButtons}>
                <Link className="btn btn-primary" href="#">
                  See my projects
                </Link>
                <Link className="btn btn-secondary" href="#">
                  More about me
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

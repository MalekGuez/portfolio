"use client";
import { AnimatePresence, motion } from "framer-motion";

import pageStyles from "../styles/page.module.css";
import styles from "./style.module.css";
import { useMenuContext } from "@/app/context/MenuContext";
import ArrowButton from "@/components/arrowButton";

export default function About() {
  const { isLoading, isActive, loadCount } = useMenuContext();

  const handleResumeClick = () => {
    window.open('/about/malek-guezouli.pdf', "_blank");
  }
  return (
    <main className={pageStyles.main}>
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            className={styles.aboutContainer}
            initial={{
              opacity: 0,
              y: "100%",
              skewY: "-5deg",
            }}
            animate={{
              opacity: isActive ? 0 : 1,
              y: isActive ? "100%" : ["100%", "-5%", "0%"],
              skewY: isActive ? ["0deg", "5deg", "0deg"] : ["-5deg", "0deg"],
              transition: {
                duration: 0.8,
                delay: loadCount === 0 ? 1.4 : isActive ? 0 : 0.4,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              y: "100%",
              skewY: "5deg",
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
          >
            <h2 className={styles.title}>DESIGNER & FRONT-END DEVELOPER</h2>
            <p className={styles.description}>
              Hey, my name is <strong>Malek</strong>, a front-end developer
              currently based in France. I’m driven by a passion for building
              high-performance, visually appealing, and accessible websites and
              applications.
              <br />I care a lot about the user experience, and I’m passionate
              for UI animations and creating intuitive, dynamic user
              experiences. I’m always being curious about learning new
              technologies or creating fancy design/coding.
            </p>
            <ArrowButton text="my resume" handleClick={handleResumeClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

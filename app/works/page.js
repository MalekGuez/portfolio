"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pageStyles from "../styles/page.module.css";
import styles from "./style.module.css";
import Work from "@/components/work";
import Modal from "@/components/modal";
import { useMenuContext } from "../context/MenuContext";

import { works } from "@/data/works"; 

export default function Works() {
  const { loadCount, isActive, isLoading } = useMenuContext();

  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <main className={pageStyles.main}>
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.h2
            className={styles.worksTitle}
            initial={{
              opacity: 0,
              y: "800%",
              skewY: "-5deg",
            }}
            animate={{
              opacity: isActive ? 0 : 1,
              y: isActive ? "800%" : ["800%", "-15%", "0%"],
              skewY: isActive ? ["0deg", "5deg", "0deg"] : ["-5deg", "0deg"],
              transition: {
                duration: 0.8,
                delay: loadCount === 0 ? 1.4 : isActive ? 0.15 : 0.4,
                ease: "easeInOut",
                opacity: {
                  duration: 0.8,
                  delay: loadCount === 0 ? 1.4 : isActive ? 0 : 0.4,
                  ease: "easeInOut",
                },
              },
            }}
          >
            Works {works.length < 10 ? `0${works.length}` : works.length}
          </motion.h2>
        )}
      </AnimatePresence>

      <div className={styles.works}>
        {works.map((work, index) => {
          return (
            <Work
              key={index}
              index={index}
              title={work.title}
              theme={work.date + " / " + work.theme}
              setModal={setModal}
            />
          );
        })}
        <Modal modal={modal} works={works} />
      </div>
    </main>
  );
}

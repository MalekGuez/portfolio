"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import styles from "./style.module.css";
import { works } from "@/data/works";
import { useMenuContext } from "@/app/context/MenuContext";

export default function WorkDetailPage({ params }) {
  const { setIsLoading } = useMenuContext();
  const [nextHover, setNextHover] = useState(false);
  const router = useRouter();
  const { "work-name": workName } = params;

  const currentWorkIndex = works.findIndex(
    (w) => w.link === workName.toLowerCase()
  );
  if (currentWorkIndex === -1) {
    router.push("/404");
    return null;
  }

  const work = works[currentWorkIndex];
  const nextWork = works[currentWorkIndex + 1] || works[0];

  const handleNextClick = () => {
    setIsLoading(true);

    setTimeout(() => router.push(`/works/${nextWork.link}`), 200);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const workContainer = useRef(null);
  const descriptionContainer = useRef(null);

  const { isActive, isLoading, loadCount } = useMenuContext();

  useEffect(() => {
    if (workContainer.current && descriptionContainer.current) {
      const handleScroll = () => {
        if (
          workContainer.current.scrollTop >
          descriptionContainer.current.offsetHeight + 45
        ) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
      const container = workContainer.current;
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [workContainer.current]);

  const { scrollYProgress } = useScroll({
    container: workContainer.current && workContainer,
    target: descriptionContainer.current && descriptionContainer,
    offset: [".8 start", "end .8"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const handleVisitClick = (site) => {
    window.open(site, "_blank", "noopener,noreferrer");
  };

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            className={styles.workContainer}
            ref={workContainer}
            initial={{
              opacity: opacity,
              y: "100%",
              skewY: "-5deg",
            }}
            animate={{
              opacity: isActive ? 0 : 1,
              y: isActive ? "100%" : ["100%", "-5%", "0%"],
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
            <motion.div
              className={styles.workDescription}
              ref={descriptionContainer}
              style={{ opacity: isScrolled ? 0 : opacity }}
            >
              <h2 className={styles.descriptionTitle}>{work.title}</h2>
              <p className={styles.description}>{work.description}</p>
            </motion.div>

            <div className={styles.workDetail}>
              <div className={styles.detailImages}>
                {work.images &&
                  work.images.map((image, index) => {
                    return (
                      <Image
                        className={styles.image}
                        key={index}
                        src={`/static/images/works/${work.link}/images/${image}`}
                        alt="Work images"
                        width={1000}
                        height={0}
                      />
                    );
                  })}
              </div>
              <div
                className={styles.detailSpecs}
                style={{
                  position: isScrolled ? "sticky" : "",
                  top: isScrolled && "0px",
                }}
              >
                {work.specs &&
                  work.specs.map((spec, index) => {
                    return (
                      <div className={styles.specs} key={index}>
                        <h3 className={styles.specsTitle}>{spec.title}</h3>
                        <span className={styles.specsDesc}>{spec.value}</span>
                      </div>
                    );
                  })}
                {work.site && (
                  <button
                    className={styles.buttonContainer}
                    onClick={() => handleVisitClick(work.site)}
                  >
                    <motion.div
                      className={styles.buttonContent}
                      initial={{ x: "-28px" }}
                      whileHover={{ x: "0px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="3"
                        stroke="currentColor"
                        style={{ width: "20px" }}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                      view website
                    </motion.div>
                  </button>
                )}
              </div>
            </div>
            <div
              className={styles.navigation}
              onMouseEnter={() => setNextHover(true)}
              onMouseLeave={() => setNextHover(false)}
              onClick={handleNextClick}
            >
              <button className={styles.buttonContainer}>
                <motion.div
                  className={styles.buttonContent}
                  initial={{ x: "-20px" }}
                  animate={{ x: nextHover ? "0px" : "-20px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="currentColor"
                    style={{ width: "20px" }}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                  Next work
                </motion.div>
              </button>
              <div className={styles.navigationInfo}>
                <h3>{nextWork.title}</h3>
                <p>{nextWork.theme}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

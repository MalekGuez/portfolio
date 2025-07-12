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
import ArrowButton from "@/components/arrowButton";
import { useTranslation } from "react-i18next";

export default function WorkDetailPage({ params }) {
  const { setIsLoading } = useMenuContext();
  const [nextHover, setNextHover] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
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
              <p className={styles.description}>{t(`work.${work.link}.description`)}</p>
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
                        unoptimized 
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
                        <h3 className={styles.specsTitle}>{t(`work.${spec.title}`)}</h3>
                        <span className={styles.specsDesc}>{t(`work.${work.link}.${spec.value}`)}</span>
                      </div>
                    );
                  })}
                {work.site && (
                  <ArrowButton text={t("work.visitBtn")} handleClick={() => handleVisitClick(work.site)}/>
                )}
              </div>
            </div>
            <div
              className={styles.navigation}
              onMouseEnter={() => setNextHover(true)}
              onMouseLeave={() => setNextHover(false)}
              onClick={handleNextClick}
            >
              <ArrowButton text={t("works.nextBtn")} containerHover={nextHover} animated={false}/>
              <div className={styles.navigationInfo}>
                <h3>{nextWork.title}</h3>
                <p>{t(`work.${nextWork.link}.theme`)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

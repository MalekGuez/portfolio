import Image from "next/image";
import styles from "./style.module.css";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function index({ modal, works }) {
  const { active, index } = modal;
  const sliderContainer = useRef(null);

  useEffect(() => {
    const moveSliderContainerX = gsap.quickTo(sliderContainer.current, "left", {duration: .8, ease: "power3"});
    const moveSliderContainerY = gsap.quickTo(sliderContainer.current, "top", {duration: .8, ease: "power3"});

    window.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        moveSliderContainerX(clientX);
        moveSliderContainerY(clientY);
    });
  }, []);

  return (
    <motion.div
      ref={sliderContainer}
      className={styles.modalContainer}
      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
      animate={
        active
          ? {
              scale: 1,
              opacity: 1,
              x: "-50%",
              y: "-50%",
              transition: { duration: 0.35, ease: [0.7, 0, 0.24, 1] },
            }
          : {
              scale: 0,
              opacity: 0,
              x: "-50%",
              y: "-50%",
              transition: { duration: 0.35, ease: [0.7, 0, 0.24, 1] },
            }
      }
    >
      <div style={{ top: -100 * index + "%" }} className={styles.modalSlider}>
        {works.map((work, index) => {
          return (
            <div
              className={styles.modal}
              key={`modal_${index}`}
              style={{ backgroundColor: work.color }}
            >
              <Image src={work.src} width={200} height={0} alt={work.title} />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

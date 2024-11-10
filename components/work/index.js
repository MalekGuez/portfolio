import styles from "./style.module.css";
import { AnimatePresence, motion } from "framer-motion";

import { useMenuContext } from "@/app/context/MenuContext";

export default function index({ index, title, theme, setModal }) {
  const { isActive, isLoading, setIsLoading, loadCount } = useMenuContext();

  const handleWorkClick = () => {
    setIsLoading(true);
    setModal({active: false, index});
  };

  return (
    <AnimatePresence mode="wait">
      {!isLoading && (
        <motion.div
          className={styles.work}
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
              delay: loadCount === 0 ? 1.4 : isActive ? 0 : 0.4,
              ease: "easeInOut",
              opacity: {
                duration: 0.8,
                delay:
                  loadCount === 0
                    ? 1.4 + 0.05 * index
                    : isActive
                    ? 0 + 0.05 * index
                    : 0.4 + 0.05 * index,
                ease: "easeInOut",
              },
            },
          }}
          onMouseEnter={() => setModal({ active: true, index })}
          onMouseLeave={() => setModal({ active: false, index })}
          onClick={handleWorkClick}
        >
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.theme}>{theme}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

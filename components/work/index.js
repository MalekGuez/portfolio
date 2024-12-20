import styles from "./style.module.css";

import { AnimatePresence, motion } from "framer-motion";

import { useMenuContext } from "@/app/context/MenuContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function index({ index, title, dateKey, themeKey, setModal, link }) {
  const router = useRouter();
  const { isActive, isLoading, setIsLoading, loadCount } = useMenuContext();
  const { t } = useTranslation();
  const handleWorkClick = () => {
    setIsLoading(true);
    setModal({active: false, index});
    setTimeout(() => router.push(`/works/${link}`), 400);
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
              duration: 0.7,
              delay: loadCount === 0 ? 1.4 : isActive ? 0 : 0.4,
              ease: "easeInOut",
              opacity: {
                duration: 0.7,
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
          exit={{
            opacity: 0,
            y: "800%",
            skewY: "5deg",
            transition: {
              duration: 0.4,
              ease: "easeInOut",
              opacity: {
                duration: .3
              }
            },
          }}
          onMouseEnter={() => setModal({ active: true, index })}
          onMouseLeave={() => setModal({ active: false, index })}
          onClick={handleWorkClick}
        >
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.theme}>{t(`works.${dateKey}`)} / {t(`works.${themeKey}`)}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

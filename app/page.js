"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMenuContext } from "./context/MenuContext";
import styles from "./styles/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { isActive, isLoading, loadCount, setIsLoading, setIsActive } = useMenuContext();
  const router = useRouter();
  const { t } = useTranslation();

  const handleButtonClick = (e, link) => {
    e.preventDefault();
    setIsLoading(true);
    setIsActive(false);
    setTimeout(() => router.push(link, 400));
  }

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              className={styles.introContainer}
              initial={{
                opacity: 0,
                y: "300%",
                skewY: "-5deg",
              }}
              animate={{
                opacity: isActive ? 0 : 1,
                y: isActive ? "300%" : ["300%", "-15%", "0%"],
                skewY: isActive ? ["0deg", "5deg", "0deg"] : ["-5deg", "0deg"],
                transition: {
                  duration: 0.8,
                  delay: isActive ? 0 : (loadCount === 0) ? 1.4 : 0.4,
                  ease: "easeInOut",
                },
              }}
              exit={{
                opacity: 0,
                y: "300%",
                skewY: "-5deg",
                transition: {
                  duration: .4,
                  ease: "easeInOut"
                }
              }}
            >
              <h1>
                <span className={styles.titleStroke}>{t("home.title")}</span> Malek.
              </h1>
              <p>
               {t("home.subtitle")}
              </p>
              <div className={styles.introButtons}>
                <Link className="btn btn-primary" href="#" onClick={(e) => handleButtonClick(e, "/works")}>
                  {t("home.worksBtn")}
                </Link>
                <Link className="btn btn-secondary" href="#" onClick={(e) => handleButtonClick(e, "/about")}>
                  {t("home.aboutBtn")}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMenuContext } from "@/app/context/MenuContext";
import { motion } from "framer-motion";
import styles from "@/app/styles/Header.module.css";
import Nav from "./nav";
import GradientBackground from "./GradientBackground";

export default function Header() {
  const { isLoading, isActive, setBgVisible, setBgMoveCount, bgMoveCount, setIsLoading, setIsActive } =
    useMenuContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setBgVisible(false);
      bgMoveCount === 0 && setBgMoveCount((m) => m + 1);
    } else {
      setBgVisible(true);
    }
  }, [pathname, setBgVisible, setBgMoveCount]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <motion.img
            className={styles.logo}
            src="/static/images/Logo-white.svg"
            alt="MG"
            width="52"
            height="30"
            initial={{ y: "-200%" }}
            animate={{
              y: !isLoading && "0%",
              transition: {
                duration: 0.35,
                delay: 1,
                ease: "easeInOut",
              },
            }}
            onClick={() => {
              pathname !== "/" && router.push("/");
              setIsLoading(true);
              setIsActive(false);
            }}
          />
          <motion.div
            className={styles.logoText}
            initial={{ y: "-100%", skewY: "0deg" }}
            animate={{
              y: isActive ? "0%" : "-100%",
              transition: {
                duration: isActive ? 0.35 : 0.25,
                delay: isActive ? 0.8 : 0,
                ease: "easeInOut",
              },
            }}
          >
            / malek guezouli
          </motion.div>
        </div>

        <div className={styles.headerContainer}>
          <motion.div
            className={styles.headerLang}
            initial={{ y: "-150px" }}
            animate={{
              y: !isLoading && "0px",
              transition: {
                duration: 0.35,
                delay: 1.35,
                ease: "easeInOut",
              },
            }}
          >
            FR
          </motion.div>
          <motion.div
            className={styles.headerTheme}
            initial={{ y: "-150px" }}
            animate={{
              y: !isLoading && "0px",
              transition: {
                duration: 0.35,
                delay: 1.35,
                ease: "easeInOut",
              },
            }}
          />
          <Nav />
        </div>
      </div>
      <GradientBackground />
    </>
  );
}

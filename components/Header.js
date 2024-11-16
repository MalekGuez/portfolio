"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMenuContext } from "@/app/context/MenuContext";
import { motion } from "framer-motion";
import styles from "@/app/styles/Header.module.css";
import Nav from "./nav";
import GradientBackground from "./GradientBackground";

export default function Header() {
  const { isLoading, isActive, bgVisible, setBgVisible, setBgMoveCount, bgMoveCount, setIsLoading, setIsActive } =
    useMenuContext();
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      path: '/',
      title: 'Portfolio'
    },
    {
      path: '/about',
      title: 'About'
    },
    {
      path: '/works',
      title: 'Works'
    },
    {
      path: '/works/malekguezouli',
      title: 'Portfolio'
    },
    {
      path: '/works/everyparts',
      title: 'Every Parts'
    },
    {
      path: '/works/charlemagne',
      title: 'Charlemagne'
    },
    {
      path: '/works/rentcar',
      title: 'RentCar'
    },
    {
      path: '/works/weeb-lampe',
      title: 'Weeb Lampe'
    },
    {
      path: '/404',
      title: 'Not found'
    }
  ];

  const getTitleFromPath = (path) => {
    const route = routes.find(route => route.path === path)
    return route?.title || "Portfolio";
  }

  useEffect(() => {
    if (pathname !== "/") {
      setBgVisible(false);
      bgMoveCount === 0 && setBgMoveCount((m) => m + 1);
    } else if (["/", "/about"].includes(pathname)) {
      setBgVisible(true);
    }
  }, [pathname, setBgVisible, setBgMoveCount]);

  useEffect(() => {
    document.title = `Malek Guezouli | ${getTitleFromPath(pathname)}`;
  }, [pathname])

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

"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMenuContext } from "@/app/context/MenuContext";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import styles from "@/app/styles/Header.module.css";
import Nav from "./nav";
import GradientBackground from "./GradientBackground";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { isLoading, isActive, setIsLoading, setIsActive } = useMenuContext();
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      path: '/',
      title: 'Portfolio'
    },
    {
      path: '/about',
      title: t('header.about')
    },
    {
      path: '/works',
      title: t('header.works')
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
      title: t('page.notfound')
    }
  ];

  const getTitleFromPath = (path) => {
    const route = routes.find(route => route.path === path)
    return route?.title || "Portfolio";
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    setIsLoading(true);
  };

  useEffect(() => {
    document.title = `Malek Guezouli | ${getTitleFromPath(pathname)}`;
  }, [pathname, i18n.language])

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
              setIsLoading(true);
              setIsActive(false);
              pathname !== "/" && setTimeout(() => router.push("/"), 400);
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
            onClick={toggleLanguage}
          >
            {i18n.language === "en" ? "EN" : "FR"}
          </motion.div>
          <motion.div
            className={styles.headerTheme}
            initial={{ y: "-150px", borderRadius: "50%", rotate: 0, scale: 1 }}
            animate={{
              y: !isLoading && "0px",
              transition: {
                duration: 0.35,
                delay: 1.35,
                ease: "easeInOut",
              },
            }}
            whileHover={{
              rotate: [0, 5, -5, 5, -5, 0],
              borderRadius: ["50%", "40%", "50%"],
              scale: 1.2,
              transition: {
                duration: 1.2,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                repeat: Infinity,
                scale: {
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: 0,
                }
              }
            }}
          />
          <Nav />
        </div>
      </div>
      <GradientBackground />
    </>
  );
}

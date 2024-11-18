import React from "react";
import { motion } from "framer-motion";
import Link from "../Link";
import { useTranslation } from "react-i18next";
import styles from "../style.module.css";

const slide = {
  initial: {
    y: "-100%",
  },
  enter: {
    y: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1},
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 0.5] },
  },
};

export default function index() {
  const { t, i18n } = useTranslation();

  const items = [
    {
      title: t("header.home"),
      href: "/",
    },
    {
      title: t("header.works"),
      href: "/works",
    },
    {
      title: t("header.about"),
      href: "/about",
    },
    {
      title: t("header.contact"),
      href: "mailto:guezoulimalek@gmail.com",
    },
  ];
  return (
    <motion.div
      className={styles.navItems}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {items.map((item, index) => {
        return <Link data={{ ...item, index }} key={index} lang={i18n.language}/>;
      })}
    </motion.div>
  );
}

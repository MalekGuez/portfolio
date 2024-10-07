import React from "react";
import { motion } from "framer-motion";
import Link from "../Link";

import styles from "../style.module.css";

const slide = {
    initial: {
        y: "-100%"
    },
    enter: {
        y: "0%",
        transition: { duration: 0.8, ease: [.76, 0, .24, 1]}
    },
    exit: {
        y: "-100%",
        transition: { duration: 0.8, ease: [.76, 0, .24, 1]}
    }
}

const items = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "Works",
        href: "/works"
    },
    {
        title: "About me",
        href: "/about-me"
    },
    {
        title: "Contact",
        href: "mailto:malekguezouli@gmail.com"
    }
];

export default function index() {
    return (
        <motion.div
            className={styles.navItems}
            variants={slide}
            initial="initial"
            animate="enter"
            exit="exit"
        >
            {items.map((item, index) => {
                return <Link data={{...item, index}} key={index}/>
            })}
        </motion.div>
    );
}
import React from "react";
import { motion } from "framer-motion";
import Link from "../Link";

import styles from "../style.module.css";

const slide = {
    initial: {
        x: "0%"
    },
    enter: {
        x: "-100%",
        transition: { duration: 0.5, ease: "easeIn"}
    },
    exit: {
        x: "0%",
        transition: { duration: 0.5, ease: "easeIn"}
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
    }
];

const index = () => {
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

export default index;
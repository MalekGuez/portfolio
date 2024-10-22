import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import styles from './style.module.css';

const slide = {
    initial: {
        y: "25px",
        skewY: "10deg",
        opacity: 0,
    },
    enter: (i) => ({
        y: "0px",
        skewY: "0deg",
        opacity: 1,
        transition: { 
            duration: .8, 
            ease: [.76, 0, .24, 1], 
            delay: (.05 * i),
            skewY: {
                delay: .45, 
                duration: .5
            },
            opacity: {
                duration: .5,
                delay: (.10 * i)
            },
        }
    }),
    exit: (i) => ({
        y: "-25px",
        skewY: "-10deg",
        opacity: 0,
        transition: { 
            duration: .8,
            ease: [.24, 0, .24, 1],
            delay: .05 *(4 - i - 1), 
            skewY: {
                delay: .25,
                duration: .5
            },
        }
    })
}

export default function index({data}){
    return (
        <motion.div 
            variants={slide}
            custom={data.index}
            initial="initial"
            animate="enter"
            exit="exit"
        >
            <Link href={data.href} className={styles.link}>
               <span>{"0" + (data.index + 1)}</span> {data.title}
            </Link>
        </motion.div>
    );
}
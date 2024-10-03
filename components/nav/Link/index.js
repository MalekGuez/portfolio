import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import styles from './style.module.css';

const index = ({data}) => {
    return (
        <motion.div custom={data.index} >
            <Link href={data.href} className={styles.link}>
               <span>{data.index + 1}</span> {data.title}
            </Link>
        </motion.div>
    );
}

export default index;
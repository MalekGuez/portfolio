"use client"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { topLeft, topCenter, topRight, middleLeft, middleRight, bottomLeft, bottomCenter, bottomRight } from "./paths";
import styles from "@/components/nav/style.module.css";
import NavItems from "./navItems";

const index = () => {
    const [isHover, setIsHover] = useState(false);
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                onMouseEnter={() => setIsHover(true)} 
                onMouseLeave={() => setIsHover(false)}
                onClick={() => setIsActive(!isActive)}
                className={styles.menu}
            >
                <path d={topLeft}/>
                <motion.path 
                    d={topCenter}
                    initial={false}
                    animate={{
                        y: isHover ? "-25px" : "0px" 
                    }} 
                    transition={{ duration: 0.25, ease: "easeOut"}}
                />
                <path d={topRight}/>
                <motion.path 
                    d={middleLeft}
                    initial={false}
                    animate={{
                        x: isHover ? "-25px" : "0px" 
                    }} 
                    transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <motion.path 
                    d={middleRight}
                    initial={false}
                    animate={{
                        x: isHover ? "25px" : "0px" 
                    }} 
                    transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <path d={bottomLeft}/>
                <motion.path 
                    d={bottomCenter}
                    initial={false}
                    animate={{
                        y: isHover ? "25px" : "0px" 
                    }} 
                    transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <path d={bottomRight}/>
                <motion.rect x="25.8" y="25.8" width="8.62" height="8.62" fill="none" stroke="white" strokeWidth="2" 
                    initial={false}
                    animate={{ 
                        y: isHover ? '-17px' : '0px',
                        height: isHover ? '42.31px' : '8.62px'
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                />
                <motion.rect x="25.8" y="25.8" width="8.62" height="8.62" fill="none" stroke="white" strokeWidth="2" 
                    initial={false}
                    animate={{ 
                        x: isHover ? '-17px' : '0px',
                        width: isHover ? '42.31px' : '8.62px'
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                />
            </svg>

            <AnimatePresence mode="wait">
                {isActive && <NavItems />}
            </AnimatePresence>
        </>
    );
}

export default index;
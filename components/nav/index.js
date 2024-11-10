import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { topLeft, topCenter, topRight, middleLeft, middleRight, bottomLeft, bottomCenter, bottomRight } from "./paths";
import styles from "@/components/nav/style.module.css";
import NavItems from "./navItems";
import { useMenuContext } from "@/app/context/MenuContext";

export default function index() {
    const { isActive, setIsActive, isLoading } = useMenuContext();
    const [isHover, setIsHover] = useState(false);

    return (
        <div className={styles.menuContainer}>
            <motion.svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                onMouseEnter={() => setIsHover(true)} 
                onMouseLeave={() => setIsHover(false)}
                onClick={() => setIsActive(!isActive)}
                className={styles.menu}
                initial={{ y: "-200%", scale: 1}}
                animate={{
                    rotate: isActive ? [0, 55, 45] : 0,
                    scale: isActive ? 1.2 : 1,
                    y: !isLoading && "0%",
                    transition: {
                        y: {
                            delay: 1, 
                            duration: .35
                        }
                    }
                }}
                transition={{ duration: .55, ease: [.25, 0, .24, 1]}}
            >
                <motion.path 
                    d={topLeft} 
                    initial={false} 
                    animate={{
                        x: isActive ? "-25px" : "0px",
                        y: isActive ? "-25px" : "0px"
                    }}
                    transition={{ duration: 0.25, ease: "easeOut"}}
                />
                <motion.path 
                    d={topCenter}
                    initial={false}
                    animate={{
                        y: isHover ? "-25px" : isActive ? "-25px" : "0px" 
                    }} 
                    transition={{ duration: 0.25, ease: "easeOut"}}
                />
                <motion.path 
                    d={topRight}
                    initial={false} 
                    animate={{
                        x: isActive ? "25px" : "0px",
                        y: isActive ? "-25px" : "0px"
                    }}
                    transition={{ duration: 0.25, ease: "easeOut"}}
                />
                <motion.path 
                    d={middleLeft}
                    initial={false}
                    animate={{
                        x: isHover ? "-25px" : isActive ? "-25px" : "0px" 
                    }} 
                    transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <motion.path 
                    d={middleRight}
                    initial={false}
                    animate={{
                        x: isHover ? "25px" : isActive ? "25px" : "0px" 
                    }} 
                    transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <motion.path 
                    d={bottomLeft}
                    initial={false} 
                    animate={{
                        x: isActive ? "-25px" : "0px",
                        y: isActive ? "25px" : "0px"
                    }}
                    transition={{ duration: 0.25, ease: "easeOut"}}
                />
                <motion.path 
                    d={bottomCenter}
                    initial={false}
                    animate={{
                        y: isHover ? "25px" : isActive ? "25px" : "0px" 
                    }} 
                    transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <motion.path 
                    d={bottomRight}
                    initial={false} 
                    animate={{
                        x: isActive ? "25px" : "0px",
                        y: isActive ? "25px" : "0px"
                    }}
                transition={{ duration: 0.25, ease: "easeOut"}}
                />
                <motion.rect x="25.7" y="25.7" width="8.62" height="8.62" fill="none" stroke="white" strokeWidth="2" 
                    initial={false}
                    animate={{ 
                        y: isHover ? '-17px': isActive ? "-17px" :  '0px',
                        height: isHover ? '42.31px' : isActive ? "42.31px" : '8.62px'
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                />
                <motion.rect x="25.7" y="25.7" width="8.62" height="8.62" fill="none" stroke="white" strokeWidth="2" 
                    initial={false}
                    animate={{ 
                        x: isHover ? '-17px' : isActive ? "-17px" : '0px',
                        width: isHover ? '42.31px' : isActive ? "42.31px" : '8.62px'
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                />
            </motion.svg>

            <AnimatePresence mode="wait">
                {isActive && <NavItems />}
            </AnimatePresence>
        </div>
    );
}
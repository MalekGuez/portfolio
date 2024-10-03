"use client"
import { useEffect, useRef } from "react";
import styles from "../app/styles/GradientBackground.module.css";

const GradientBackground = () => {
    const interactive = useRef(null);

    useEffect(() => {
        if(interactive.current) {
            let curX = 0;
            let curY = 0;
            let tgX = 0;
            let tgY = 0;
        
            function move() {
                curX += (tgX - curX) / 20;
                curY += (tgY - curY) / 20;
                interactive.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
                requestAnimationFrame(() => {
                    move();
                });
            }
        
            window.addEventListener('mousemove', (event) => {
                tgX = event.clientX;
                tgY = event.clientY;
            });
        
            move();
        }
    }, []);

    return (
        <div className={styles.gradient}>
            <svg xmlns="http://www.w3.org/2000/svg">
                <filter id="gradientFilter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="gradientFilter" />
                    <feBlend in="SourceGraphic" in2="gradientFilter" />
                </filter>
            </svg>
            <div className={styles.gradients}>
                <div className={styles.g1}></div>
                <div className={styles.g2}></div>
                <div className={styles.g3}></div>
                <div className={styles.g4}></div>
                <div className={styles.g5}></div>
                <div className={styles.interactive} ref={interactive}></div>
            </div>
        </div>
    );
};

export default GradientBackground;
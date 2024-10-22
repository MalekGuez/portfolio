"use client"
import { useMenuContext } from "../app/context/MenuContext";
import styles from "../app/styles/Header.module.css";
import Image from "next/image";
import Nav from "./nav";
import GradientBackground from "./GradientBackground";

export default function Header() {
    const {isActive, setIsActive} = useMenuContext();

    return (
        <>
            <div className={styles.header}>
                <Image className={styles.logo} src="static/images/Logo-white.svg" alt="MG" width="52" height="30" />

                <div className={styles.headerContainer}>
                    <Nav isActive={isActive} setIsActive={setIsActive}/>
                </div>
            </div>
            <GradientBackground isActive={isActive} />
        </>
    );
};
import React from "react";
import styles from "../app/styles/Header.module.css";
import Image from "next/image";
import Nav from "./nav";

export default function Header() {
    return (
        <div className={styles.header}>
           <Image className={styles.logo} src="static/images/Logo-white.svg" alt="MG" width="52" height="30" />

           <div className={styles.headerContainer}>
                <Nav />
           </div>
        </div>
    );
};
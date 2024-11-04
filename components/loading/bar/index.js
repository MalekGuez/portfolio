import { motion, AnimatePresence } from "framer-motion";
import styles from "../style.module.css";
import { useEffect } from "react";

export default function LoadingBar({ isLoading }) {
    useEffect(() => {
        console.log("mounted")
    }, [])
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.progressBar}
          initial={{ width: "0%" }}
          animate={{ width: "100%", opacity: 0}}
          transition={{
            duration: .5,
            ease: "easeInOut",
            opacity: {
                duration: .2,
                delay: .4
            }
          }}
        />
      )}
    </AnimatePresence>
  );
}
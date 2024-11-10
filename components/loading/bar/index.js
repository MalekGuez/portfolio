import { motion, AnimatePresence } from "framer-motion";
import styles from "../style.module.css";

export default function LoadingBar({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.progressBar}
          initial={{ width: "0%" }}
          animate={{ width: "100%", opacity: 0}}
          transition={{
            duration: .25,
            ease: "easeInOut",
            opacity: {
                duration: .2,
                delay: .2
            }
          }}
        />
      )}
    </AnimatePresence>
  );
}
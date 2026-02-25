import { motion, AnimatePresence } from "framer-motion";
import styles from "../style.module.css";

export default function LoadingBar({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.progressBar}
          initial={{ width: "0%" }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
        />
      )}
    </AnimatePresence>
  );
}
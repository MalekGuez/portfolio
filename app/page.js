import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import styles from "./styles/page.module.css";

export default function Home() {
  return (
      <main className={styles.main}>
        <Header />
        <GradientBackground />
      </main>
  );
}

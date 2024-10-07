
import GradientBackground from "@/components/GradientBackground";
import styles from "./styles/page.module.css";
import Link from "next/link";

export default function Home() {
  return (
      <main className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.introContainer}>
            <h1><span className={styles.titleStroke}>Hey, I'm</span> Malek.</h1>
            <p>I am a front-end developer driven by a passion for building high-performance, visually appealing, and accessible websites and applications.</p>
            <div className={styles.introButtons}>
              <Link className="btn btn-primary" href="#">See my projects</Link>
              <Link className="btn btn-secondary" href="#">More about me</Link>
            </div>
          </div>
        </div>
        <GradientBackground />
      </main>
  );
}

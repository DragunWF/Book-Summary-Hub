import styles from "./Background.module.css";

export default function Background() {
  return (
    <div className={styles.voidMesh}>
      <div className={`${styles.meshGradient} ${styles.g1}`}></div>
      <div className={`${styles.meshGradient} ${styles.g2}`}></div>
    </div>
  );
}
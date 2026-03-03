import NavHeader from "../_components/NavHeader/NavHeader";
import Background from "../_components/AdminLogin/Background/Background";
import styles from "./about.module.css";

export const metadata = {
  title: "About | DragunWF Book Hub",
};

export default function AboutPage() {
  return (
    <div className={styles.aboutWrapper}>
      {/* Immersive Background */}
      <Background />

      <div
        className="container"
        style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}
      >
        <NavHeader />

        <div className={styles.contentContainer}>
          {/* 
            SECTION A: The Project Abstract 
          */}
          <section className={styles.abstractContainer}>
            <div className={styles.abstractLayout}>
              {/* Vertical Decorator Line (Desktop Only) */}
              <div className={styles.decoratorLine}></div>

              <div className={styles.systemLogHeader}>
                <header>
                  <span className={styles.logMeta}>
                    {"//"} System Log: v1.0.4
                  </span>
                  <h1 className={styles.logTitle}>
                    Continuous Self-Improvement
                  </h1>
                </header>

                <div className={styles.logContent}>
                  <p className={styles.logText}>
                    Hallo. This book summary hub is where I turn passive reading
                    into active learning. These notes are curated from my
                    <a
                      href="https://obsidian.md/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      Obsidian{" "}
                    </a>
                    vault and focus on books that demand a deeper dive to fully
                    grasp. They were born out of a personal uses for learning,
                    not public communication, but I&apos;ve published them here
                    so that my &quot;learning in public&quot; might provide
                    value to you as well.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 
            SECTION B: The System Blueprint 
          */}
          <section className={styles.blueprintContainer}>
            <div className={styles.glassPanel}>
              {/* Label */}
              <div className={styles.pipelineHeader}>
                <h2 className={styles.pipelineTitle}>
                  Data Assimilation Pipeline
                </h2>
              </div>

              {/* Flow Chart Container */}
              <div className={styles.flowChart}>
                {/* NODE 1: RAW DATA */}
                <div className={styles.nodeWrapper}>
                  <div className={`${styles.systemNode} ${styles.rawDataNode}`}>
                    <span className={styles.nodeIcon}>📖</span>
                    <span className={styles.nodeLabel}>RAW_DATA</span>
                    <span className={styles.nodeMeta}>Input: Books</span>
                  </div>
                </div>

                {/* CONNECTOR 1 */}
                <div className={styles.connectorWrapper}>
                  <div className={styles.connectorLine}></div>
                  <span className={styles.connectorLabel}>Assimilate</span>
                </div>

                {/* NODE 2: REFACTOR */}
                <div className={styles.nodeWrapper}>
                  <div
                    className={`${styles.systemNode} ${styles.refactorNode}`}
                  >
                    <span className={styles.nodeIcon}>🔮</span>
                    <span className={styles.nodeLabel}>REFACTOR</span>
                    <span className={styles.nodeMeta}>Process: Obsidian</span>
                  </div>
                </div>

                {/* CONNECTOR 2 */}
                <div className={styles.connectorWrapper}>
                  <div className={styles.connectorLine}></div>
                  <span className={styles.connectorLabel}>Build</span>
                </div>

                {/* NODE 3: DEPLOY */}
                <div className={styles.nodeWrapper}>
                  <div className={`${styles.systemNode} ${styles.deployNode}`}>
                    <span className={styles.nodeIcon}>🚀</span>
                    <span className={styles.nodeLabel}>DEPLOY</span>
                    <span className={styles.nodeMeta}>Output: The Hub</span>
                  </div>
                </div>
              </div>

              {/* Footer Metadata */}
              <div className={styles.systemFooter}>
                <div className={styles.footerBlock}>
                  <p>STATUS: OPERATIONAL</p>
                  <p>LATENCY: 12ms</p>
                </div>
                <div className={`${styles.footerBlock} ${styles.textRight}`}>
                  <p>ARCHITECT: DRAGUNWF</p>
                  <p>SYS_ID: 0x92F_A1</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.pageFooter}>
          <p>
            &copy; {new Date().getFullYear()} DragunWF. Built with React,
            TypeScript, & Next.js
          </p>
        </footer>
      </div>
    </div>
  );
}

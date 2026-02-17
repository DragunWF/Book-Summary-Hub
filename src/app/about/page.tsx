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

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
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
                    The Architecture of Knowledge
                  </h1>
                </header>

                <div className={styles.logContent}>
                  <p className={styles.logText}>
                    The{" "}
                    <span className={styles.highlight}>DragunWF Book Hub</span>{" "}
                    is a digital archive designed to compile, refactor, and
                    deploy knowledge. It bridges the gap between raw information
                    and actionable insight, utilizing a &apos;Clean
                    Architecture&apos; approach to learning. Here, books are not
                    just read, they are assimilated into a persistent mental
                    codebase.
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

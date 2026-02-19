"use client";

import React from "react";
import styles from "./BookMarkdownContent.module.css";
import { Copy } from "lucide-react";

export default function BookMarkdownContent() {
  return (
    <article className={styles.markdownContent}>
      <section id="introduction">
        <h2>Introduction</h2>
        <p>
          Software architecture is the art of drawing lines that I call
          &quot;boundaries.&quot; Those boundaries separate software elements
          from one another, and separate those that do not know from those that
          know. The ultimate goal of architecture is to minimize the human
          resources required to build and maintain the required system.
        </p>
        <blockquote>
          &quot;If you think good architecture is expensive, try bad
          architecture.&quot;
        </blockquote>
      </section>

      <section id="key-concepts">
        <h2>Key Concepts</h2>
        <p>
          At the core of Clean Architecture is the Dependency Rule. This rule
          says that source code dependencies can only point inwards. Nothing in
          an inner circle can know anything at all about something in an outer
          circle.
        </p>
        <ul>
          <li>
            <strong>Entities:</strong> Enterprise-wide business rules.
          </li>
          <li>
            <strong>Use Cases:</strong> Application-specific business rules.
          </li>
          <li>
            <strong>Interface Adapters:</strong> Controllers, Gateways, and
            Presenters.
          </li>
          <li>
            <strong>Frameworks & Drivers:</strong> The database, the web
            framework, etc.
          </li>
        </ul>
      </section>

      <section id="component-principles">
        <h2>Component Principles</h2>
        <p>
          Components are units of deployment. They are the smallest entities
          that can be deployed as part of a system. In Java, they are jar files.
          In Ruby, they are gem files.
        </p>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span>java / interface-segregation.java</span>
            <Copy size={14} style={{ cursor: "pointer" }} />
          </div>
          <div className={styles.codeBody}>
            <span style={{ color: "#c678dd" }}>interface</span>{" "}
            <span style={{ color: "#e5c07b" }}>IRepository</span> &#123;
            <br />
            &nbsp;&nbsp;
            <span style={{ color: "#e5c07b" }}>User</span>{" "}
            <span style={{ color: "#61afef" }}>getUser</span>(
            <span style={{ color: "#d19a66" }}>int</span> id);
            <br />
            &#125;
            <br />
            <br />
            <span style={{ color: "#c678dd" }}>class</span>{" "}
            <span style={{ color: "#e5c07b" }}>DatabaseRepo</span>{" "}
            <span style={{ color: "#c678dd" }}>implements</span>{" "}
            <span style={{ color: "#e5c07b" }}>IRepository</span> &#123;
            <br />
            &nbsp;&nbsp;
            <span style={{ color: "#7f848e" }}>
              {"//"} Implementation details hidden
            </span>
            <br />
            &#125;
          </div>
        </div>

        <p>
          The <strong>Stable Abstraction Principle</strong> states that a
          component should be as abstract as it is stable. It basically says
          that if a component is going to be hard to change, it better be
          abstract enough so that it can be extended easily.
        </p>
      </section>

      <section id="conclusion">
        <h2>Conclusion</h2>
        <p>
          Clean Architecture is not about following a strict template, but about
          understanding separation of concerns. By keeping the business logic
          agnostic of the UI and the Database, we create systems that are
          testable, maintainable, and robust.
        </p>
      </section>
    </article>
  );
}

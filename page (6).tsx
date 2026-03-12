"use client";

import { useState, useEffect, useRef } from "react";

const projects = [
  {
    title: "Research Portal",
    tagline: "One place for all your academic work.",
    year: "2024",
    role: "Full-Stack Dev",
    description:
      "A collaborative platform for organizing and sharing academic research papers across departments.",
    tags: ["NEXT.JS", "TYPESCRIPT", "SUPABASE", "UI DESIGN"],
  },
  {
    title: "StudySync",
    tagline: "Study together, anywhere.",
    year: "2024",
    role: "Frontend Dev",
    description:
      "A real-time study group app with shared notes, Pomodoro timers, and accountability features.",
    tags: ["REACT", "FIREBASE", "TAILWIND"],
  },
  {
    title: "CampusMap",
    tagline: "Find your way around campus.",
    year: "2023",
    role: "Mobile Dev",
    description:
      "An interactive campus navigation app with live event overlays and accessibility routing.",
    tags: ["REACT NATIVE", "MAPKIT", "NODE.JS"],
  },
  {
    title: "Budget Buddy",
    tagline: "Spend smarter as a student.",
    year: "2023",
    role: "Solo Developer",
    description:
      "A student expense tracker with smart categorization and monthly spending insights.",
    tags: ["VUE", "CHART.JS", "EXPRESS"],
  },
  {
    title: "Lecturely",
    tagline: "Never miss a detail from lecture.",
    year: "2022",
    role: "AI / Backend",
    description:
      "Auto-generates structured notes from lecture recordings using AI transcription and summarization.",
    tags: ["PYTHON", "OPENAI API", "WHISPER"],
  },
];

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visiblePanels, setVisiblePanels] = useState<Set<number>>(new Set());
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection observer — reveal each dark panel as it enters viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisiblePanels((prev) => new Set(prev).add(i));
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToProject = (i: number) => {
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#fff", color: "#111" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .nav-link { font-size: 0.875rem; color: #555; text-decoration: none; transition: color 0.15s; }
        .nav-link:hover { color: #111; }

        .hero-title {
          font-size: clamp(3.2rem, 7.5vw, 6rem);
          font-weight: 700; line-height: 1.04; letter-spacing: -0.035em; color: #111;
        }

        .section-label {
          font-size: 0.68rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: #aaa; font-weight: 500;
        }

        /* Project list rows */
        .proj-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 0; border-bottom: 1px solid #e8e8e8;
          cursor: pointer; background: none;
          border-left: none; border-right: none; border-top: none;
          width: 100%; text-align: left; transition: opacity 0.18s;
        }
        .proj-row:first-of-type { border-top: 1px solid #e8e8e8; }
        .proj-row.dimmed { opacity: 0.28; }
        .proj-row-title { font-size: 0.95rem; font-weight: 400; letter-spacing: -0.01em; color: #111; pointer-events: none; }
        .proj-arrow {
          font-size: 1rem; color: #111; opacity: 0;
          transform: translateX(-5px); transition: opacity 0.18s, transform 0.18s; pointer-events: none;
        }
        .proj-row:hover .proj-arrow { opacity: 1; transform: translateX(0); }

        /* Dark project panels */
        .dark-panel {
          width: 100%; background: #0a0a0a; min-height: 55vh;
          display: flex; align-items: center;
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .dark-panel.visible { opacity: 1; transform: translateY(0); }

        .panel-inner {
          max-width: 1200px; width: 100%; margin: 0 auto;
          padding: 3.5rem 2.5rem;
          display: flex; flex-direction: column; gap: 2.2rem;
        }

        .panel-counter { font-size: 0.72rem; letter-spacing: 0.1em; color: #555; }
        .panel-counter .total { color: #333; }

        .panel-title-row {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 3rem;
        }

        .panel-title {
          font-size: clamp(1.9rem, 4vw, 3rem); font-weight: 700;
          letter-spacing: -0.03em; line-height: 1.1; color: #fff;
        }
        .panel-title .dim { color: #444; font-weight: 400; }

        .panel-tags { display: flex; flex-direction: column; gap: 0.45rem; align-items: flex-end; flex-shrink: 0; }
        .panel-tag {
          font-size: 0.62rem; letter-spacing: 0.13em; color: #888;
          border: 1px solid #2a2a2a; border-radius: 999px; padding: 0.28rem 0.85rem; white-space: nowrap;
        }

        .panel-meta { display: flex; gap: 3rem; }
        .meta-col { display: flex; flex-direction: column; gap: 0.3rem; }
        .meta-label { font-size: 0.68rem; color: #444; letter-spacing: 0.06em; }
        .meta-value { font-size: 0.875rem; color: #bbb; }

        /* Divider between dark panels */
        .panel-divider { width: 100%; height: 1px; background: #1a1a1a; }

        /* Light sections */
        .content-grid {
          max-width: 1200px; margin: 0 auto;
          padding: 2.5rem 2.5rem 0;
          display: grid; grid-template-columns: 0.38fr 1fr; gap: 2rem;
          border-top: 1px solid #f0f0f0;
        }
        .body-text { font-size: 0.88rem; line-height: 1.78; color: #444; }

        .availability-dot {
          width: 7px; height: 7px; background: #22c55e;
          border-radius: 50%; display: inline-block; animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }

        @media (max-width: 768px) {
          .hero-two-col { flex-direction: column !important; gap: 3rem !important; }
          .right-col { width: 100% !important; }
          .panel-title-row { flex-direction: column; gap: 1.5rem; }
          .panel-tags { flex-direction: row; flex-wrap: wrap; align-items: flex-start; }
          .content-grid { grid-template-columns: 1fr; }
          .panel-meta { flex-wrap: wrap; gap: 1.5rem; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.35rem 2.5rem", borderBottom: "1px solid #f0f0f0",
        position: "sticky", top: 0, background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(8px)", zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, #d4b8f0, #b8d4f0)",
            fontSize: "0.62rem", display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: 700, color: "#6b21a8",
          }}>ES</div>
          <span style={{ fontSize: "0.95rem", fontWeight: 500, letterSpacing: "-0.02em" }}>eliza.</span>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="#about" className="nav-link">About</a>
          <a href="#works" className="nav-link">Works</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* HERO — full viewport height */}
      <div style={{
        minHeight: "calc(100vh - 57px)",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 2.5rem" }}>
          <div className="hero-two-col" style={{ display: "flex", alignItems: "center", gap: "4rem" }}>

            {/* Left */}
            <div style={{ flex: 1 }}>
              <h1 className="hero-title">I&apos;m Eliza<br />Sharma.</h1>
              <p style={{ marginTop: "2rem", fontSize: "1rem", lineHeight: 1.65, color: "#555", maxWidth: "400px", fontWeight: 300 }}>
                I build thoughtful digital products and love turning ideas into
                clean, functional experiences.{" "}
                <span style={{ color: "#111", fontWeight: 400 }}>Available for internships &amp; roles.</span>
              </p>
              <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "#777" }}>
                <span className="availability-dot" />
                Open to opportunities
              </div>
            </div>

            {/* Right — Project list */}
            <div className="right-col" style={{ width: "360px", flexShrink: 0 }}>
              <p className="section-label" style={{ marginBottom: "1.1rem" }}>Selected Projects</p>
              {projects.map((p, i) => (
                <button
                  key={i}
                  className={[
                    "proj-row",
                    hoveredIndex !== null && hoveredIndex !== i ? "dimmed" : "",
                  ].join(" ")}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => scrollToProject(i)}
                >
                  <span className="proj-row-title">{p.title}</span>
                  <span className="proj-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DARK PROJECT PANELS — scroll into view */}
      <div id="works">
        {projects.map((p, i) => (
          <div key={i}>
            <div
              ref={(el) => { panelRefs.current[i] = el; }}
              className={`dark-panel${visiblePanels.has(i) ? " visible" : ""}`}
            >
              <div className="panel-inner">
                {/* Counter */}
                <p className="panel-counter">
                  {String(i + 1).padStart(2, "0")}{" "}
                  <span className="total">/ {String(projects.length).padStart(2, "0")}</span>
                </p>

                {/* Title + Tags */}
                <div className="panel-title-row">
                  <h2 className="panel-title">
                    {p.title} <span className="dim">– {p.tagline}</span>
                  </h2>
                  <div className="panel-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="panel-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="panel-meta">
                  <div className="meta-col">
                    <span className="meta-label">Project</span>
                    <span className="meta-value">{p.title}</span>
                  </div>
                  <div className="meta-col">
                    <span className="meta-label">Role</span>
                    <span className="meta-value">{p.role}</span>
                  </div>
                  <div className="meta-col">
                    <span className="meta-label">Date</span>
                    <span className="meta-value">{p.year}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Thin divider between panels */}
            {i < projects.length - 1 && <div className="panel-divider" />}
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section id="about" style={{ paddingTop: "6rem" }}>
        {/* Bio */}
        <div className="content-grid">
          <p className="section-label" style={{ paddingTop: "0.1rem" }}>About</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <p className="body-text">
              I&apos;m a computer science student passionate about frontend development
              and product design. I enjoy working at the intersection of code and
              aesthetics — building things that feel as good as they function.
            </p>
            <p className="body-text">
              I&apos;m especially drawn to developer tooling, edtech, and anything that makes
              people&apos;s daily workflows more delightful. I love turning complex problems
              into interfaces that feel obvious in hindsight.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="content-grid" style={{ marginTop: "3rem" }}>
          <p className="section-label" style={{ paddingTop: "0.1rem" }}>Education</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              {
                degree: "B.Tech in Computer Science",
                school: "Your University Name",
                period: "2022 – Present",
                detail: "Relevant coursework: Data Structures, Web Development, HCI, Machine Learning, Database Systems.",
              },
              {
                degree: "Higher Secondary (Science)",
                school: "Your School Name",
                period: "Graduated 2022",
                detail: "Focused on Mathematics, Physics, and Computer Science.",
              },
            ].map((ed, i) => (
              <div key={i} style={{
                display: "flex", flexDirection: "column", gap: "0.3rem",
                paddingBottom: "1.25rem",
                borderBottom: i === 0 ? "1px solid #f0f0f0" : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#111" }}>{ed.degree}</span>
                  <span style={{ fontSize: "0.72rem", color: "#aaa", whiteSpace: "nowrap" }}>{ed.period}</span>
                </div>
                <span style={{ fontSize: "0.78rem", color: "#888" }}>{ed.school}</span>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#bbb", marginTop: "0.15rem" }}>{ed.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="content-grid" style={{ marginTop: "3rem" }}>
          <p className="section-label" style={{ paddingTop: "0.1rem" }}>Skills</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              {
                category: "Languages",
                items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
              },
              {
                category: "Frameworks & Libraries",
                items: ["React", "Next.js", "Vue", "Tailwind CSS", "Node.js", "Express"],
              },
              {
                category: "Tools & Platforms",
                items: ["Figma", "Git", "GitHub", "Supabase", "Firebase", "Vercel"],
              },
            ].map((group) => (
              <div key={group.category} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.7rem", color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {group.category}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {group.items.map((item) => (
                    <span key={item} style={{
                      fontSize: "0.78rem", padding: "0.3rem 0.75rem",
                      borderRadius: "999px", border: "1px solid #e8e8e8",
                      color: "#444", background: "#fafafa",
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <div className="content-grid">
          <p className="section-label" style={{ paddingTop: "0.1rem" }}>Contact</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p className="body-text">Always happy to chat about projects, internships, or ideas.</p>
            <a
              href="mailto:eliza@example.com"
              style={{
                width: "fit-content", fontSize: "0.9rem", color: "#111",
                textDecoration: "none", borderBottom: "1px solid #ccc",
                paddingBottom: "2px", transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#111")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#ccc")}
            >
              eliza@example.com
            </a>
            <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.25rem" }}>
              {["LinkedIn", "GitHub", "Resume"].map((l) => (
                <a key={l} href="#" style={{
                  fontSize: "0.75rem", color: "#aaa", textDecoration: "none", transition: "color 0.15s",
                }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#aaa")}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

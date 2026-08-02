import React from "react";
import { FiGithub } from "react-icons/fi";
/**
 * ModernTemplate (UPDATED - CLEAN UI)
 * - Better top spacing (fix sticky issue)
 * - Improved header hierarchy
 * - Modern skill pills
 * - Clean breathing layout
 */

const ModernTemplate = ({ data }) => {
  const { personalInfo, summary, skills, education, experience, projects } = data;

  const base = {
    fontFamily: "'Inter', 'Arial', sans-serif",
    fontSize: "10pt",
    color: "#1a1a1a",
    lineHeight: "1.6",
    backgroundColor: "#fff",
  };

  const sectionHeading = {
    fontSize: "9pt",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    margin: "0 0 6px 0",
    paddingBottom: "5px",
    borderBottom: "2px solid #111",
  };

  const jobTitle = { fontWeight: "700", fontSize: "10.5pt" };
  const meta = { fontSize: "9.5pt", color: "#555", whiteSpace: "nowrap" };

  return (
    <div
      id="pdf-wrapper"
      style={{
        ...base,
        width: "794px",
        minHeight: "1123px",
        padding: "60px 60px", // ✅ FIXED TOP SPACING
        margin: "0 auto",
        backgroundColor: "#fff",
      }}
    >
      {/* ───── HEADER ───── */}
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "24pt",
            fontWeight: "700",
            margin: "0 0 8px 0",
            letterSpacing: "-0.02em",
          }}
        >
          {personalInfo.name || "Your Name"}
        </h1>

        {/* CONTACT */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 18px",
            fontSize: "10pt",
            color: "#444",
          }}
        >
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "3px",
            background: "#111",
            marginTop: "14px",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* ───── SUMMARY ───── */}
      {summary && (
        <div style={{ marginBottom: "18px" }}>
          <h2 style={sectionHeading}>Profile</h2>
          <p style={{ margin: "6px 0 0 0" }}>{summary}</p>
        </div>
      )}

      {/* ───── SKILLS (IMPROVED UI) ───── */}
      {skills?.filter(Boolean).length > 0 && (
        <div style={{ marginBottom: "18px" }}>
          <h2 style={sectionHeading}>Technical Skills</h2>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {skills.map((s, i) => (
              <span
                key={i}
                style={{
                  fontSize: "9.5pt",
                  padding: "5px 12px",
                  borderRadius: "20px", // ✅ pill style
                  background: "#f4f4f4",
                  border: "1px solid #ddd",
                  fontWeight: "500",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ───── EXPERIENCE ───── */}
      {experience?.some((e) => e.company || e.title) && (
        <div style={{ marginBottom: "18px" }}>
          <h2 style={sectionHeading}>Experience</h2>

          {experience.map((exp, i) => (
            <div key={i} style={{ marginTop: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={jobTitle}>{exp.title}</span>
                  {exp.company && <span>, {exp.company}</span>}
                </div>

                <span style={meta}>
                  {[exp.startDate, exp.endDate].join(" – ")}
                </span>
              </div>

              {exp.bullets?.length > 0 && (
                <ul style={{ margin: "6px 0 0 18px" }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ───── EDUCATION ───── */}
      {education?.some((e) => e.institution) && (
        <div style={{ marginBottom: "18px" }}>
          <h2 style={sectionHeading}>Education</h2>

          {education.map((edu, i) => (
            <div
              key={i}
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={jobTitle}>{edu.institution}</div>
                <div style={{ fontSize: "9.5pt", color: "#555" }}>
                  {[edu.degree, edu.field].join(", ")}
                </div>
              </div>

              <span style={meta}>
                {[edu.startDate, edu.endDate].join(" – ")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ───── PROJECTS ───── */}
      {/* ───── PROJECTS (UPDATED MODERN UI) ───── */}
      {projects?.some((p) => p.name) && (
        <div>
          <h2 style={sectionHeading}>Projects</h2>

          {projects.map((proj, i) => (
            <div
              key={i}
              style={{
                marginTop: "14px",
                pageBreakInside: "avoid",
              }}
            >
              {/* Title */}
              <div style={{ fontSize: "11pt", fontWeight: "700" }}>
                {proj.name}
              </div>

              {/* Tech Stack */}
              {proj.tech && (
                <div
                  style={{
                    fontSize: "9.5pt",
                    color: "#555",
                    marginTop: "3px",
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Tech Stack:</span>{" "}
                  {proj.tech}
                </div>
              )}

              {/* GitHub Link with Icon */}
              {proj.link && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "4px",
                    fontSize: "9.5pt",
                    color: "#333",
                  }}
                >
                  <FiGithub size={14} />

                  <a
                    href={`https://${proj.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      wordBreak: "break-all",
                    }}
                  >
                    {proj.link}
                  </a>
                </div>
              )}

              {/* Description as bullets */}
              {proj.description && (
                <ul
                  style={{
                    margin: "6px 0 0 18px",
                    padding: 0,
                    listStyleType: "disc",
                  }}
                >
                  {proj.description.split(". ").map((point, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "9.5pt",
                        marginBottom: "4px",
                        lineHeight: "1.5",
                      }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
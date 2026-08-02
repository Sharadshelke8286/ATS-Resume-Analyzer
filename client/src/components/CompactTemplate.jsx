import React from "react";
import { FiGithub } from "react-icons/fi";
/**
 * CompactTemplate
 * Dark left sidebar (contact/skills/education) + white main content (experience/projects).
 * Fixed 794px — never responsive. pageBreakInside: avoid on entries.
 */
const CompactTemplate = ({ data }) => {
  const { personalInfo, summary, skills, education, experience, projects } = data;

  const base = {
    fontFamily: "'Arial', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: "9.5pt",
    color: "#1a1a1a",
    lineHeight: "1.45",
  };

  const sidebarHeading = {
    fontSize: "8.5pt",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#fff",
    margin: "0 0 5px 0",
    paddingBottom: "3px",
    borderBottom: "1px solid rgba(255,255,255,0.25)",
  };

  const mainHeading = {
    fontSize: "9pt",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.09em",
    color: "#1a1a1a",
    margin: "0 0 3px 0",
    paddingBottom: "3px",
    borderBottom: "1.5px solid #333",
  };

  const SIDEBAR_W = "215px";

  return (
    <div
      id="pdf-wrapper"
      style={{
        ...base,
        width: "794px",
        minHeight: "1123px",
        display: "flex",
        flexDirection: "row",
        margin: "0 auto",
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      {/* ── LEFT SIDEBAR ── */}
      <div
        style={{
          width: SIDEBAR_W,
          minWidth: SIDEBAR_W,
          maxWidth: SIDEBAR_W,
          backgroundColor: "#2d2d2d",
          padding: "36px 16px 36px 18px",
          boxSizing: "border-box",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {/* Name */}
        <div style={{ marginBottom: "22px", pageBreakInside: "avoid" }}>
          <h1 style={{ fontSize: "14pt", fontWeight: "700", color: "#fff", margin: 0, lineHeight: "1.25" }}>
            {personalInfo.name || "Your Name"}
          </h1>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: "18px", pageBreakInside: "avoid" }}>
          <h2 style={sidebarHeading}>Contact</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "6px" }}>
            {personalInfo.email && (
              <span style={{ fontSize: "8pt", color: "#ccc", wordBreak: "break-all", lineHeight: "1.4" }}>
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span style={{ fontSize: "8.5pt", color: "#ccc", lineHeight: "1.4" }}>
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <span style={{ fontSize: "7.5pt", color: "#aaa", wordBreak: "break-all", lineHeight: "1.4" }}>
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.github && (
              <span style={{ fontSize: "7.5pt", color: "#aaa", wordBreak: "break-all", lineHeight: "1.4" }}>
                {personalInfo.github}
              </span>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills?.filter(Boolean).length > 0 && (
          <div style={{ marginBottom: "18px", pageBreakInside: "avoid" }}>
            <h2 style={sidebarHeading}>Skills</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "6px" }}>
              {skills.filter(Boolean).map((s, i) => (
                <span key={i} style={{ fontSize: "9pt", color: "#ddd", lineHeight: "1.4" }}>
                  • {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education?.some((e) => e.institution || e.degree) && (
          <div style={{ pageBreakInside: "avoid" }}>
            <h2 style={sidebarHeading}>Education</h2>
            <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {education.map((edu, i) => (
                <div key={i} style={{ pageBreakInside: "avoid" }}>
                  <div style={{ fontWeight: "700", fontSize: "8.5pt", color: "#fff", lineHeight: "1.3" }}>
                    {edu.institution}
                  </div>
                  {(edu.degree || edu.field) && (
                    <div style={{ fontSize: "8pt", color: "#bbb", lineHeight: "1.4", marginTop: "1px" }}>
                      {[edu.degree, edu.field].filter(Boolean).join(", ")}
                    </div>
                  )}
                  <div style={{ fontSize: "7.5pt", color: "#999", lineHeight: "1.4", marginTop: "1px" }}>
                    {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                    {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: "36px 26px 36px 22px",
          boxSizing: "border-box",
          backgroundColor: "#fff",
        }}
      >
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: "15px", pageBreakInside: "avoid" }}>
            <h2 style={mainHeading}>Profile</h2>
            <p style={{ margin: "5px 0 0 0", fontSize: "9.5pt", lineHeight: "1.5" }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience?.some((e) => e.company || e.title) && (
          <div style={{ marginBottom: "15px" }}>
            <h2 style={mainHeading}>Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginTop: "10px", pageBreakInside: "avoid" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "6px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: "700", fontSize: "10pt" }}>{exp.title}</span>
                    {exp.company && <span style={{ fontSize: "9.5pt" }}> · {exp.company}</span>}
                  </div>
                  <span style={{ fontSize: "8.5pt", color: "#555", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </span>
                </div>
                {exp.bullets?.filter(Boolean).length > 0 && (
                  <ul style={{ margin: "3px 0 0 14px", padding: 0, listStyleType: "disc" }}>
                    {exp.bullets.filter(Boolean).map((b, bi) => (
                      <li key={bi} style={{ fontSize: "9pt", marginBottom: "2px", lineHeight: "1.4" }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}

{projects?.some((p) => p.name) && (
  <div style={{ marginBottom: "14px" }}>
    <h2 style={mainHeading}>Projects</h2>

    {projects.map((proj, i) =>
      proj.name ? (
        <div
          key={i}
          style={{
            marginTop: "12px",
            pageBreakInside: "avoid",
          }}
        >
          {/* Project Title */}
          <div
            style={{
              fontWeight: "700",
              fontSize: "10.5pt",
              marginBottom: "4px",
            }}
          >
            {proj.name}
          </div>

          {/* Tech Stack */}
          {proj.tech && (
            <div
              style={{
                fontSize: "9pt",
                color: "#555",
                marginBottom: "3px",
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
                fontSize: "9pt",
                color: "#333",
                marginBottom: "5px",
                wordBreak: "break-all",
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
                margin: "4px 0 0 16px",
                padding: 0,
                listStyleType: "disc",
              }}
            >
              {proj.description.split(". ").map((point, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: "9pt",
                    marginBottom: "3px",
                    lineHeight: "1.4",
                  }}
                >
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null
    )}
  </div>
)}
      </div>
    </div>
  );
};

export default CompactTemplate;
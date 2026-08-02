import React from "react";

/**
 * StandardTemplate (Improved)
 * - Clean spacing (header + sections)
 * - Proper separator rendering
 * - ATS-friendly layout
 */

const Divider = () => (
  <hr
    style={{
      border: "none",
      borderTop: "1.5px solid #000",
      margin: "6px 0 10px 0", // FIXED spacing
    }}
  />
);

const SectionHeading = ({ children }) => (
  <div style={{ marginBottom: "3px", pageBreakInside: "avoid" }}>
    <h2
      style={{
        fontSize: "11pt",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        color: "#000",
        margin: 0,
        lineHeight: "1.3",
      }}
    >
      {children}
    </h2>
    <Divider />
  </div>
);

const StandardTemplate = ({ data }) => {
  const { personalInfo, summary, skills, education, experience, projects } =
    data;

  const base = {
    fontFamily: "'Times New Roman', Times, serif",
    fontSize: "10.5pt",
    color: "#000",
    lineHeight: "1.45",
    backgroundColor: "#fff",
  };



  return (
    <div
      id="pdf-wrapper"
      style={{
        ...base,
        width: "794px",
        minHeight: "1123px",
        padding: "52px 56px",
        boxSizing: "border-box",
        margin: "0 auto",
        backgroundColor: "#fff",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px", // improved spacing
          pageBreakInside: "avoid",
        }}
      >
        <h1
          style={{
            fontSize: "20pt",
            fontWeight: "700",
         margin: "0 0 10px 0",
            color: "#000",
            letterSpacing: "0.03em",
            lineHeight: "1.2",
          }}
        >
          {personalInfo.name || "Your Name"}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            fontSize: "9.5pt",
            color: "#222",
            marginTop: "4px",
            lineHeight: "1.4",
          }}
        >
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.linkedin,
            personalInfo.github,
          ]
            .filter(Boolean)
            .map((item, index, arr) => (
              <span key={index} style={{ display: "flex", alignItems: "center" }}>
                {item}
                {index !== arr.length - 1 && (
                  <span style={{ margin: "0 8px", color: "#555" }}>|</span>
                )}
              </span>
            ))}
        </div>
      </div>

      {/* ── Summary ── */}
      {summary && (
        <div style={{ marginBottom: "14px", pageBreakInside: "avoid" }}>
          <SectionHeading>Summary</SectionHeading>
          <p style={{ margin: "5px 0 0 0", fontSize: "10pt", lineHeight: "1.5" }}>
            {summary}
          </p>
        </div>
      )}

      {/* ── Skills ── */}
      {skills?.filter(Boolean).length > 0 && (
        <div style={{ marginBottom: "14px", pageBreakInside: "avoid" }}>
          <SectionHeading>Skills</SectionHeading>
          <p style={{ margin: "5px 0 0 0", fontSize: "10pt", lineHeight: "1.5" }}>
            {skills.filter(Boolean).join(" • ")}
          </p>
        </div>
      )}

      {/* ── Experience ── */}
      {experience?.some((e) => e.company || e.title) && (
        <div style={{ marginBottom: "14px" }}>
          <SectionHeading>Experience</SectionHeading>
          {experience.map((exp, i) => (
            <div
              key={i}
              style={{ marginBottom: "11px", pageBreakInside: "avoid" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: "700", fontSize: "10.5pt" }}>
                    {exp.title}
                  </span>
                  {exp.company && (
                    <span style={{ fontSize: "10.5pt" }}>
                      {" "}
                      — {exp.company}
                    </span>
                  )}
                </div>

                <span
                  style={{
                    fontSize: "10pt",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                  {exp.location && ` | ${exp.location}`}
                </span>
              </div>

              {exp.bullets?.filter(Boolean).length > 0 && (
                <ul
                  style={{
                    margin: "4px 0 0 20px",
                    padding: 0,
                  }}
                >
                  {exp.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      style={{
                        fontSize: "10pt",
                        marginBottom: "3px",
                        lineHeight: "1.4",
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Education ── */}
      {education?.some((e) => e.institution || e.degree) && (
        <div style={{ marginBottom: "14px" }}>
          <SectionHeading>Education</SectionHeading>
          {education.map((edu, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "9px",
                pageBreakInside: "avoid",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "700", fontSize: "10.5pt" }}>
                  {edu.institution}
                </div>
                <div style={{ fontSize: "10pt" }}>
                  {[edu.degree, edu.field].filter(Boolean).join(", ")}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </div>
              </div>

              <span
                style={{
                  fontSize: "10pt",
                  whiteSpace: "nowrap",
                  marginLeft: "12px",
                }}
              >
                {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Projects ── */}
      {/* ── Projects (ATS CLEAN FORMAT) ── */}
      {projects?.some((p) => p.name) && (
        <div style={{ marginBottom: "14px" }}>
          <SectionHeading>Projects</SectionHeading>

          {projects.map((proj, i) =>
            proj.name ? (
              <div
                key={i}
                style={{ marginBottom: "10px", pageBreakInside: "avoid" }}
              >
                {/* Title */}
                <div style={{ fontSize: "10.5pt", fontWeight: "700" }}>
                  {proj.name}
                </div>

                {/* Tech */}
                {proj.tech && (
                  <div style={{ fontSize: "10pt", marginTop: "2px" }}>
                    {proj.tech}
                  </div>
                )}

                {/* Link (clean + clickable) */}
                {proj.link && (
                  <div style={{ fontSize: "9.5pt", marginTop: "2px" }}>
                    <a
                      href={`https://${proj.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#000",
                        textDecoration: "none",
                      }}
                    >
                      {proj.link}
                    </a>
                  </div>
                )}

                {/* Description */}
                {proj.description && (
                  <p style={{ margin: "3px 0 0 0", fontSize: "10pt" }}>
                    {proj.description}
                  </p>
                )}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default StandardTemplate;
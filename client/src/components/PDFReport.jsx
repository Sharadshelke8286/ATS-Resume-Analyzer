// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const COLORS = ["#6366f1", "#ef4444"];

// const ScoreRingStatic = ({ score, dark }) => {
//   const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";
//   const label = score >= 70 ? "Strong Match" : score >= 40 ? "Moderate Match" : "Low Match";
//   const r = 54;
//   const circ = 2 * Math.PI * r;
//   const offset = circ - (score / 100) * circ;

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <div style={{ position: "relative", width: 140, height: 140 }}>
//         <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
//           <circle cx="70" cy="70" r={r} fill="none"
//             stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} strokeWidth="10" />
//           <circle cx="70" cy="70" r={r} fill="none"
//             stroke={color} strokeWidth="10"
//             strokeDasharray={circ} strokeDashoffset={offset}
//             strokeLinecap="round" />
//         </svg>
//         <div style={{
//           position: "absolute", inset: 0,
//           display: "flex", flexDirection: "column",
//           alignItems: "center", justifyContent: "center"
//         }}>
//           <span style={{ fontSize: 28, fontWeight: 700, color }}>{score}%</span>
//           <span style={{ fontSize: 10, color: dark ? "#94a3b8" : "#64748b", marginTop: 2 }}>ATS Score</span>
//         </div>
//       </div>
//       <span style={{
//         marginTop: 10, fontSize: 12, fontWeight: 600,
//         padding: "4px 14px", borderRadius: 20,
//         color, background: `${color}20`,
//         border: `1px solid ${color}40`
//       }}>{label}</span>
//     </div>
//   );
// };

// export default function PDFReport({ data, dark }) {
//   const bg = dark ? "#0f172a" : "#ffffff";
//   const cardBg = dark ? "#1e293b" : "#f8fafc";
//   const border = dark ? "#334155" : "#e2e8f0";
//   const text = dark ? "#f1f5f9" : "#0f172a";
//   const textMuted = dark ? "#94a3b8" : "#64748b";
//   const textSub = dark ? "#cbd5e1" : "#374151";

//   const pieData = [
//     { name: "Matched", value: data.matchedKeywords?.length || 0 },
//     { name: "Missing", value: data.missingKeywords?.length || 0 },
//   ];

//   const categories = {
//     "Frontend": ["react", "vue", "angular", "html", "css", "typescript", "javascript", "nextjs"],
//     "Backend": ["node", "express", "python", "java", "spring", "django", "flask", "php"],
//     "Database": ["mongodb", "mysql", "postgresql", "redis", "firebase", "sql"],
//     "DevOps": ["docker", "kubernetes", "aws", "azure", "gcp", "git", "ci", "cd"],
//   };

//   const barData = Object.entries(categories).map(([cat, skills]) => ({
//     name: cat,
//     matched: skills.filter(s => data.matchedKeywords?.includes(s)).length,
//     missing: skills.filter(s => data.missingKeywords?.includes(s)).length,
//   })).filter(d => d.matched + d.missing > 0);

//   const sectionIcons = { experience: "💼", skills: "⚡", projects: "🚀", education: "🎓" };

//   const sectionBorder = (text) => {
//     if (!text || text === "N/A" || text === "AI analysis unavailable") return "#6366f1";
//     const t = text.toLowerCase();
//     if (t.includes("good") || t.includes("strong") || t.includes("excellent")) return "#22c55e";
//     if (t.includes("improve") || t.includes("add") || t.includes("missing") || t.includes("need")) return "#f59e0b";
//     return "#6366f1";
//   };

//   const s = (overrides) => ({ ...overrides });

//   return (
//     <div id="pdf-report-content" style={{
//       background: bg,
//       color: text,
//       fontFamily: "'Segoe UI', Arial, sans-serif",
//       padding: "32px",
//       minWidth: 794,
//       maxWidth: 794,
//     }}>

//       {/* Header */}
//       <div style={{
//         display: "flex", justifyContent: "space-between",
//         alignItems: "center", marginBottom: 28,
//         paddingBottom: 20,
//         borderBottom: `2px solid ${dark ? "#6366f1" : "#6366f1"}`,
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <div style={{
//             width: 40, height: 40, borderRadius: 10,
//             background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             color: "#fff", fontWeight: 700, fontSize: 18
//           }}>A</div>
//           <div>
//             <div style={{ fontSize: 20, fontWeight: 700, color: "#6366f1" }}>ATS Analyzer</div>
//             <div style={{ fontSize: 11, color: textMuted }}>Resume Analysis Report</div>
//           </div>
//         </div>
//         <div style={{ textAlign: "right" }}>
//           <div style={{ fontSize: 12, color: textMuted }}>Generated on</div>
//           <div style={{ fontSize: 13, fontWeight: 600, color: text }}>
//             {new Date(data.createdAt).toLocaleDateString("en-IN", {
//               day: "numeric", month: "long", year: "numeric"
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Score + Pie Row */}
//       <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>

//         {/* Score Card */}
//         <div style={{
//           flex: 1, background: cardBg,
//           borderRadius: 16, border: `1px solid ${border}`,
//           padding: "24px 20px",
//           display: "flex", flexDirection: "column", alignItems: "center",
//           gap: 16
//         }}>
//           <ScoreRingStatic score={data.score} dark={dark} />
//           <div style={{
//             display: "flex", gap: 24,
//             borderTop: `1px solid ${border}`,
//             paddingTop: 14, width: "100%", justifyContent: "center"
//           }}>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: 11, color: textMuted }}>Rule Score</div>
//               <div style={{ fontSize: 18, fontWeight: 700, color: text }}>{data.ruleScore || "—"}%</div>
//             </div>
//             <div style={{ width: 1, background: border }} />
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: 11, color: textMuted }}>AI Score</div>
//               <div style={{ fontSize: 18, fontWeight: 700, color: text }}>{data.aiScore || "—"}%</div>
//             </div>
//           </div>
//         </div>

//         {/* Pie Chart Card */}
//         <div style={{
//           flex: 1.4, background: cardBg,
//           borderRadius: 16, border: `1px solid ${border}`,
//           padding: "20px"
//         }}>
//           <div style={{ fontSize: 14, fontWeight: 600, color: text, marginBottom: 8 }}>
//             Skill Match Overview
//           </div>
//         <div style={{
//   display: "flex",
//   justifyContent: "center",
//   gap: 20,
//   marginTop: 20
// }}>
//   <div style={{
//     padding: "10px 16px",
//     borderRadius: 10,
//     background: "rgba(99,102,241,0.1)",
//     border: "1px solid rgba(99,102,241,0.3)",
//     color: "#6366f1",
//     fontWeight: 600
//   }}>
//     Matched: {data.matchedKeywords?.length || 0}
//   </div>

//   <div style={{
//     padding: "10px 16px",
//     borderRadius: 10,
//     background: "rgba(239,68,68,0.1)",
//     border: "1px solid rgba(239,68,68,0.3)",
//     color: "#ef4444",
//     fontWeight: 600
//   }}>
//     Missing: {data.missingKeywords?.length || 0}
//   </div>
// </div>
//           <div style={{ display: "flex", justifyContent: "center", gap: 20, fontSize: 12, marginTop: 4 }}>
//             <span style={{ display: "flex", alignItems: "center", gap: 6, color: textSub }}>
//               <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
//               Matched ({data.matchedKeywords?.length || 0})
//             </span>
//             <span style={{ display: "flex", alignItems: "center", gap: 6, color: textSub }}>
//               <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
//               Missing ({data.missingKeywords?.length || 0})
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Bar Chart */}
//       {barData.length > 0 && (
//         <div style={{
//           background: cardBg, borderRadius: 16,
//           border: `1px solid ${border}`,
//           padding: "20px", marginBottom: 20
//         }}>
//           <div style={{ fontSize: 14, fontWeight: 600, color: text, marginBottom: 12 }}>
//             Skills by Category
//           </div>
//     <div style={{ marginTop: 10 }}>
//   {barData.map((item) => (
//     <div key={item.name} style={{ marginBottom: 10 }}>
//       <div style={{ fontSize: 12, marginBottom: 4 }}>{item.name}</div>

//       <div style={{ display: "flex", gap: 6 }}>
//         <div style={{
//           height: 8,
//           width: `${item.matched * 20}px`,
//           background: "#6366f1",
//           borderRadius: 4
//         }} />
//         <div style={{
//           height: 8,
//           width: `${item.missing * 20}px`,
//           background: "#ef4444",
//           borderRadius: 4
//         }} />
//       </div>
//     </div>
//   ))}
// </div>
//         </div>
//       )}

//       {/* Keywords */}
//       <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
//         {/* Matched */}
//         <div style={{
//           flex: 1, background: cardBg,
//           borderRadius: 16, border: `1px solid ${border}`,
//           padding: "18px"
//         }}>
//           <div style={{
//             fontSize: 13, fontWeight: 600, color: text,
//             marginBottom: 12, display: "flex", alignItems: "center", gap: 8
//           }}>
//             <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
//             Strong Skills ({data.matchedKeywords?.length || 0})
//           </div>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//             {data.matchedKeywords?.map((k) => (
//               <span key={k} style={{
//                 padding: "3px 10px", borderRadius: 8, fontSize: 11, fontWeight: 500,
//                 background: "rgba(34,197,94,0.1)",
//                 border: "1px solid rgba(34,197,94,0.25)",
//                 color: "#22c55e"
//               }}>✓ {k}</span>
//             ))}
//           </div>
//         </div>

//         {/* Missing */}
//         <div style={{
//           flex: 1, background: cardBg,
//           borderRadius: 16, border: `1px solid ${border}`,
//           padding: "18px"
//         }}>
//           <div style={{
//             fontSize: 13, fontWeight: 600, color: text,
//             marginBottom: 12, display: "flex", alignItems: "center", gap: 8
//           }}>
//             <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
//             Missing Skills ({data.missingKeywords?.length || 0})
//           </div>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//             {data.missingKeywords?.map((k) => (
//               <span key={k} style={{
//                 padding: "3px 10px", borderRadius: 8, fontSize: 11, fontWeight: 500,
//                 background: "rgba(239,68,68,0.1)",
//                 border: "1px solid rgba(239,68,68,0.25)",
//                 color: "#ef4444"
//               }}>+ {k}</span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* AI Suggestions */}
//       <div style={{
//         background: cardBg, borderRadius: 16,
//         border: `1px solid ${border}`,
//         padding: "20px", marginBottom: 20
//       }}>
//         <div style={{ fontSize: 14, fontWeight: 600, color: text, marginBottom: 14 }}>
//           💡 AI Suggestions
//         </div>
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {data.aiSuggestions?.map((s, i) => (
//             <div key={i} style={{
//               display: "flex", gap: 12, alignItems: "flex-start",
//               padding: "12px 14px", borderRadius: 10,
//               background: dark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.05)",
//               border: `1px solid ${dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.15)"}`,
//             }}>
//               <span style={{
//                 minWidth: 24, height: 24, borderRadius: 6,
//                 background: "rgba(99,102,241,0.2)",
//                 border: "1px solid rgba(99,102,241,0.3)",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 fontSize: 11, fontWeight: 700, color: "#6366f1"
//               }}>{i + 1}</span>
//               <span style={{ fontSize: 12, color: textSub, lineHeight: 1.6 }}>{s}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Section Feedback */}
//       <div style={{
//         background: cardBg, borderRadius: 16,
//         border: `1px solid ${border}`,
//         padding: "20px", marginBottom: 20
//       }}>
//         <div style={{ fontSize: 14, fontWeight: 600, color: text, marginBottom: 14 }}>
//           📋 Section Feedback
//         </div>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//           {data.sectionFeedback && Object.entries(data.sectionFeedback).map(([key, val]) => (
//             <div key={key} style={{
//               padding: "14px", borderRadius: 10,
//               background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
//               border: `1px solid ${border}`,
//               borderLeft: `4px solid ${sectionBorder(val)}`,
//             }}>
//               <div style={{
//                 display: "flex", alignItems: "center",
//                 gap: 6, marginBottom: 6
//               }}>
//                 <span style={{ fontSize: 14 }}>{sectionIcons[key]}</span>
//                 <span style={{
//                   fontSize: 10, fontWeight: 700,
//                   textTransform: "uppercase", letterSpacing: "0.08em",
//                   color: "#6366f1"
//                 }}>{key}</span>
//               </div>
//               <p style={{ fontSize: 11, color: textSub, lineHeight: 1.6, margin: 0 }}>{val}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Resume Quality Check */}
//       <div style={{
//         background: cardBg, borderRadius: 16,
//         border: `1px solid ${border}`,
//         padding: "20px", marginBottom: 20
//       }}>
//         <div style={{ fontSize: 14, fontWeight: 600, color: text, marginBottom: 14 }}>
//           🤖 Resume Quality Check
//         </div>
//         <div style={{ display: "flex", gap: 12 }}>
//           <div style={{
//             flex: 1, display: "flex", alignItems: "center", gap: 10,
//             padding: "12px 14px", borderRadius: 10,
//             background: !data.atsCheck?.hasTables ? "rgba(34,197,94,0.08)" : "rgba(245,158,11,0.08)",
//             border: `1px solid ${!data.atsCheck?.hasTables ? "rgba(34,197,94,0.25)" : "rgba(245,158,11,0.25)"}`,
//           }}>
//             <span style={{ fontSize: 18 }}>{!data.atsCheck?.hasTables ? "✅" : "⚠️"}</span>
//             <div>
//               <div style={{
//                 fontSize: 12, fontWeight: 600,
//                 color: !data.atsCheck?.hasTables ? "#22c55e" : "#f59e0b"
//               }}>
//                 {!data.atsCheck?.hasTables ? "No formatting issues" : "Table formatting detected"}
//               </div>
//               <div style={{ fontSize: 10, color: textMuted, marginTop: 2 }}>
//                 {!data.atsCheck?.hasTables ? "ATS can read your resume easily" : "Tables may confuse ATS systems"}
//               </div>
//             </div>
//           </div>
//           <div style={{
//             flex: 1, display: "flex", alignItems: "center", gap: 10,
//             padding: "12px 14px", borderRadius: 10,
//             background: data.atsCheck?.properSections ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
//             border: `1px solid ${data.atsCheck?.properSections ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
//           }}>
//             <span style={{ fontSize: 18 }}>{data.atsCheck?.properSections ? "✅" : "❌"}</span>
//             <div>
//               <div style={{
//                 fontSize: 12, fontWeight: 600,
//                 color: data.atsCheck?.properSections ? "#22c55e" : "#ef4444"
//               }}>
//                 {data.atsCheck?.properSections ? "All key sections present" : "Missing key sections"}
//               </div>
//               <div style={{ fontSize: 10, color: textMuted, marginTop: 2 }}>
//                 {data.atsCheck?.properSections ? "Experience & Skills sections found" : "Add Experience and Skills sections"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div style={{
//         borderTop: `1px solid ${border}`,
//         paddingTop: 16, marginTop: 8,
//         display: "flex", justifyContent: "space-between",
//         alignItems: "center"
//       }}>
//         <span style={{ fontSize: 11, color: textMuted }}>Generated by ATS Analyzer</span>
//         <span style={{ fontSize: 11, color: textMuted }}>
//           Score: {data.score}% · {data.matchedKeywords?.length} matched · {data.missingKeywords?.length} missing
//         </span>
//       </div>
//     </div>
//   );
// }

import React from "react";

const normalize = (arr) =>
  [...new Set((arr || []).filter(Boolean).map((s) => s.trim().toLowerCase()))];

export default function PDFReport({ data }) {
  const matched = normalize(data.matchedKeywords);
  const missing = normalize(data.missingKeywords);
  const score = data.score || 0;

  const categories = {
    Frontend: ["react", "html", "css", "javascript", "typescript"],
    Backend: ["node", "express", "java", "python"],
    Database: ["mongodb", "mysql", "sql"],
    DevOps: ["docker", "aws", "git"],
  };

  const barData = Object.entries(categories).map(([cat, skills]) => ({
    name: cat,
    matched: skills.filter((s) => matched.includes(s)).length,
    missing: skills.filter((s) => missing.includes(s)).length,
  }));

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", color: "#111" }}>
      
      {/* HEADER */}
      <h1 style={{ fontSize: "28px", color: "#4f46e5", marginBottom: "5px" }}>
        ATS Resume Analysis Report
      </h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Generated on {new Date().toLocaleDateString()}
      </p>

      {/* SCORE */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Overall Score</h2>
        <p style={{ fontSize: "40px", fontWeight: "bold", color: "#4f46e5" }}>
          {score}%
        </p>
      </div>

      {/* SUMMARY */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Summary</h2>
        <p>
          Your resume matched <b>{matched.length}</b> keywords and missed{" "}
          <b>{missing.length}</b> important keywords.
        </p>
      </div>

      {/* MATCHED */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "green" }}>
          Matched Skills ({matched.length})
        </h3>
        <div>
          {matched.map((k) => (
            <span
              key={k}
              style={{
                display: "inline-block",
                margin: "5px",
                padding: "5px 10px",
                background: "#e6f9ec",
                borderRadius: "5px",
              }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* MISSING */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "red" }}>
          Missing Skills ({missing.length})
        </h3>
        <div>
          {missing.map((k) => (
            <span
              key={k}
              style={{
                display: "inline-block",
                margin: "5px",
                padding: "5px 10px",
                background: "#ffe6e6",
                borderRadius: "5px",
              }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Category Breakdown</h2>

        {barData.map((item) => {
          const total = item.matched + item.missing;
          const percent = total
            ? Math.round((item.matched / total) * 100)
            : 0;

          return (
            <div key={item.name} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{item.name}</span>
                <span>{percent}%</span>
              </div>

              <div
                style={{
                  height: "8px",
                  background: "#eee",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    width: `${percent}%`,
                    height: "8px",
                    background: "#4f46e5",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Suggestions */}
      {data.aiSuggestions?.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h2>AI Suggestions</h2>
          <ul>
            {data.aiSuggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SECTION FEEDBACK */}
      {data.sectionFeedback && (
        <div style={{ marginBottom: "20px" }}>
          <h2>Section Feedback</h2>
          {Object.entries(data.sectionFeedback).map(([k, v]) => (
            <p key={k}>
              <b>{k}:</b> {v}
            </p>
          ))}
        </div>
      )}

      {/* FINAL TIPS */}
      <div>
        <h2>Recommendations</h2>
        <ul>
          <li>Add missing keywords naturally</li>
          <li>Use measurable achievements</li>
          <li>Keep ATS-friendly formatting</li>
          <li>Avoid tables and complex layouts</li>
        </ul>
      </div>
    </div>
  );
}
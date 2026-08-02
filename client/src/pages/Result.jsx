// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import RoadmapCard from "../components/RoadmapCard";
// import {
//   CheckCircle, AlertTriangle, BarChart3, Cpu, Scale,
//   Download, Plus, ChevronRight, Star, Zap, BookOpen,
//   ArrowRight, TrendingUp, Target, Award, Clock, ExternalLink,
//   ChevronDown, ChevronUp, Play, Layers, Code2, Database,
//   Globe, Server, GitBranch, Lightbulb, Sparkles
// } from "lucide-react";
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from "recharts";
// import api from "../utils/api";
// import Navbar from "../components/Navbar";
// import useThemeStore from "../store/themeStore";
// import PDFReport from "../components/PDFReport";

// // ─── Theme tokens ──────────────────────────────────────────────────────────────
// const themes = {
//   dark: {
//     bg: "#080C14",
//     bgCard: "rgba(13,18,30,0.85)",
//     bgCardHover: "rgba(20,27,45,0.9)",
//     bgInput: "rgba(255,255,255,0.04)",
//     border: "rgba(255,255,255,0.07)",
//     borderHover: "rgba(124,58,237,0.45)",
//     text: "#F1F5F9",
//     textSub: "rgba(255,255,255,0.5)",
//     textMuted: "rgba(255,255,255,0.25)",
//     gridLine: "rgba(255,255,255,0.015)",
//     shadow: "0 8px 48px rgba(0,0,0,0.55)",
//     glow1: "rgba(124,58,237,0.14)",
//     glow2: "rgba(6,182,212,0.09)",
//     glow3: "rgba(20,184,166,0.07)",
//     pillBg: "rgba(124,58,237,0.12)",
//     pillBorder: "rgba(124,58,237,0.25)",
//     pillColor: "#A78BFA",
//     chipTrack: "rgba(255,255,255,0.04)",
//     tickColor: "rgba(255,255,255,0.06)",
//     tooltipBg: "#0d1117",
//     tooltipBorder: "rgba(255,255,255,0.1)",
//     inset: "inset 0 1px 0 rgba(255,255,255,0.05)",
//     backdrop: "blur(24px)",
//     roadmapBg: "rgba(255,255,255,0.02)",
//     roadmapBorder: "rgba(255,255,255,0.06)",
//     roadmapHover: "rgba(255,255,255,0.04)",
//     levelBeginner:    { bg: "rgba(20,184,166,0.08)",  border: "rgba(20,184,166,0.2)",  color: "#14B8A6", dot: "#14B8A6" },
//     levelIntermediate:{ bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)",  color: "#F59E0B", dot: "#F59E0B" },
//     levelAdvanced:    { bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.2)",   color: "#F43F5E", dot: "#F43F5E" },
//     levelVideo:       { bg: "rgba(124,58,237,0.08)",  border: "rgba(124,58,237,0.2)",  color: "#A78BFA", dot: "#7C3AED" },
//   },
//   light: {
//     bg: "#F0F4FF",
//     bgCard: "rgba(255,255,255,0.9)",
//     bgCardHover: "rgba(255,255,255,1)",
//     bgInput: "rgba(0,0,0,0.03)",
//     border: "rgba(0,0,0,0.08)",
//     borderHover: "rgba(124,58,237,0.4)",
//     text: "#0F172A",
//     textSub: "rgba(15,23,42,0.6)",
//     textMuted: "rgba(15,23,42,0.35)",
//     gridLine: "rgba(0,0,0,0.04)",
//     shadow: "0 8px 48px rgba(100,100,150,0.12)",
//     glow1: "rgba(124,58,237,0.08)",
//     glow2: "rgba(6,182,212,0.06)",
//     glow3: "rgba(20,184,166,0.05)",
//     pillBg: "rgba(124,58,237,0.08)",
//     pillBorder: "rgba(124,58,237,0.2)",
//     pillColor: "#7C3AED",
//     chipTrack: "rgba(0,0,0,0.05)",
//     tickColor: "rgba(0,0,0,0.06)",
//     tooltipBg: "#ffffff",
//     tooltipBorder: "rgba(0,0,0,0.1)",
//     inset: "inset 0 1px 0 rgba(255,255,255,0.8)",
//     backdrop: "blur(24px)",
//     roadmapBg: "rgba(0,0,0,0.02)",
//     roadmapBorder: "rgba(0,0,0,0.07)",
//     roadmapHover: "rgba(0,0,0,0.035)",
//     // ✅ FIXED: these were commented out — caused the crash
//     levelBeginner:    { bg: "rgba(20,184,166,0.07)",  border: "rgba(20,184,166,0.25)", color: "#0D9488", dot: "#14B8A6" },
//     levelIntermediate:{ bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.25)", color: "#D97706", dot: "#F59E0B" },
//     levelAdvanced:    { bg: "rgba(244,63,94,0.07)",   border: "rgba(244,63,94,0.25)",  color: "#E11D48", dot: "#F43F5E" },
//     levelVideo:       { bg: "rgba(124,58,237,0.07)",  border: "rgba(124,58,237,0.25)", color: "#7C3AED", dot: "#7C3AED" },
//   },
// };

// // ─── Animated Number ───────────────────────────────────────────────────────────
// function AnimNumber({ value, suffix = "" }) {
//   const [n, setN] = useState(0);
//   useEffect(() => {
//     let cur = 0;
//     const target = parseInt(value) || 0;
//     const step = Math.ceil(target / 30);
//     const interval = setInterval(() => {
//       cur = Math.min(cur + step, target);
//       setN(cur);
//       if (cur >= target) clearInterval(interval);
//     }, 25);
//     return () => clearInterval(interval);
//   }, [value]);
//   return <>{n}{suffix}</>;
// }

// // ─── Score Ring ────────────────────────────────────────────────────────────────
// const ScoreRing = ({ score, t }) => {
//   const [animated, setAnimated] = useState(0);
//   const r = 88;
//   const circ = 2 * Math.PI * r;
//   const color = score >= 70 ? "#14B8A6" : score >= 40 ? "#F59E0B" : "#F43F5E";
//   const glow = score >= 70
//     ? "0 0 60px rgba(20,184,166,0.4)"
//     : score >= 40 ? "0 0 60px rgba(245,158,11,0.4)"
//     : "0 0 60px rgba(244,63,94,0.4)";
//   const label = score >= 70 ? "Strong Match" : score >= 40 ? "Moderate Match" : "Low Match";

//   useEffect(() => {
//     const timer = setTimeout(() => setAnimated(score), 400);
//     return () => clearTimeout(timer);
//   }, [score]);

//   return (
//     <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
//       {/* Outer glow ring */}
//       <div style={{
//         position: "absolute", inset: "-24px", borderRadius: "50%",
//         background: `radial-gradient(circle, ${color}28 0%, transparent 68%)`,
//         filter: "blur(18px)", pointerEvents: "none",
//       }} />
//       <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: "rotate(-90deg)", display: "block" }}>
//         {/* Track */}
//         <circle cx="110" cy="110" r={r} fill="none" stroke={t.chipTrack} strokeWidth="16" />
//         {/* Tick marks */}
//         {Array.from({ length: 48 }).map((_, i) => {
//           const angle = (i / 48) * 360;
//           const rad = (angle * Math.PI) / 180;
//           const x1 = 110 + (r - 9) * Math.cos(rad);
//           const y1 = 110 + (r - 9) * Math.sin(rad);
//           const x2 = 110 + (r + 2) * Math.cos(rad);
//           const y2 = 110 + (r + 2) * Math.sin(rad);
//           return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={t.tickColor} strokeWidth="1.5" />;
//         })}
//         {/* Progress arc */}
//         <circle cx="110" cy="110" r={r} fill="none" stroke={color} strokeWidth="16"
//           strokeDasharray={circ} strokeDashoffset={circ - (animated / 100) * circ}
//           strokeLinecap="round"
//           style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.34,1.56,0.64,1)", filter: `drop-shadow(${glow})` }}
//         />
//       </svg>
//       {/* Center content */}
//       <div style={{
//         position: "absolute", inset: 0,
//         display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px",
//       }}>
//         <span style={{
//           fontSize: "52px", fontWeight: "900", color,
//           letterSpacing: "-3px", lineHeight: 1,
//           fontFamily: "'DM Mono', 'Courier New', monospace",
//           textShadow: glow,
//         }}>
//           <AnimNumber value={score} />
//         </span>
//         <span style={{
//           fontSize: "10px", color: t.textMuted,
//           letterSpacing: "3.5px", textTransform: "uppercase", fontWeight: "700",
//         }}>
//           ATS SCORE
//         </span>
//         <div style={{
//           marginTop: "6px", padding: "4px 14px", borderRadius: "100px",
//           background: `${color}18`, border: `1px solid ${color}40`,
//           color, fontSize: "11px", fontWeight: "700", letterSpacing: "0.3px",
//         }}>
//           {label}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Stat Card (Hero) ──────────────────────────────────────────────────────────
// const StatCard = ({ value, label, color, t, suffix = "" }) => (
//   <motion.div
//     whileHover={{ y: -4, boxShadow: `0 16px 40px ${color}22` }}
//     style={{
//       flex: 1, minWidth: "100px",
//       padding: "18px 16px", borderRadius: "16px",
//       background: t.bgCard,
//       border: `1px solid ${color}25`,
//       backdropFilter: t.backdrop,
//       textAlign: "center",
//       boxShadow: `0 4px 20px ${color}10, ${t.inset}`,
//       transition: "all 0.25s ease",
//       position: "relative", overflow: "hidden",
//     }}
//   >
//     {/* Color accent top bar */}
//     <div style={{
//       position: "absolute", top: 0, left: "20%", right: "20%", height: "2px",
//       background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
//       borderRadius: "0 0 4px 4px",
//     }} />
//     <div style={{
//       fontSize: "30px", fontWeight: "900", color,
//       letterSpacing: "-1.5px", lineHeight: 1,
//       fontFamily: "'DM Mono', monospace",
//     }}>
//       <AnimNumber value={value} />{suffix}
//     </div>
//     <div style={{
//       fontSize: "10px", color: t.textMuted,
//       textTransform: "uppercase", letterSpacing: "1.2px",
//       fontWeight: "700", marginTop: "6px",
//     }}>
//       {label}
//     </div>
//   </motion.div>
// );

// // ─── Glass Card ────────────────────────────────────────────────────────────────
// const GlassCard = ({ children, style = {}, className = "", delay = 0, t }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//     transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
//     className={className}
//     style={{
//       background: t.bgCard, border: `1px solid ${t.border}`,
//       borderRadius: "24px", backdropFilter: t.backdrop,
//       boxShadow: `${t.shadow}, ${t.inset}`, padding: "28px", ...style,
//     }}
//   >
//     {children}
//   </motion.div>
// );

// // ─── Section Title ─────────────────────────────────────────────────────────────
// const SectionTitle = ({ children, sub, t }) => (
//   <div style={{ marginBottom: "22px" }}>
//     <h3 style={{ fontSize: "15px", fontWeight: "700", color: t.text, letterSpacing: "-0.3px", margin: 0 }}>{children}</h3>
//     {sub && <p style={{ fontSize: "12px", color: t.textMuted, marginTop: "5px", fontWeight: "500" }}>{sub}</p>}
//   </div>
// );

// // ─── Custom Tooltip ────────────────────────────────────────────────────────────
// const CustomTooltip = ({ active, payload, label, t }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <div style={{
//       background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`,
//       borderRadius: "14px", padding: "12px 16px", fontSize: "12px", color: t.text,
//       boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//     }}>
//       <div style={{ fontWeight: "700", marginBottom: "8px", color: t.text }}>{label}</div>
//       {payload.map((p, i) => (
//         <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
//           <span style={{ width: 8, height: 8, borderRadius: "3px", background: p.fill, display: "inline-block" }} />
//           <span style={{ color: t.textSub }}>{p.name}:</span>
//           <strong style={{ color: t.text }}>{p.value}</strong>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ─── Feedback Row ──────────────────────────────────────────────────────────────
// const FeedbackRow = ({ label, text, index, t }) => {
//   const lo = (text || "").toLowerCase();
//   const isGood = lo.includes("good") || lo.includes("strong") || lo.includes("excellent") || lo.includes("well");
//   const isBad = lo.includes("improve") || lo.includes("add") || lo.includes("missing") || lo.includes("need");
//   const color = isGood ? "#14B8A6" : isBad ? "#F59E0B" : "#A78BFA";
//   const status = isGood ? "Strong" : isBad ? "Needs Work" : "Review";

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: 0.1 * index }}
//       whileHover={{ background: t.bgCardHover }}
//       style={{
//         display: "flex", alignItems: "flex-start", gap: "16px",
//         padding: "18px 22px", borderRadius: "16px",
//         background: t.bgInput, border: `1px solid ${t.border}`,
//         borderLeft: `3px solid ${color}`, transition: "background 0.2s",
//       }}
//     >
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
//           <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: t.textMuted }}>{label}</span>
//           <span style={{
//             fontSize: "10px", fontWeight: "700", padding: "2px 10px", borderRadius: "100px",
//             background: `${color}15`, border: `1px solid ${color}30`, color,
//           }}>{status}</span>
//         </div>
//         <p style={{ fontSize: "13px", color: t.textSub, lineHeight: "1.65", margin: 0 }}>{text || "N/A"}</p>
//       </div>
//     </motion.div>
//   );
// };

// // ─── Suggestion Card ───────────────────────────────────────────────────────────
// const SuggestionCard = ({ text, index, t }) => {
//   const icons = [<Lightbulb size={16} />, <TrendingUp size={16} />, <Zap size={16} />, <Target size={16} />, <Sparkles size={16} />, <Award size={16} />, <Star size={16} />, <BookOpen size={16} />];
//   const colors = ["#7C3AED", "#06B6D4", "#14B8A6", "#F59E0B", "#A78BFA", "#7C3AED", "#06B6D4", "#14B8A6"];
//   const color = colors[index  % colors.length];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.08 * index }}
//       whileHover={{ y: -3, boxShadow: `0 14px 40px ${color}20` }}
//       style={{
//         padding: "20px", borderRadius: "18px",
//         background: t.bgInput, border: `1px solid ${t.border}`,
//         display: "flex", gap: "16px", alignItems: "flex-start",
//         cursor: "default", transition: "all 0.25s ease",
//       }}
//     >
//       <div style={{
//         width: "38px", height: "38px", borderRadius: "11px",
//         background: `${color}15`, border: `1px solid ${color}28`,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         color, flexShrink: 0,
//       }}>
//         {icons[index  % icons.length]}
//       </div>
//       <div style={{ flex: 1 }}>
//         <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px", color, marginBottom: "7px" }}>
//           Suggestion {String(index + 1).padStart(2, "0")}
//         </div>
//         <p style={{ fontSize: "13px", color: t.textSub, lineHeight: "1.65", margin: 0 }}>{text}</p>
//       </div>
//     </motion.div>
//   );
// };

// // ─── Skill Chip ────────────────────────────────────────────────────────────────
// const SkillChip = ({ label, type, t }) => {
//   const color = type === "matched" ? "#14B8A6" : "#F43F5E";
//   return (
//     <motion.span whileHover={{ scale: 1.06, y: -1 }} style={{
//       display: "inline-flex", alignItems: "center", gap: "6px",
//       padding: "7px 14px", borderRadius: "10px",
//       background: `${color}10`, border: `1px solid ${color}25`,
//       color, fontSize: "12px", fontWeight: "600",
//       cursor: "default", letterSpacing: "0.2px",
//     }}>
//       <span style={{ fontSize: "10px", fontWeight: "800" }}>{type === "matched" ? "✓" : "+"}</span>
//       {label}
//     </motion.span>
//   );
// };

// // ─── Roadmap helpers ───────────────────────────────────────────────────────────
// const levelConfig = {
//   beginner:     { icon: <BookOpen size={14} />, label: "Beginner" },
//   intermediate: { icon: <Code2 size={14} />,   label: "Intermediate" },
//   advanced:     { icon: <Zap size={14} />,      label: "Advanced" },
// };

// function getYouTubeId(url = "") {
//   const patterns = [
//     /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
//     /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
//   ];
//   for (const p of patterns) {
//     const m = url.match(p);
//     if (m) return m[1];
//   }
//   return null;
// }

// function YoutubeThumbnail({ url, title, t }) {
//   const [imgErr, setImgErr] = useState(false);
//   const vid = getYouTubeId(url);
//   const thumb = vid && !imgErr ? `https://img.youtube.com/vi/${vid}/mqdefault.jpg` : null;

//   return (
//     <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
//       <motion.div
//         whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(239,68,68,0.2)" }}
//         style={{
//           borderRadius: "14px", overflow: "hidden",
//           border: `1px solid ${t.border}`, background: t.bgInput,
//           transition: "all 0.25s ease", cursor: "pointer",
//         }}
//       >
//         <div style={{ position: "relative", paddingTop: "56.25%", background: "#0f0f0f", overflow: "hidden" }}>
//           {thumb ? (
//             <img src={thumb} alt={title} onError={() => setImgErr(true)}
//               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
//           ) : (
//             <div style={{
//               position: "absolute", inset: 0,
//               background: "linear-gradient(135deg, #1a1a2e, #16213e)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <Play size={28} color="rgba(255,255,255,0.3)" />
//             </div>
//           )}
//           <div style={{
//             position: "absolute", inset: 0,
//             background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//           }}>
//             <div style={{
//               width: "44px", height: "44px", borderRadius: "50%",
//               background: "rgba(239,68,68,0.9)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               boxShadow: "0 4px 20px rgba(239,68,68,0.5)",
//             }}>
//               <Play size={18} color="#fff" style={{ marginLeft: "2px" }} />
//             </div>
//           </div>
//           <div style={{
//             position: "absolute", top: "8px", right: "8px",
//             background: "rgba(239,68,68,0.92)", borderRadius: "6px",
//             padding: "2px 8px", fontSize: "10px", fontWeight: "800", color: "#fff",
//           }}>
//             YT
//           </div>
//         </div>
//         <div style={{ padding: "12px 14px" }}>
//           <p style={{
//             fontSize: "12px", fontWeight: "600", color: t.text,
//             lineHeight: "1.45", margin: 0,
//             overflow: "hidden", display: "-webkit-box",
//             WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
//           }}>
//             {title || "Watch Video"}
//           </p>
//           <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "7px" }}>
//             <Play size={8} color="#ef4444" />
//             <span style={{ fontSize: "11px", color: t.textMuted, fontWeight: "500" }}>
//               {url ? new URL(url).hostname.replace("www.", "") : "youtube.com"}
//             </span>
//             <ExternalLink size={10} color={t.textMuted} style={{ marginLeft: "auto" }} />
//           </div>
//         </div>
//       </motion.div>
//     </a>
//   );
// }

// // ─── Roadmap Skill Card ────────────────────────────────────────────────────────
// const RoadmapSkillCard = ({ skill, data, index, t, isDark }) => {
//   const [open, setOpen] = useState(index === 0);
//   const [activeLevel, setActiveLevel] = useState("beginner");
//   const [showVideos, setShowVideos] = useState(false);

//   const color = ["#7C3AED", "#06B6D4", "#14B8A6", "#F59E0B", "#A78BFA", "#F43F5E"][index  % 6];
//   const initial = skill.charAt(0).toUpperCase();
//   const levels = ["beginner", "intermediate", "advanced"];

//   // ✅ Safe fallbacks — this prevents the crash when light theme is active
//   const levelKeys = {
//     beginner:     t.levelBeginner     || { bg: "rgba(20,184,166,0.08)",  border: "rgba(20,184,166,0.2)",  color: "#14B8A6", dot: "#14B8A6" },
//     intermediate: t.levelIntermediate || { bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)",  color: "#F59E0B", dot: "#F59E0B" },
//     advanced:     t.levelAdvanced     || { bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.2)",   color: "#F43F5E", dot: "#F43F5E" },
//   };

//   const videos = data?.resources || [];
//   const firstVideo = videos[0];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.07 * index, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
//       style={{
//         borderRadius: "20px", background: t.bgCard, border: `1px solid ${t.border}`,
//         boxShadow: open ? `0 8px 40px ${color}15, ${t.inset}` : `0 2px 12px rgba(0,0,0,0.05)`,
//         overflow: "hidden", transition: "box-shadow 0.3s ease",
//       }}
//     >
//       <button
//         onClick={() => setOpen(!open)}
//         style={{
//           width: "100%", padding: "20px 24px",
//           display: "flex", alignItems: "center", gap: "16px",
//           background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
//         }}
//       >
//         <div style={{
//           width: "46px", height: "46px", borderRadius: "14px",
//           background: `linear-gradient(135deg, ${color}25, ${color}10)`,
//           border: `1px solid ${color}30`,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: "18px", fontWeight: "800", color, flexShrink: 0,
//           boxShadow: `0 4px 16px ${color}20`,
//         }}>
//           {initial}
//         </div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
//             <span style={{ fontSize: "15px", fontWeight: "700", color: t.text, letterSpacing: "-0.3px" }}>
//               {skill}
//             </span>
//             <span style={{
//               fontSize: "10px", fontWeight: "700", padding: "2px 10px",
//               borderRadius: "100px", textTransform: "uppercase", letterSpacing: "1px",
//               background: `${color}12`, border: `1px solid ${color}25`, color,
//             }}>
//               Learning Path
//             </span>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "5px" }}>
//             {levels.map(l => {
//               const count = data?.[l]?.length || 0;
//               if (!count) return null;
//               const lc = levelKeys[l];
//               return (
//                 <span key={l} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: t.textMuted }}>
//                   <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: lc.dot, display: "inline-block" }} />
//                   {count} {l}
//                 </span>
//               );
//             })}
//             {videos.length > 0 && (
//               <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: t.textMuted }}>
//                 <Play size={10} />
//                 {videos.length} videos
//               </span>
//             )}
//           </div>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "12px" }}>
//           {levels.map(l => {
//             const lc = levelKeys[l];
//             const has = (data?.[l]?.length || 0) > 0;
//             return (
//               <div key={l} style={{
//                 width: "8px", height: "8px", borderRadius: "50%",
//                 background: has ? lc.dot : t.border, opacity: has ? 1 : 0.3,
//               }} />
//             );
//           })}
//         </div>
//         <div style={{
//           width: "32px", height: "32px", borderRadius: "10px",
//           background: t.bgInput, border: `1px solid ${t.border}`,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           color: t.textMuted, flexShrink: 0,
//         }}>
//           {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
//         </div>
//       </button>

//       <AnimatePresence initial={false}>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
//             style={{ overflow: "hidden" }}
//           >
//             <div style={{ padding: "0 24px 24px", borderTop: `1px solid ${t.border}` }}>
//               <div style={{ display: "flex", gap: "8px", marginTop: "20px", marginBottom: "18px", flexWrap: "wrap" }}>
//                 {levels.map(l => {
//                   const lc = levelKeys[l];
//                   const has = (data?.[l]?.length || 0) > 0;
//                   if (!has) return null;
//                   const isActive = activeLevel === l;
//                   return (
//                     <button key={l} onClick={() => setActiveLevel(l)} style={{
//                       padding: "8px 16px", borderRadius: "10px",
//                       background: isActive ? lc.bg : "transparent",
//                       border: `1px solid ${isActive ? lc.border : t.border}`,
//                       color: isActive ? lc.color : t.textMuted,
//                       fontSize: "12px", fontWeight: "700", cursor: "pointer",
//                       transition: "all 0.2s", display: "flex", alignItems: "center", gap: "7px",
//                       textTransform: "capitalize",
//                     }}>
//                       <span style={{ color: isActive ? lc.color : t.textMuted }}>{levelConfig[l]?.icon}</span>
//                       {l}
//                       <span style={{
//                         fontSize: "10px", padding: "1px 7px", borderRadius: "100px",
//                         background: isActive ? `${lc.dot}20` : t.bgInput,
//                         color: isActive ? lc.color : t.textMuted,
//                         border: `1px solid ${isActive ? lc.border : t.border}`,
//                       }}>
//                         {data?.[l]?.length}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>

//               {data?.[activeLevel]?.length > 0 && (
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
//                   {data[activeLevel].map((topic, ti) => {
//                     const lc = levelKeys[activeLevel] || levelKeys["beginner"];
//                     return (
//                       <motion.div key={ti}
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: ti * 0.05 }}
//                         whileHover={{ y: -2 }}
//                         style={{
//                           padding: "14px 16px", borderRadius: "14px",
//                           background: lc.bg, border: `1px solid ${lc.border}`,
//                           display: "flex", alignItems: "center", gap: "10px",
//                           cursor: "default", transition: "all 0.2s",
//                         }}
//                       >
//                         <div style={{
//                           width: "24px", height: "24px", borderRadius: "8px",
//                           background: `${lc.dot}20`, border: `1px solid ${lc.border}`,
//                           display: "flex", alignItems: "center", justifyContent: "center",
//                           fontSize: "10px", fontWeight: "700", color: lc.color, flexShrink: 0,
//                         }}>
//                           {ti + 1}
//                         </div>
//                         <span style={{ fontSize: "13px", color: lc.color, fontWeight: "600", lineHeight: "1.4" }}>
//                           {topic}
//                         </span>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               )}

//               {videos.length > 0 && (
//                 <div style={{ marginTop: "18px" }}>
//                   <button
//                     onClick={() => setShowVideos(v => !v)}
//                     style={{
//                       width: "100%", padding: "13px 18px", borderRadius: "14px",
//                       background: t.bgInput, border: `1px solid ${t.border}`,
//                       color: t.textSub, fontSize: "13px", fontWeight: "600",
//                       cursor: "pointer", display: "flex", alignItems: "center",
//                       justifyContent: "space-between", transition: "border-color 0.2s",
//                     }}
//                     onMouseOver={e => e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"}
//                     onMouseOut={e => e.currentTarget.style.borderColor = t.border}
//                   >
//                     <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                       <span style={{
//                         width: "28px", height: "28px", borderRadius: "8px",
//                         background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
//                         display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//                       }}>
//                         <Play size={12} color="#ef4444" />
//                       </span>
//                       <span style={{ color: t.text, fontWeight: "700" }}>Video Resources</span>
//                       <span style={{
//                         fontSize: "11px", padding: "2px 10px", borderRadius: "100px",
//                         background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
//                         color: "#ef4444", fontWeight: "700",
//                       }}>
//                         {videos.length}
//                       </span>
//                     </span>
//                     <motion.span animate={{ rotate: showVideos ? 180 : 0 }} transition={{ duration: 0.25 }}>
//                       <ChevronDown size={16} color={t.textMuted} />
//                     </motion.span>
//                   </button>

//                   <AnimatePresence initial={false}>
//                     {showVideos && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
//                         style={{ overflow: "hidden" }}
//                       >
//                         <div style={{
//                           display: "grid",
//                           gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//                           gap: "12px", marginTop: "14px",
//                         }}>
//                           {videos.map((video, vi) => (
//                             <YoutubeThumbnail key={vi}
//                               url={video?.url || video}
//                               title={video?.title || video?.name || `Video ${vi + 1}`}
//                               t={t}
//                             />
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
//                 {firstVideo ? (
//                   <a href={firstVideo?.url || firstVideo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
//                     <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{
//                       padding: "10px 20px", borderRadius: "12px",
//                       background: `linear-gradient(135deg, ${color}, ${color}bb)`,
//                       color: "#fff", fontSize: "12px", fontWeight: "700",
//                       cursor: "pointer", display: "flex", alignItems: "center", gap: "7px",
//                       boxShadow: `0 4px 16px ${color}30`,
//                     }}>
//                       <Play size={13} /> Start Learning <ArrowRight size={13} />
//                     </motion.div>
//                   </a>
//                 ) : (
//                   <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{
//                     padding: "10px 20px", borderRadius: "12px",
//                     background: `linear-gradient(135deg, ${color}, ${color}bb)`,
//                     border: "none", color: "#fff", fontSize: "12px", fontWeight: "700",
//                     cursor: "pointer", display: "flex", alignItems: "center", gap: "7px",
//                     boxShadow: `0 4px 16px ${color}30`,
//                   }}>
//                     <Play size={13} /> Start Learning <ArrowRight size={13} />
//                   </motion.button>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// // ─── Main Component ────────────────────────────────────────────────────────────
// export default function Result() {
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();
//   const pdfRef = useRef();
//   const { dark } = useThemeStore();
//   const t = dark ? themes.dark : themes.light;

//   useEffect(() => {
//     api.get(`/analysis/result/${id}`).then((res) => setData(res.data));
//   }, [id]);

//   const downloadReport = async () => {
//     const { jsPDF } = await import("jspdf");
//     const doc = new jsPDF();
//     let y = 20;
//     doc.setFontSize(18); doc.text("ATS Resume Analysis Report", 20, y); y += 10;
//     doc.setFontSize(10); doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, y); y += 10;
//     doc.setFontSize(14); doc.text(`Score: ${data.score}%`, 20, y); y += 10;
//     doc.setFontSize(12); doc.text(`Matched: ${data.matchedKeywords.length} | Missing: ${data.missingKeywords.length}`, 20, y); y += 10;
//     doc.setFontSize(13); doc.text("Matched Skills:", 20, y); y += 8; doc.setFontSize(10);
//     data.matchedKeywords.forEach((s) => { doc.text(`- ${s}`, 25, y); y += 6; if (y > 280) { doc.addPage(); y = 20; } });
//     y += 5; doc.setFontSize(13); doc.text("Missing Skills:", 20, y); y += 8; doc.setFontSize(10);
//     data.missingKeywords.forEach((s) => { doc.text(`- ${s}`, 25, y); y += 6; if (y > 280) { doc.addPage(); y = 20; } });
//     if (data.aiSuggestions?.length) {
//       y += 5; doc.setFontSize(13); doc.text("AI Suggestions:", 20, y); y += 8; doc.setFontSize(10);
//       data.aiSuggestions.forEach((s) => { doc.text(`- ${s}`, 25, y); y += 6; if (y > 280) { doc.addPage(); y = 20; } });
//     }
//     doc.save(`ATS-Report-${data.score}.pdf`);
//   };

//   if (!data) return (
//     <div style={{ minHeight: "100vh", background: t.bg, transition: "background 0.3s" }}>
//       <Navbar />
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70vh" }}>
//         <div style={{ textAlign: "center" }}>
//           <div style={{
//             width: "44px", height: "44px",
//             border: `3px solid ${t.border}`, borderTop: "3px solid #7C3AED",
//             borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
//           }} />
//           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//           <p style={{ color: t.textMuted, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
//             Loading Analysis
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   const categories = {
//     Frontend: ["react", "vue", "angular", "html", "css", "typescript", "javascript", "nextjs"],
//     Backend:  ["node", "express", "python", "java", "spring", "django", "flask", "php"],
//     Database: ["mongodb", "mysql", "postgresql", "redis", "firebase", "sql"],
//     DevOps:   ["docker", "kubernetes", "aws", "azure", "gcp", "git", "ci", "cd"],
//   };

//   const barData = Object.entries(categories)
//     .map(([cat, skills]) => ({
//       name: cat,
//       matched: skills.filter(s => data.matchedKeywords?.includes(s)).length,
//       missing: skills.filter(s => data.missingKeywords?.includes(s)).length,
//     }))
//     .filter(d => d.matched + d.missing > 0);

//   const matchPct = data.matchedKeywords?.length && data.missingKeywords?.length
//     ? Math.round((data.matchedKeywords.length / (data.matchedKeywords.length + data.missingKeywords.length)) * 100)
//     : 0;

//   // Build stat list dynamically — only show what exists
//   const stats = [
//     { value: data.matchedKeywords?.length ?? 0, label: "Matched",   color: "#14B8A6" },
//     { value: data.missingKeywords?.length ?? 0, label: "Missing",   color: "#F43F5E" },
//     { value: matchPct,                           label: "Match Rate", color: "#A78BFA", suffix: "%" },
//     ...(data.ruleScore ? [{ value: data.ruleScore, label: "Rule Score", color: "#06B6D4" }] : []),
//     ...(data.aiScore   ? [{ value: data.aiScore,   label: "AI Score",   color: "#7C3AED" }] : []),
//   ];

//   return (
//     <div style={{ minHeight: "100vh", background: t.bg, position: "relative", overflow: "hidden", transition: "background 0.3s ease" }}>
//       {/* Ambient glows */}
//       <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
//         <div style={{
//           position: "absolute", top: "-15%", left: "50%", transform: "translateX(-50%)",
//           width: "900px", height: "500px",
//           background: `radial-gradient(ellipse, ${t.glow1} 0%, transparent 65%)`,
//           filter: "blur(40px)",
//         }} />
//         <div style={{
//           position: "absolute", bottom: "10%", right: "-10%",
//           width: "600px", height: "600px",
//           background: `radial-gradient(ellipse, ${t.glow2} 0%, transparent 65%)`,
//           filter: "blur(60px)",
//         }} />
//         <div style={{
//           position: "absolute", top: "40%", left: "-5%",
//           width: "400px", height: "400px",
//           background: `radial-gradient(ellipse, ${t.glow3} 0%, transparent 65%)`,
//           filter: "blur(50px)",
//         }} />
//         <div style={{
//           position: "absolute", inset: 0,
//           backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,
//           backgroundSize: "60px 60px",
//         }} />
//       </div>

//       <Navbar />

//       <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>

//         {/* ── Page Header ── */}
//         <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
//           style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
//           <div>
//             <div style={{
//               display: "inline-flex", alignItems: "center", gap: "8px",
//               fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase",
//               color: t.pillColor, marginBottom: "10px",
//               padding: "5px 14px", borderRadius: "100px",
//               background: t.pillBg, border: `1px solid ${t.pillBorder}`,
//             }}>
//               <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: t.pillColor, display: "inline-block", animation: "pulse 2s infinite" }} />
//               Analysis Complete
//             </div>
//             <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
//             <h1 style={{ fontSize: "30px", fontWeight: "800", color: t.text, letterSpacing: "-1.2px", margin: 0 }}>
//               Resume Analysis
//             </h1>
//             <p style={{ fontSize: "13px", color: t.textMuted, marginTop: "6px", fontWeight: "500" }}>
//               {new Date(data.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
//             </p>
//           </div>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
//               onClick={downloadReport}
//               style={{
//                 padding: "11px 20px", borderRadius: "12px",
//                 background: t.bgCard, border: `1px solid ${t.border}`,
//                 color: t.textSub, fontSize: "13px", fontWeight: "600",
//                 cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
//                 backdropFilter: t.backdrop,
//               }}>
//               <Download size={15} /> Export PDF
//             </motion.button>
//             <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
//               onClick={() => navigate("/analyze")}
//               style={{
//                 padding: "11px 20px", borderRadius: "12px",
//                 background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
//                 border: "none", color: "#fff", fontSize: "13px", fontWeight: "700",
//                 cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
//                 boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
//               }}>
//               <Plus size={15} /> New Analysis
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* ── HERO: Score ring centered + stats below ── */}
//         <GlassCard t={t} delay={0.1} style={{ marginBottom: "20px", padding: "44px 40px 36px" }}>
//           {/* Top: centered score ring + headline */}
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "36px" }}>
//             <ScoreRing score={data.score} t={t} />
//             <p style={{
//               fontSize: "22px", fontWeight: "800", color: t.text,
//               letterSpacing: "-0.8px", margin: "24px 0 8px", lineHeight: 1.3,
//             }}>
//               {data.score >= 70
//                 ? "Your resume is well-optimized "
//                 : data.score >= 40
//                   ? "Your resume needs some improvements"
//                   : "Your resume needs significant work"}
//             </p>
//             <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: "1.6", fontWeight: "500", maxWidth: "480px" }}>
//               Based on AI + rule-based analysis of your resume against the job description.
//             </p>
//           </div>

//           {/* Divider */}
//           <div style={{
//             height: "1px", marginBottom: "28px",
//             background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
//           }} />

//           {/* Stats row */}
//           <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
//             {stats.map((s, i) => (
//               <StatCard key={i} value={s.value} label={s.label} color={s.color} t={t} suffix={s.suffix || ""} />
//             ))}
//           </div>
//         </GlassCard>

//         {/* ── Skills Grid ── */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
//           <GlassCard t={t} delay={0.2}>
//             <SectionTitle t={t}>
//               <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                 <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#14B8A6", display: "inline-block", boxShadow: "0 0 8px #14B8A6" }} />
//                 Matched Skills
//                 <span style={{ marginLeft: "4px", fontSize: "11px", padding: "2px 10px", borderRadius: "100px", background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.25)", color: "#14B8A6", fontWeight: "700" }}>
//                   {data.matchedKeywords?.length}
//                 </span>
//               </span>
//             </SectionTitle>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//               {data.matchedKeywords?.map(k => <SkillChip key={k} label={k} type="matched" t={t} />)}
//             </div>
//           </GlassCard>

//           <GlassCard t={t} delay={0.25}>
//             <SectionTitle t={t}>
//               <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                 <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F43F5E", display: "inline-block", boxShadow: "0 0 8px #F43F5E" }} />
//                 Missing Skills
//                 <span style={{ marginLeft: "4px", fontSize: "11px", padding: "2px 10px", borderRadius: "100px", background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.25)", color: "#F43F5E", fontWeight: "700" }}>
//                   {data.missingKeywords?.length}
//                 </span>
//               </span>
//             </SectionTitle>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//               {data.missingKeywords?.map(k => <SkillChip key={k} label={k} type="missing" t={t} />)}
//             </div>
//           </GlassCard>
//         </div>

//         {/* ── Bar Chart ── */}
//         {barData.length > 0 && (
//           <GlassCard t={t} delay={0.3} style={{ marginBottom: "20px" }}>
//             <SectionTitle t={t} sub="Skills coverage across tech domains">Skills by Category</SectionTitle>
//             <ResponsiveContainer width="100%" height={220}>
//               <BarChart data={barData} barSize={32} barGap={4} barCategoryGap="30%">
//                 <CartesianGrid strokeDasharray="3 3" stroke={t.gridLine} vertical={false} />
//                 <XAxis dataKey="name" tick={{ fill: t.textMuted, fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
//                 <YAxis tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
//                 <Tooltip content={<CustomTooltip t={t} />} cursor={{ fill: t.bgInput, radius: 8 }} />
//                 <Bar dataKey="matched" name="Matched" fill="#14B8A6" radius={[6, 6, 0, 0]} />
//                 <Bar dataKey="missing"  name="Missing"  fill="#F43F5E" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//             <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "14px" }}>
//               {[["#14B8A6", "Matched"], ["#F43F5E", "Missing"]].map(([color, name]) => (
//                 <span key={name} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: t.textMuted, fontWeight: "600" }}>
//                   <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: color, display: "inline-block" }} />
//                   {name}
//                 </span>
//               ))}
//             </div>
//           </GlassCard>
//         )}

//         {/* ── AI Suggestions ── */}
//         {data.aiSuggestions?.length > 0 && (
//           <GlassCard t={t} delay={0.35} style={{ marginBottom: "20px" }}>
//             <SectionTitle t={t} sub="Personalized recommendations from AI analysis">AI Suggestions</SectionTitle>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//               {data.aiSuggestions.map((s, i) => <SuggestionCard key={i} text={s} index={i} t={t} />)}
//             </div>
//           </GlassCard>
//         )}

//         {/* ── Section Feedback ── */}
//         {data.sectionFeedback && Object.keys(data.sectionFeedback).length > 0 && (
//           <GlassCard t={t} delay={0.4} style={{ marginBottom: "20px" }}>
//             <SectionTitle t={t} sub="How each resume section performs">Section Feedback</SectionTitle>
//             <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//               {Object.entries(data.sectionFeedback).map(([key, val], i) => (
//                 <FeedbackRow key={key} label={key} text={val} index={i} t={t} />
//               ))}
//             </div>
//           </GlassCard>
//         )}

//         {/* ── Roadmap ── */}
//         {data.roadmap && Object.keys(data.roadmap).length > 0 && (
//           <GlassCard t={t} delay={0.45} style={{ marginBottom: "20px" }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
//               <div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
//                   <div style={{
//                     width: "32px", height: "32px", borderRadius: "10px",
//                     background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                   }}>
//                     <Layers size={15} color="#A78BFA" />
//                   </div>
//                   <h3 style={{ fontSize: "16px", fontWeight: "700", color: t.text, margin: 0, letterSpacing: "-0.3px" }}>
//                     AI Skill Roadmap
//                   </h3>
//                 </div>
//                 <p style={{ fontSize: "12px", color: t.textMuted, margin: 0, paddingLeft: "42px", fontWeight: "500" }}>
//                   Personalized learning paths for your missing skills
//                 </p>
//               </div>
//               <span style={{
//                 fontSize: "11px", padding: "5px 16px", borderRadius: "100px",
//                 background: t.pillBg, border: `1px solid ${t.pillBorder}`,
//                 color: t.pillColor, fontWeight: "700",
//               }}>
//                 {Object.keys(data.roadmap).length} skills
//               </span>
//             </div>
//             <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
//               {Object.entries(data.roadmap).map(([skill, skillData], i) => (
//                 <RoadmapSkillCard key={skill} skill={skill} data={skillData} index={i} t={t} isDark={dark} />
//               ))}
//             </div>
//           </GlassCard>
//         )}

//         {/* ── Action Row ── */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
//           style={{ display: "flex", gap: "12px", paddingBottom: "20px", flexWrap: "wrap" }}>
//           {[
//             { label: "New Analysis",  action: () => navigate("/analyze"), primary: true,  Icon: Plus },
//             { label: "View History",  action: () => navigate("/history"), primary: false, Icon: ChevronRight },
//             { label: "Download PDF",  action: downloadReport,             primary: false, Icon: Download },
//           ].map(({ label, action, primary, Icon }) => (
//             <motion.button key={label} onClick={action}
//               whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
//               style={{
//                 padding: "13px 24px", borderRadius: "14px",
//                 background: primary ? "linear-gradient(135deg, #7C3AED, #06B6D4)" : t.bgCard,
//                 border: primary ? "none" : `1px solid ${t.border}`,
//                 color: primary ? "#fff" : t.textSub,
//                 fontSize: "13px", fontWeight: "700", cursor: "pointer",
//                 display: "flex", alignItems: "center", gap: "8px",
//                 boxShadow: primary ? "0 4px 20px rgba(124,58,237,0.3)" : t.shadow,
//                 backdropFilter: primary ? "none" : t.backdrop,
//               }}>
//               <Icon size={15} />
//               {label}
//             </motion.button>
//           ))}
//         </motion.div>
//       </div>

//       <div ref={pdfRef} style={{ position: "fixed", top: 0, left: 0, width: "210mm", background: "#ffffff", zIndex: "-1" }}>
//         {data && <PDFReport data={data} />}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import RoadmapCard from "../components/RoadmapCard";
import {
  CheckCircle, AlertTriangle, BarChart3, Cpu, Scale,
  Download, Plus, ChevronRight, Star, Zap, BookOpen,
  ArrowRight, TrendingUp, Target, Award, Clock, ExternalLink,
  ChevronDown, ChevronUp, Play, Layers, Code2, Database,
  Globe, Server, GitBranch, Lightbulb, Sparkles
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import useThemeStore from "../store/themeStore";
import PDFReport from "../components/PDFReport";

// ─── Theme tokens ──────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#080C14",
    bgCard: "rgba(13,18,30,0.85)",
    bgCardHover: "rgba(20,27,45,0.9)",
    bgInput: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.07)",
    borderHover: "rgba(124,58,237,0.45)",
    text: "#F1F5F9",
    textSub: "rgba(255,255,255,0.5)",
    textMuted: "rgba(255,255,255,0.25)",
    gridLine: "rgba(255,255,255,0.015)",
    shadow: "0 8px 48px rgba(0,0,0,0.55)",
    glow1: "rgba(124,58,237,0.14)",
    glow2: "rgba(6,182,212,0.09)",
    glow3: "rgba(20,184,166,0.07)",
    pillBg: "rgba(124,58,237,0.12)",
    pillBorder: "rgba(124,58,237,0.25)",
    pillColor: "#A78BFA",
    chipTrack: "rgba(255,255,255,0.04)",
    tickColor: "rgba(255,255,255,0.06)",
    tooltipBg: "#0d1117",
    tooltipBorder: "rgba(255,255,255,0.1)",
    inset: "inset 0 1px 0 rgba(255,255,255,0.05)",
    backdrop: "blur(24px)",
    roadmapBg: "rgba(255,255,255,0.02)",
    roadmapBorder: "rgba(255,255,255,0.06)",
    roadmapHover: "rgba(255,255,255,0.04)",
    levelBeginner: { bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.2)", color: "#14B8A6", dot: "#14B8A6" },
    levelIntermediate: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", color: "#F59E0B", dot: "#F59E0B" },
    levelAdvanced: { bg: "rgba(244,63,94,0.08)", border: "rgba(244,63,94,0.2)", color: "#F43F5E", dot: "#F43F5E" },
    levelVideo: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", color: "#A78BFA", dot: "#7C3AED" },
  },
  light: {
    bg: "#F0F4FF",
    bgCard: "rgba(255,255,255,0.9)",
    bgCardHover: "rgba(255,255,255,1)",
    bgInput: "rgba(0,0,0,0.03)",
    border: "rgba(0,0,0,0.08)",
    borderHover: "rgba(124,58,237,0.4)",
    text: "#0F172A",
    textSub: "rgba(15,23,42,0.6)",
    textMuted: "rgba(15,23,42,0.35)",
    gridLine: "rgba(0,0,0,0.04)",
    shadow: "0 8px 48px rgba(100,100,150,0.12)",
    glow1: "rgba(124,58,237,0.08)",
    glow2: "rgba(6,182,212,0.06)",
    glow3: "rgba(20,184,166,0.05)",
    pillBg: "rgba(124,58,237,0.08)",
    pillBorder: "rgba(124,58,237,0.2)",
    pillColor: "#7C3AED",
    chipTrack: "rgba(0,0,0,0.05)",
    tickColor: "rgba(0,0,0,0.06)",
    tooltipBg: "#ffffff",
    tooltipBorder: "rgba(0,0,0,0.1)",
    inset: "inset 0 1px 0 rgba(255,255,255,0.8)",
    backdrop: "blur(24px)",
    roadmapBg: "rgba(0,0,0,0.02)",
    roadmapBorder: "rgba(0,0,0,0.07)",
    roadmapHover: "rgba(0,0,0,0.035)",
    levelBeginner: { bg: "rgba(20,184,166,0.07)", border: "rgba(20,184,166,0.25)", color: "#0D9488", dot: "#14B8A6" },
    levelIntermediate: { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.25)", color: "#D97706", dot: "#F59E0B" },
    levelAdvanced: { bg: "rgba(244,63,94,0.07)", border: "rgba(244,63,94,0.25)", color: "#E11D48", dot: "#F43F5E" },
    levelVideo: { bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.25)", color: "#7C3AED", dot: "#7C3AED" },
  },
};

// ─── Animated Number ───────────────────────────────────────────────────────────
function AnimNumber({ value, suffix = "" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let cur = 0;
    const target = parseInt(value) || 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
      cur = Math.min(cur + step, target);
      setN(cur);
      if (cur >= target) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [value]);
  return <>{n}{suffix}</>;
}

// ─── Score Ring ────────────────────────────────────────────────────────────────
const ScoreRing = ({ score, t }) => {
  const [animated, setAnimated] = useState(0);
  const r = 88;
  const circ = 2 * Math.PI * r;
  const color = score >= 70 ? "#14B8A6" : score >= 40 ? "#F59E0B" : "#F43F5E";
  const glow = score >= 70
    ? "0 0 60px rgba(20,184,166,0.4)"
    : score >= 40 ? "0 0 60px rgba(245,158,11,0.4)"
      : "0 0 60px rgba(244,63,94,0.4)";
  const label = score >= 70 ? "Strong Match" : score >= 40 ? "Moderate Match" : "Low Match";

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 400);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        position: "absolute", inset: "-24px", borderRadius: "50%",
        background: `radial-gradient(circle, ${color}28 0%, transparent 68%)`,
        filter: "blur(18px)", pointerEvents: "none",
      }} />
      <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: "rotate(-90deg)", display: "block" }}>
        <circle cx="110" cy="110" r={r} fill="none" stroke={t.chipTrack} strokeWidth="16" />
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * 360;
          const rad = (angle * Math.PI) / 180;
          const x1 = 110 + (r - 9) * Math.cos(rad);
          const y1 = 110 + (r - 9) * Math.sin(rad);
          const x2 = 110 + (r + 2) * Math.cos(rad);
          const y2 = 110 + (r + 2) * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={t.tickColor} strokeWidth="1.5" />;
        })}
        <circle cx="110" cy="110" r={r} fill="none" stroke={color} strokeWidth="16"
          strokeDasharray={circ} strokeDashoffset={circ - (animated / 100) * circ}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.34,1.56,0.64,1)", filter: `drop-shadow(${glow})` }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px",
      }}>
        <span style={{
          fontSize: "52px", fontWeight: "900", color,
          letterSpacing: "-3px", lineHeight: 1,
          fontFamily: "'DM Mono', 'Courier New', monospace",
          textShadow: glow,
        }}>
          <AnimNumber value={score} />
        </span>
        <span style={{
          fontSize: "10px", color: t.textMuted,
          letterSpacing: "3.5px", textTransform: "uppercase", fontWeight: "700",
        }}>
          ATS SCORE
        </span>
        <div style={{
          marginTop: "6px", padding: "4px 14px", borderRadius: "100px",
          background: `${color}18`, border: `1px solid ${color}40`,
          color, fontSize: "11px", fontWeight: "700", letterSpacing: "0.3px",
        }}>
          {label}
        </div>
      </div>
    </div>
  );
};

// ─── Stat Card (Hero) ──────────────────────────────────────────────────────────
const StatCard = ({ value, label, color, t, suffix = "" }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: `0 16px 40px ${color}22` }}
    style={{
      flex: "1 1 80px", minWidth: "80px",
      padding: "14px 12px", borderRadius: "16px",
      background: t.bgCard,
      border: `1px solid ${color}25`,
      backdropFilter: t.backdrop,
      textAlign: "center",
      boxShadow: `0 4px 20px ${color}10, ${t.inset}`,
      transition: "all 0.25s ease",
      position: "relative", overflow: "hidden",
    }}
  >
    <div style={{
      position: "absolute", top: 0, left: "20%", right: "20%", height: "2px",
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      borderRadius: "0 0 4px 4px",
    }} />
    <div style={{
      fontSize: "26px", fontWeight: "900", color,
      letterSpacing: "-1.5px", lineHeight: 1,
      fontFamily: "'DM Mono', monospace",
    }}>
      <AnimNumber value={value} />{suffix}
    </div>
    <div style={{
      fontSize: "10px", color: t.textMuted,
      textTransform: "uppercase", letterSpacing: "1.2px",
      fontWeight: "700", marginTop: "6px",
    }}>
      {label}
    </div>
  </motion.div>
);

// ─── Glass Card ────────────────────────────────────────────────────────────────
const GlassCard = ({ children, style = {}, className = "", delay = 0, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    className={className}
    style={{
      background: t.bgCard, border: `1px solid ${t.border}`,
      borderRadius: "24px", backdropFilter: t.backdrop,
      boxShadow: `${t.shadow}, ${t.inset}`, padding: "20px", ...style,
    }}
  >
    {children}
  </motion.div>
);

// ─── Section Title ─────────────────────────────────────────────────────────────
const SectionTitle = ({ children, sub, t }) => (
  <div style={{ marginBottom: "22px" }}>
    <h3 style={{ fontSize: "15px", fontWeight: "700", color: t.text, letterSpacing: "-0.3px", margin: 0 }}>{children}</h3>
    {sub && <p style={{ fontSize: "12px", color: t.textMuted, marginTop: "5px", fontWeight: "500" }}>{sub}</p>}
  </div>
);

// ─── Custom Tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, t }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`,
      borderRadius: "14px", padding: "12px 16px", fontSize: "12px", color: t.text,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    }}>
      <div style={{ fontWeight: "700", marginBottom: "8px", color: t.text }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "3px", background: p.fill, display: "inline-block" }} />
          <span style={{ color: t.textSub }}>{p.name}:</span>
          <strong style={{ color: t.text }}>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

// ─── Feedback Row ──────────────────────────────────────────────────────────────
const FeedbackRow = ({ label, text, index, t }) => {
  const lo = (text || "").toLowerCase();
  const isGood = lo.includes("good") || lo.includes("strong") || lo.includes("excellent") || lo.includes("well");
  const isBad = lo.includes("improve") || lo.includes("add") || lo.includes("missing") || lo.includes("need");
  const color = isGood ? "#14B8A6" : isBad ? "#F59E0B" : "#A78BFA";
  const status = isGood ? "Strong" : isBad ? "Needs Work" : "Review";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ background: t.bgCardHover }}
      style={{
        display: "flex", alignItems: "flex-start", gap: "16px",
        padding: "16px 18px", borderRadius: "16px",
        background: t.bgInput, border: `1px solid ${t.border}`,
        borderLeft: `3px solid ${color}`, transition: "background 0.2s",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: t.textMuted }}>{label}</span>
          <span style={{
            fontSize: "10px", fontWeight: "700", padding: "2px 10px", borderRadius: "100px",
            background: `${color}15`, border: `1px solid ${color}30`, color,
          }}>{status}</span>
        </div>
        <p style={{ fontSize: "13px", color: t.textSub, lineHeight: "1.65", margin: 0 }}>{text || "N/A"}</p>
      </div>
    </motion.div>
  );
};

// ─── Suggestion Card ───────────────────────────────────────────────────────────
const SuggestionCard = ({ text, index, t }) => {
  const icons = [<Lightbulb size={16} />, <TrendingUp size={16} />, <Zap size={16} />, <Target size={16} />, <Sparkles size={16} />, <Award size={16} />, <Star size={16} />, <BookOpen size={16} />];
  const colors = ["#7C3AED", "#06B6D4", "#14B8A6", "#F59E0B", "#A78BFA", "#7C3AED", "#06B6D4", "#14B8A6"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index }}
      whileHover={{ y: -3, boxShadow: `0 14px 40px ${color}20` }}
      style={{
        padding: "18px 16px", borderRadius: "18px",
        background: t.bgInput, border: `1px solid ${t.border}`,
        display: "flex", gap: "14px", alignItems: "flex-start",
        cursor: "default", transition: "all 0.25s ease",
      }}
    >
      <div style={{
        width: "36px", height: "36px", borderRadius: "11px",
        background: `${color}15`, border: `1px solid ${color}28`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color, flexShrink: 0,
      }}>
        {icons[index % icons.length]}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px", color, marginBottom: "7px" }}>
          Suggestion {String(index + 1).padStart(2, "0")}
        </div>
        <p style={{ fontSize: "13px", color: t.textSub, lineHeight: "1.65", margin: 0 }}>{text}</p>
      </div>
    </motion.div>
  );
};

// ─── Skill Chip ────────────────────────────────────────────────────────────────
const SkillChip = ({ label, type, t }) => {
  const color = type === "matched" ? "#14B8A6" : "#F43F5E";
  return (
    <motion.span whileHover={{ scale: 1.06, y: -1 }} style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "7px 14px", borderRadius: "10px",
      background: `${color}10`, border: `1px solid ${color}25`,
      color, fontSize: "12px", fontWeight: "600",
      cursor: "default", letterSpacing: "0.2px",
    }}>
      <span style={{ fontSize: "10px", fontWeight: "800" }}>{type === "matched" ? "✓" : "+"}</span>
      {label}
    </motion.span>
  );
};

// ─── Roadmap helpers ───────────────────────────────────────────────────────────
const levelConfig = {
  beginner: { icon: <BookOpen size={14} />, label: "Beginner" },
  intermediate: { icon: <Code2 size={14} />, label: "Intermediate" },
  advanced: { icon: <Zap size={14} />, label: "Advanced" },
};

function getYouTubeId(url = "") {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function YoutubeThumbnail({ url, title, t }) {
  const [imgErr, setImgErr] = useState(false);
  const vid = getYouTubeId(url);
  const thumb = vid && !imgErr ? `https://img.youtube.com/vi/${vid}/mqdefault.jpg` : null;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <motion.div
        whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(239,68,68,0.2)" }}
        style={{
          borderRadius: "14px", overflow: "hidden",
          border: `1px solid ${t.border}`, background: t.bgInput,
          transition: "all 0.25s ease", cursor: "pointer",
        }}
      >
        <div style={{ position: "relative", paddingTop: "56.25%", background: "#0f0f0f", overflow: "hidden" }}>
          {thumb ? (
            <img src={thumb} alt={title} onError={() => setImgErr(true)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, #1a1a2e, #16213e)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Play size={28} color="rgba(255,255,255,0.3)" />
            </div>
          )}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(239,68,68,0.9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(239,68,68,0.5)",
            }}>
              <Play size={18} color="#fff" style={{ marginLeft: "2px" }} />
            </div>
          </div>
          <div style={{
            position: "absolute", top: "8px", right: "8px",
            background: "rgba(239,68,68,0.92)", borderRadius: "6px",
            padding: "2px 8px", fontSize: "10px", fontWeight: "800", color: "#fff",
          }}>
            YT
          </div>
        </div>
        <div style={{ padding: "12px 14px" }}>
          <p style={{
            fontSize: "12px", fontWeight: "600", color: t.text,
            lineHeight: "1.45", margin: 0,
            overflow: "hidden", display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          }}>
            {title || "Watch Video"}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "7px" }}>
            <Play size={8} color="#ef4444" />
            <span style={{ fontSize: "11px", color: t.textMuted, fontWeight: "500" }}>
              {url ? new URL(url).hostname.replace("www.", "") : "youtube.com"}
            </span>
            <ExternalLink size={10} color={t.textMuted} style={{ marginLeft: "auto" }} />
          </div>
        </div>
      </motion.div>
    </a>
  );
}

// ─── Roadmap Skill Card ────────────────────────────────────────────────────────
const RoadmapSkillCard = ({ skill, data, index, t, isDark }) => {
  const [open, setOpen] = useState(index === 0);
  const [activeLevel, setActiveLevel] = useState("beginner");
  const [showVideos, setShowVideos] = useState(false);

  const color = ["#7C3AED", "#06B6D4", "#14B8A6", "#F59E0B", "#A78BFA", "#F43F5E"][index % 6];
  const initial = skill.charAt(0).toUpperCase();
  const levels = ["beginner", "intermediate", "advanced"];

  const levelKeys = {
    beginner: t.levelBeginner || { bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.2)", color: "#14B8A6", dot: "#14B8A6" },
    intermediate: t.levelIntermediate || { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", color: "#F59E0B", dot: "#F59E0B" },
    advanced: t.levelAdvanced || { bg: "rgba(244,63,94,0.08)", border: "rgba(244,63,94,0.2)", color: "#F43F5E", dot: "#F43F5E" },
  };

  const videos = data?.resources || [];
  const firstVideo = videos[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.07 * index, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      style={{
        borderRadius: "20px", background: t.bgCard, border: `1px solid ${t.border}`,
        boxShadow: open ? `0 8px 40px ${color}15, ${t.inset}` : `0 2px 12px rgba(0,0,0,0.05)`,
        overflow: "hidden", transition: "box-shadow 0.3s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "16px 18px",
          display: "flex", alignItems: "center", gap: "12px",
          background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <div style={{
          width: "42px", height: "42px", borderRadius: "14px",
          background: `linear-gradient(135deg, ${color}25, ${color}10)`,
          border: `1px solid ${color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "17px", fontWeight: "800", color, flexShrink: 0,
          boxShadow: `0 4px 16px ${color}20`,
        }}>
          {initial}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", color: t.text, letterSpacing: "-0.3px" }}>
              {skill}
            </span>
            <span style={{
              fontSize: "10px", fontWeight: "700", padding: "2px 8px",
              borderRadius: "100px", textTransform: "uppercase", letterSpacing: "1px",
              background: `${color}12`, border: `1px solid ${color}25`, color,
            }}>
              Learning Path
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px", flexWrap: "wrap" }}>
            {levels.map(l => {
              const count = data?.[l]?.length || 0;
              if (!count) return null;
              const lc = levelKeys[l];
              return (
                <span key={l} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: t.textMuted }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: lc.dot, display: "inline-block" }} />
                  {count} {l}
                </span>
              );
            })}
            {videos.length > 0 && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: t.textMuted }}>
                <Play size={10} />
                {videos.length} videos
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "8px" }}>
          {levels.map(l => {
            const lc = levelKeys[l];
            const has = (data?.[l]?.length || 0) > 0;
            return (
              <div key={l} style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: has ? lc.dot : t.border, opacity: has ? 1 : 0.3,
              }} />
            );
          })}
        </div>
        <div style={{
          width: "30px", height: "30px", borderRadius: "10px",
          background: t.bgInput, border: `1px solid ${t.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: t.textMuted, flexShrink: 0,
        }}>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 18px 20px", borderTop: `1px solid ${t.border}` }}>
              <div style={{ display: "flex", gap: "8px", marginTop: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                {levels.map(l => {
                  const lc = levelKeys[l];
                  const has = (data?.[l]?.length || 0) > 0;
                  if (!has) return null;
                  const isActive = activeLevel === l;
                  return (
                    <button key={l} onClick={() => setActiveLevel(l)} style={{
                      padding: "7px 14px", borderRadius: "10px",
                      background: isActive ? lc.bg : "transparent",
                      border: `1px solid ${isActive ? lc.border : t.border}`,
                      color: isActive ? lc.color : t.textMuted,
                      fontSize: "12px", fontWeight: "700", cursor: "pointer",
                      transition: "all 0.2s", display: "flex", alignItems: "center", gap: "7px",
                      textTransform: "capitalize",
                    }}>
                      <span style={{ color: isActive ? lc.color : t.textMuted }}>{levelConfig[l]?.icon}</span>
                      {l}
                      <span style={{
                        fontSize: "10px", padding: "1px 7px", borderRadius: "100px",
                        background: isActive ? `${lc.dot}20` : t.bgInput,
                        color: isActive ? lc.color : t.textMuted,
                        border: `1px solid ${isActive ? lc.border : t.border}`,
                      }}>
                        {data?.[l]?.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              {data?.[activeLevel]?.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "8px" }}>
                  {data[activeLevel].map((topic, ti) => {
                    const lc = levelKeys[activeLevel] || levelKeys["beginner"];
                    return (
                      <motion.div key={ti}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: ti * 0.05 }}
                        whileHover={{ y: -2 }}
                        style={{
                          padding: "12px 14px", borderRadius: "14px",
                          background: lc.bg, border: `1px solid ${lc.border}`,
                          display: "flex", alignItems: "center", gap: "10px",
                          cursor: "default", transition: "all 0.2s",
                        }}
                      >
                        <div style={{
                          width: "22px", height: "22px", borderRadius: "8px",
                          background: `${lc.dot}20`, border: `1px solid ${lc.border}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "10px", fontWeight: "700", color: lc.color, flexShrink: 0,
                        }}>
                          {ti + 1}
                        </div>
                        <span style={{ fontSize: "13px", color: lc.color, fontWeight: "600", lineHeight: "1.4" }}>
                          {topic}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {videos.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <button
                    onClick={() => setShowVideos(v => !v)}
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: "14px",
                      background: t.bgInput, border: `1px solid ${t.border}`,
                      color: t.textSub, fontSize: "13px", fontWeight: "600",
                      cursor: "pointer", display: "flex", alignItems: "center",
                      justifyContent: "space-between", transition: "border-color 0.2s",
                    }}
                    onMouseOver={e => e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"}
                    onMouseOut={e => e.currentTarget.style.borderColor = t.border}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{
                        width: "26px", height: "26px", borderRadius: "8px",
                        background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <Play size={11} color="#ef4444" />
                      </span>
                      <span style={{ color: t.text, fontWeight: "700" }}>Video Resources</span>
                      <span style={{
                        fontSize: "11px", padding: "2px 10px", borderRadius: "100px",
                        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                        color: "#ef4444", fontWeight: "700",
                      }}>
                        {videos.length}
                      </span>
                    </span>
                    <motion.span animate={{ rotate: showVideos ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={16} color={t.textMuted} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {showVideos && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                          gap: "10px", marginTop: "12px",
                        }}>
                          {videos.map((video, vi) => (
                            <YoutubeThumbnail key={vi}
                              url={video?.url || video}
                              title={video?.title || video?.name || `Video ${vi + 1}`}
                              t={t}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end" }}>
                {firstVideo ? (
                  <a href={firstVideo?.url || firstVideo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{
                      padding: "10px 18px", borderRadius: "12px",
                      background: `linear-gradient(135deg, ${color}, ${color}bb)`,
                      color: "#fff", fontSize: "12px", fontWeight: "700",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: "7px",
                      boxShadow: `0 4px 16px ${color}30`,
                    }}>
                      <Play size={13} /> Start Learning <ArrowRight size={13} />
                    </motion.div>
                  </a>
                ) : (
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{
                    padding: "10px 18px", borderRadius: "12px",
                    background: `linear-gradient(135deg, ${color}, ${color}bb)`,
                    border: "none", color: "#fff", fontSize: "12px", fontWeight: "700",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "7px",
                    boxShadow: `0 4px 16px ${color}30`,
                  }}>
                    <Play size={13} /> Start Learning <ArrowRight size={13} />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Responsive hook ───────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Result() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const pdfRef = useRef();
  const { dark } = useThemeStore();
  const t = dark ? themes.dark : themes.light;
  const isMobile = useIsMobile();

  useEffect(() => {
    api.get(`/analysis/result/${id}`).then((res) => setData(res.data));
  }, [id]);

  const downloadReport = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(18); doc.text("ATS Resume Analysis Report", 20, y); y += 10;
    doc.setFontSize(10); doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, y); y += 10;
    doc.setFontSize(14); doc.text(`Score: ${data.score}%`, 20, y); y += 10;
    doc.setFontSize(12); doc.text(`Matched: ${data.matchedKeywords.length} | Missing: ${data.missingKeywords.length}`, 20, y); y += 10;
    doc.setFontSize(13); doc.text("Matched Skills:", 20, y); y += 8; doc.setFontSize(10);
    data.matchedKeywords.forEach((s) => { doc.text(`- ${s}`, 25, y); y += 6; if (y > 280) { doc.addPage(); y = 20; } });
    y += 5; doc.setFontSize(13); doc.text("Missing Skills:", 20, y); y += 8; doc.setFontSize(10);
    data.missingKeywords.forEach((s) => { doc.text(`- ${s}`, 25, y); y += 6; if (y > 280) { doc.addPage(); y = 20; } });
    if (data.aiSuggestions?.length) {
      y += 5; doc.setFontSize(13); doc.text("AI Suggestions:", 20, y); y += 8; doc.setFontSize(10);
      data.aiSuggestions.forEach((s) => { doc.text(`- ${s}`, 25, y); y += 6; if (y > 280) { doc.addPage(); y = 20; } });
    }
    doc.save(`ATS-Report-${data.score}.pdf`);
  };

  if (!data) return (
    <div style={{ minHeight: "100vh", background: t.bg, transition: "background 0.3s" }}>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "44px", height: "44px",
            border: `3px solid ${t.border}`, borderTop: "3px solid #7C3AED",
            borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: t.textMuted, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
            Loading Analysis
          </p>
        </div>
      </div>
    </div>
  );

  const categories = {
    Frontend: ["react", "vue", "angular", "html", "css", "typescript", "javascript", "nextjs"],
    Backend: ["node", "express", "python", "java", "spring", "django", "flask", "php"],
    Database: ["mongodb", "mysql", "postgresql", "redis", "firebase", "sql"],
    DevOps: ["docker", "kubernetes", "aws", "azure", "gcp", "git", "ci", "cd"],
  };

  const barData = Object.entries(categories)
    .map(([cat, skills]) => ({
      name: cat,
      matched: skills.filter(s => data.matchedKeywords?.includes(s)).length,
      missing: skills.filter(s => data.missingKeywords?.includes(s)).length,
    }))
    .filter(d => d.matched + d.missing > 0);

  const matchPct = data.matchedKeywords?.length && data.missingKeywords?.length
    ? Math.round((data.matchedKeywords.length / (data.matchedKeywords.length + data.missingKeywords.length)) * 100)
    : 0;

  const stats = [
    { value: data.matchedKeywords?.length ?? 0, label: "Matched", color: "#14B8A6" },
    { value: data.missingKeywords?.length ?? 0, label: "Missing", color: "#F43F5E" },
    { value: matchPct, label: "Match Rate", color: "#A78BFA", suffix: "%" },
    ...(data.ruleScore ? [{ value: data.ruleScore, label: "Rule Score", color: "#06B6D4" }] : []),
    ...(data.aiScore ? [{ value: data.aiScore, label: "AI Score", color: "#7C3AED" }] : []),
  ];

  return (
    <div style={{ minHeight: "100vh", background: t.bg, position: "relative", overflow: "hidden", transition: "background 0.3s ease" }}>
      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-15%", left: "50%", transform: "translateX(-50%)",
          width: "900px", height: "500px",
          background: `radial-gradient(ellipse, ${t.glow1} 0%, transparent 65%)`,
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "-10%",
          width: "600px", height: "600px",
          background: `radial-gradient(ellipse, ${t.glow2} 0%, transparent 65%)`,
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "-5%",
          width: "400px", height: "400px",
          background: `radial-gradient(ellipse, ${t.glow3} 0%, transparent 65%)`,
          filter: "blur(50px)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <Navbar />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "24px 14px 60px" : "40px 24px 80px" }}>

        {/* ── Page Header ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            marginBottom: "28px",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
          }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase",
              color: t.pillColor, marginBottom: "10px",
              padding: "5px 14px", borderRadius: "100px",
              background: t.pillBg, border: `1px solid ${t.pillBorder}`,
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: t.pillColor, display: "inline-block", animation: "pulse 2s infinite" }} />
              Analysis Complete
            </div>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <h1 style={{ fontSize: isMobile ? "24px" : "30px", fontWeight: "800", color: t.text, letterSpacing: "-1.2px", margin: 0 }}>
              Resume Analysis
            </h1>
            <p style={{ fontSize: "13px", color: t.textMuted, marginTop: "6px", fontWeight: "500" }}>
              {new Date(data.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={downloadReport}
              style={{
                padding: "10px 16px", borderRadius: "12px",
                background: t.bgCard, border: `1px solid ${t.border}`,
                color: t.textSub, fontSize: "13px", fontWeight: "600",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                backdropFilter: t.backdrop,
              }}>
              <Download size={15} /> {isMobile ? "PDF" : "Export PDF"}
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/analyze")}
              style={{
                padding: "10px 16px", borderRadius: "12px",
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                border: "none", color: "#fff", fontSize: "13px", fontWeight: "700",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
              }}>
              <Plus size={15} /> {isMobile ? "New" : "New Analysis"}
            </motion.button>
          </div>
        </motion.div>

        {/* ── HERO: Score ring + stats ── */}
        <GlassCard t={t} delay={0.1} style={{ marginBottom: "16px", padding: isMobile ? "28px 16px 24px" : "44px 40px 36px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "28px" }}>
            <ScoreRing score={data.score} t={t} />
            <p style={{
              fontSize: isMobile ? "18px" : "22px", fontWeight: "800", color: t.text,
              letterSpacing: "-0.8px", margin: "20px 0 8px", lineHeight: 1.3,
            }}>
              {data.score >= 70
                ? "Your resume is well-optimized "
                : data.score >= 40
                  ? "Your resume needs some improvements"
                  : "Your resume needs significant work"}
            </p>
            <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: "1.6", fontWeight: "500", maxWidth: "480px" }}>
              Based on AI + rule-based analysis of your resume against the job description.
            </p>
          </div>

          <div style={{
            height: "1px", marginBottom: "24px",
            background: `linear-gradient(90deg, transparent, ${t.border}, transparent)`,
          }} />

          {/* Stats row — wraps naturally on mobile */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {stats.map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} color={s.color} t={t} suffix={s.suffix || ""} />
            ))}
          </div>
        </GlassCard>

        {/* ── Skills Grid — stacks on mobile ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "16px", marginBottom: "16px",
        }}>
          <GlassCard t={t} delay={0.2}>
            <SectionTitle t={t}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#14B8A6", display: "inline-block", boxShadow: "0 0 8px #14B8A6" }} />
                Matched Skills
                <span style={{ marginLeft: "4px", fontSize: "11px", padding: "2px 10px", borderRadius: "100px", background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.25)", color: "#14B8A6", fontWeight: "700" }}>
                  {data.matchedKeywords?.length}
                </span>
              </span>
            </SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {data.matchedKeywords?.map(k => <SkillChip key={k} label={k} type="matched" t={t} />)}
            </div>
          </GlassCard>

          <GlassCard t={t} delay={0.25}>
            <SectionTitle t={t}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F43F5E", display: "inline-block", boxShadow: "0 0 8px #F43F5E" }} />
                Missing Skills
                <span style={{ marginLeft: "4px", fontSize: "11px", padding: "2px 10px", borderRadius: "100px", background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.25)", color: "#F43F5E", fontWeight: "700" }}>
                  {data.missingKeywords?.length}
                </span>
              </span>
            </SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {data.missingKeywords?.map(k => <SkillChip key={k} label={k} type="missing" t={t} />)}
            </div>
          </GlassCard>
        </div>

        {/* ── Bar Chart ── */}
        {barData.length > 0 && (
          <GlassCard t={t} delay={0.3} style={{ marginBottom: "16px" }}>
            <SectionTitle t={t} sub="Skills coverage across tech domains">Skills by Category</SectionTitle>
            <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
              <BarChart data={barData} barSize={isMobile ? 22 : 32} barGap={4} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke={t.gridLine} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: t.textMuted, fontSize: isMobile ? 11 : 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip t={t} />} cursor={{ fill: t.bgInput, radius: 8 }} />
                <Bar dataKey="matched" name="Matched" fill="#14B8A6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="missing" name="Missing" fill="#F43F5E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "12px" }}>
              {[["#14B8A6", "Matched"], ["#F43F5E", "Missing"]].map(([color, name]) => (
                <span key={name} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: t.textMuted, fontWeight: "600" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: color, display: "inline-block" }} />
                  {name}
                </span>
              ))}
            </div>
          </GlassCard>
        )}

        {/* ── AI Suggestions — stacks on mobile ── */}
        {data.aiSuggestions?.length > 0 && (
          <GlassCard t={t} delay={0.35} style={{ marginBottom: "16px" }}>
            <SectionTitle t={t} sub="Personalized recommendations from AI analysis">AI Suggestions</SectionTitle>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "10px",
            }}>
              {data.aiSuggestions.map((s, i) => <SuggestionCard key={i} text={s} index={i} t={t} />)}
            </div>
          </GlassCard>
        )}

        {/* ── Section Feedback ── */}
        {data.sectionFeedback && Object.keys(data.sectionFeedback).length > 0 && (
          <GlassCard t={t} delay={0.4} style={{ marginBottom: "16px" }}>
            <SectionTitle t={t} sub="How each resume section performs">Section Feedback</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {Object.entries(data.sectionFeedback).map(([key, val], i) => (
                <FeedbackRow key={key} label={key} text={val} index={i} t={t} />
              ))}
            </div>
          </GlassCard>
        )}

        {/* ── Roadmap ── */}
        {data.roadmap && Object.keys(data.roadmap).length > 0 && (
          <GlassCard t={t} delay={0.45} style={{ marginBottom: "16px" }}>
            <div style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "12px" : "0",
              marginBottom: "20px",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "10px",
                    background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Layers size={15} color="#A78BFA" />
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: t.text, margin: 0, letterSpacing: "-0.3px" }}>
                    AI Skill Roadmap
                  </h3>
                </div>
                <p style={{ fontSize: "12px", color: t.textMuted, margin: 0, paddingLeft: "42px", fontWeight: "500" }}>
                  Personalized learning paths for your missing skills
                </p>
              </div>
              <span style={{
                fontSize: "11px", padding: "5px 16px", borderRadius: "100px",
                background: t.pillBg, border: `1px solid ${t.pillBorder}`,
                color: t.pillColor, fontWeight: "700", alignSelf: isMobile ? "flex-start" : "center",
              }}>
                {Object.keys(data.roadmap).length} skills
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {Object.entries(data.roadmap).map(([skill, skillData], i) => (
                <RoadmapSkillCard key={skill} skill={skill} data={skillData} index={i} t={t} isDark={dark} />
              ))}
            </div>
          </GlassCard>
        )}

        {/* ── Action Row ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          style={{ display: "flex", gap: "10px", paddingBottom: "20px", flexWrap: "wrap" }}>
          {[
            { label: isMobile ? "New" : "New Analysis", action: () => navigate("/analyze"), primary: true, Icon: Plus },
            { label: isMobile ? "History" : "View History", action: () => navigate("/history"), primary: false, Icon: ChevronRight },
            { label: isMobile ? "PDF" : "Download PDF", action: downloadReport, primary: false, Icon: Download },
          ].map(({ label, action, primary, Icon }) => (
            <motion.button key={label} onClick={action}
              whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
              style={{
                flex: isMobile ? "1" : "0 0 auto",
                padding: "12px 20px", borderRadius: "14px",
                background: primary ? "linear-gradient(135deg, #7C3AED, #06B6D4)" : t.bgCard,
                border: primary ? "none" : `1px solid ${t.border}`,
                color: primary ? "#fff" : t.textSub,
                fontSize: "13px", fontWeight: "700", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                boxShadow: primary ? "0 4px 20px rgba(124,58,237,0.3)" : t.shadow,
                backdropFilter: primary ? "none" : t.backdrop,
              }}>
              <Icon size={15} />
              {label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div ref={pdfRef} style={{ position: "fixed", top: 0, left: 0, width: "210mm", background: "#ffffff", zIndex: "-1" }}>
        {data && <PDFReport data={data} />}
      </div>
    </div>
  );
}
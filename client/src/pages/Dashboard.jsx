import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import Navbar from "../components/Navbar";
import {
  BarChart3, TrendingUp, Award, FileText, ArrowRight,
  Sparkles, CheckCircle2, XCircle, ChevronRight,
} from "lucide-react";

/* ─── helpers ───────────────────────────────────────────────────── */
const scoreColor = (s) =>
  s >= 70 ? "#10b981" : s >= 40 ? "#f59e0b" : "#ef4444";

const scoreMeta = (s) =>
  s >= 70
    ? { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.22)", text: "#10b981" }
    : s >= 40
    ? { bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.22)",  text: "#f59e0b" }
    : { bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.22)",   text: "#ef4444" };

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

/* ─── animated counter ──────────────────────────────────────────── */
function AnimNumber({ value, suffix = "" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = parseInt(value) || 0;
    let cur = 0;
    const step = Math.max(1, Math.ceil(t / 30));
    const id = setInterval(() => {
      cur = Math.min(cur + step, t);
      setN(cur);
      if (cur >= t) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [value]);
  return <>{n}{suffix}</>;
}

/* ─── score arc ─────────────────────────────────────────────────── */
function ScoreArc({ score, size = 48 }) {
  const r = (size - 7) / 2;
  const c = 2 * Math.PI * r;
  const col = scoreColor(score);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth={5.5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col}
        strokeWidth={5.5} strokeLinecap="round"
        strokeDasharray={`${c * (score / 100)} ${c * (1 - score / 100)}`}
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
        fill={col} fontSize={size * 0.26} fontWeight="800" fontFamily="'Sora', sans-serif"
        style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>
        {score}
      </text>
    </svg>
  );
}

/* ─── component ─────────────────────────────────────────────────── */
export default function Dashboard() {
  const { user } = useAuthStore();
  const { dark } = useThemeStore();
  const [stats, setStats] = useState({ total: 0, avgScore: 0, best: 0 });
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/analysis/history").then((res) => {
      const data = res.data;
      setRecent(data.slice(0, 5));
      if (data.length > 0) {
        const avg = Math.round(data.reduce((a, b) => a + b.score, 0) / data.length);
        const best = Math.max(...data.map((d) => d.score));
        setStats({ total: data.length, avgScore: avg, best });
      }
    });
  }, []);

  const D = dark;

  const bg   = D ? "#07070f" : "#f3f4f8";
  const card = D ? "rgba(255,255,255,0.035)" : "#ffffff";
  const bord = D ? "rgba(255,255,255,0.07)"  : "rgba(210,210,235,0.9)";
  const txt  = D ? "#e5e7eb" : "#111827";
  const sub  = D ? "#6b7280" : "#9ca3af";

  const statCards = [
    { label: "Total Analyses", value: stats.total,    suffix: "",  icon: BarChart3,  accent: "#6366f1", accentBg: "rgba(99,102,241,0.09)",  desc: "analyses run" },
    { label: "Average Score",  value: stats.avgScore, suffix: "%", icon: TrendingUp, accent: "#3b82f6", accentBg: "rgba(59,130,246,0.09)",   desc: "across all runs" },
    { label: "Best Score",     value: stats.best,     suffix: "%", icon: Award,      accent: "#10b981", accentBg: "rgba(16,185,129,0.09)",   desc: "personal best" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@500;600;700&display=swap');

        .dash-page { transition: background 0.3s, color 0.3s; }

        .stat-card-d {
          border-radius: 20px;
          padding: 22px;
          border: 1px solid;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        @media (min-width: 640px) {
          .stat-card-d { padding: 26px; }
        }
        .stat-card-d:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 44px rgba(99,102,241,0.14) !important;
          border-color: rgba(99,102,241,0.28) !important;
        }

        .recent-row-d {
          border-radius: 16px;
          border: 1px solid;
          padding: 13px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          position: relative;
        }
        @media (min-width: 640px) {
          .recent-row-d { padding: 15px 18px; gap: 14px; }
        }
        .recent-row-d:hover {
          border-color: rgba(99,102,241,0.3) !important;
          transform: translateX(5px);
          box-shadow: -4px 0 0 #6366f1, 0 6px 24px rgba(99,102,241,0.09);
        }
        .recent-row-d:hover .rr-arrow { color: #6366f1 !important; transform: translateX(3px); }

        .rr-arrow { transition: color 0.22s, transform 0.22s; }

        .cta-grad {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff;
          font-weight: 600;
          font-size: 13.5px;
          letter-spacing: 0.01em;
          border: none;
          cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: 0 4px 18px rgba(99,102,241,0.3);
          white-space: nowrap;
        }
        @media (min-width: 640px) {
          .cta-grad { padding: 11px 26px; font-size: 14px; }
        }
        .cta-grad:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(99,102,241,0.4);
        }
        .cta-grad:active { transform: scale(0.97); }

        .score-chip {
          width: 44px; height: 44px;
          border-radius: 12px;
          border: 1.5px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 600; font-size: 14px;
          flex-shrink: 0; letter-spacing: -0.03em;
        }
        @media (min-width: 640px) {
          .score-chip { width: 50px; height: 50px; border-radius: 13px; font-size: 16px; }
        }

        .view-all-btn {
          background: none; border: none; cursor: pointer;
          font-size: 13px; font-weight: 600; color: #6366f1;
          display: flex; align-items: center; gap: 3px;
          font-family: 'Inter', sans-serif;
          padding: 0;
          transition: gap 0.18s ease;
        }
        .view-all-btn:hover { gap: 7px; }

        .empty-wrap {
          border-radius: 20px;
          border: 1.5px dashed rgba(99,102,241,0.22);
          padding: 48px 20px;
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        @media (min-width: 640px) {
          .empty-wrap { border-radius: 24px; padding: 72px 32px; }
        }

        .rr-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }
        @media (min-width: 400px) {
          .rr-meta { flex-direction: row; align-items: center; gap: 12px; }
        }

        .rr-arc {
          display: none;
        }
        @media (min-width: 480px) {
          .rr-arc { display: block; }
        }

        .greeting-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 32px;
        }
        @media (min-width: 640px) {
          .greeting-row {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 40px;
          }
        }

        .greeting-title {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          letter-spacing: -0.03em;
          font-size: 22px;
          margin: 0;
          line-height: 1.2;
        }
        @media (min-width: 640px) {
          .greeting-title { font-size: 28px; }
        }

        .stat-value {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 1;
          margin: 0;
          font-size: 30px;
        }
        @media (min-width: 640px) {
          .stat-value { font-size: 36px; }
        }
      `}</style>

      <div className="dash-page" style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: bg, color: txt }}>
        <Navbar />

        {/* ── bg texture ── */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `radial-gradient(circle at 20% 10%, rgba(99,102,241,0.07) 0%, transparent 55%),
                            radial-gradient(circle at 80% 80%, rgba(139,92,246,0.05) 0%, transparent 50%)`,
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "28px 16px 80px" }}>

          {/* ── GREETING ── */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="greeting-row"
          >
            <div>
              <h1 className="greeting-title" style={{ color: txt }}>
                Good day,{" "}
                <span style={{
                  background: "linear-gradient(135deg,#6366f1,#a78bfa)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                }}>
                  {user?.name}
                </span>{" "}
                👋
              </h1>
              <p style={{ margin: "6px 0 0", fontSize: 13.5, color: sub, letterSpacing: "0.02em" }}>
                Here's your resume analysis overview
              </p>
            </div>
            {recent.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="cta-grad"
                onClick={() => navigate("/analyze")}
              >
                <Sparkles style={{ width: 14, height: 14 }} />
                New Analysis
              </motion.button>
            )}
          </motion.div>

          {/* ── STAT CARDS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 32 }}>
            {statCards.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  className="stat-card-d"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.09, duration: 0.42 }}
                  style={{ background: card, borderColor: bord, boxShadow: D ? "none" : "0 2px 12px rgba(0,0,0,0.04)" }}
                >
                  {/* glow orb */}
                  <div style={{
                    position: "absolute", top: -20, right: -20,
                    width: 90, height: 90, borderRadius: "50%",
                    background: s.accent, opacity: D ? 0.06 : 0.05, pointerEvents: "none"
                  }} />
                  {/* icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, marginBottom: 14,
                    background: s.accentBg, border: `1px solid ${s.accent}28`,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Icon style={{ width: 16, height: 16, color: s.accent }} />
                  </div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: sub, margin: "0 0 5px" }}>
                    {s.label}
                  </p>
                  <p className="stat-value" style={{ color: s.accent }}>
                    <AnimNumber value={s.value} suffix={s.suffix} />
                  </p>
                  <p style={{ fontSize: 11.5, color: sub, marginTop: 4 }}>{s.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* ── RECENT ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: 15, margin: 0, color: txt }}>
              Recent Analyses
            </h3>
            <button className="view-all-btn" onClick={() => navigate("/history")}>
              View all <ChevronRight style={{ width: 13, height: 13 }} />
            </button>
          </div>

          {recent.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="empty-wrap"
              style={{ background: D ? "rgba(255,255,255,0.02)" : "#fff" }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 16, marginBottom: 16,
                background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <FileText style={{ width: 24, height: 24, color: "#6366f1" }} />
              </div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: 17, marginBottom: 8, color: txt }}>
                No analyses yet
              </h3>
              <p style={{ color: sub, fontSize: 13.5, maxWidth: 310, marginBottom: 24, lineHeight: 1.65, textAlign: "center" }}>
                Upload your first resume and job description to get instant feedback and an ATS matching score.
              </p>
              <button className="cta-grad" onClick={() => navigate("/analyze")}>
                <Sparkles style={{ width: 14, height: 14 }} />
                Analyze your first resume
              </button>
            </motion.div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recent.map((r, i) => {
                const cm = scoreMeta(r.score);
                return (
                  <motion.div
                    key={r._id}
                    className="recent-row-d"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.065 }}
                    onClick={() => navigate(`/result/${r._id}`)}
                    style={{ background: card, borderColor: bord, boxShadow: D ? "none" : "0 1px 6px rgba(0,0,0,0.04)" }}
                  >
                    {/* score chip */}
                    <div className="score-chip" style={{ background: cm.bg, borderColor: cm.border, color: cm.text }}>
                      {r.score}
                    </div>

                    {/* info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: 13.5, margin: 0, color: txt }}>
                        {fmtDate(r.createdAt)}
                      </p>
                      <div className="rr-meta" style={{ marginTop: 4 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
                          <CheckCircle2 style={{ width: 11, height: 11, color: "#10b981", flexShrink: 0 }} />
                          <span style={{ color: "#10b981", fontWeight: 600 }}>{r.matchedKeywords?.length || 0}</span>
                          <span style={{ color: sub }}>matched</span>
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
                          <XCircle style={{ width: 11, height: 11, color: "#ef4444", flexShrink: 0 }} />
                          <span style={{ color: "#ef4444", fontWeight: 600 }}>{r.missingKeywords?.length || 0}</span>
                          <span style={{ color: sub }}>missing</span>
                        </span>
                      </div>
                    </div>

                    {/* arc — hidden on very small screens */}
                    <div className="rr-arc">
                      <ScoreArc score={r.score} size={42} />
                    </div>

                    {/* arrow */}
                    <ArrowRight className="rr-arrow" style={{ width: 14, height: 14, color: D ? "#374151" : "#d1d5db", flexShrink: 0 }} />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
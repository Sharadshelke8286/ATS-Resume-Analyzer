import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import useThemeStore from "../store/themeStore";
import { CheckCircle2, XCircle, ArrowRight, FileText, Sparkles, Clock } from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { dark } = useThemeStore();

  useEffect(() => {
    api.get("/analysis/history").then((res) => {
      setHistory(res.data);
      setLoading(false);
    });
  }, []);

  const scoreColor = (s) =>
    s >= 70 ? "#10b981" : s >= 40 ? "#f59e0b" : "#f43f5e";

  const scoreGradient = (s) =>
    s >= 70
      ? "from-emerald-500 to-teal-400"
      : s >= 40
        ? "from-amber-500 to-orange-400"
        : "from-rose-500 to-pink-400";

  const scoreBg = (s) =>
    s >= 70
      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
      : s >= 40
        ? "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
        : "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400";

  const scoreLabel = (s) =>
    s >= 70 ? "Strong Match" : s >= 40 ? "Moderate Match" : "Low Match";

  const avgScore =
    history.length > 0
      ? Math.round(history.reduce((a, b) => a + (b.score || 0), 0) / history.length)
      : 0;

  const bestScore = history.length > 0 ? Math.max(...history.map((r) => r.score || 0)) : 0;

  const Ring = ({ score, size = 64, stroke = 5 }) => {
    const r = (size - stroke * 2) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;
    const color = scoreColor(score);
    return (
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease", filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
    );
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[#f0f2fa] dark:bg-[#080b14] transition-colors duration-300 relative overflow-x-hidden">

        {/* Background mesh */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-200/40 dark:bg-violet-900/20 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <Navbar />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-5 py-8 sm:py-12">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 dark:text-indigo-400" />
              </div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400">
                Analysis History
              </span>
            </div>
            <h1
              className="text-gray-900 dark:text-white text-3xl sm:text-5xl font-black tracking-tight leading-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Your Resume
              <span className="ml-2 sm:ml-3 bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-3 text-sm sm:text-base font-medium">
              Track your progress and revisit past analyses
            </p>
          </motion.div>

          {/* ── Loading ── */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-72 gap-5">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin" />
                <Sparkles className="absolute inset-0 m-auto w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
              <p className="text-gray-500 dark:text-slate-400 font-medium tracking-wide animate-pulse">
                Loading your history…
              </p>
            </div>
          ) : history.length === 0 ? (

            /* ── Empty State ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 dark:border-white/5 bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl px-6 py-16 sm:p-20 text-center shadow-xl dark:shadow-2xl"
            >
              <div className="relative mb-6 sm:mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <span className="text-white text-xs font-bold">0</span>
                </div>
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                No analyses yet
              </h3>
              <p className="text-gray-500 dark:text-slate-400 mb-7 sm:mb-8 max-w-sm leading-relaxed text-sm sm:text-base">
                You haven't analyzed any resumes yet. Start now and get AI-powered insights to land your dream job.
              </p>
              <button
                onClick={() => navigate("/analyze")}
                className="group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Analyze your first resume
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>

          ) : (
            <>
              {/* ── History Cards ── */}
              <div className="space-y-3">
                <AnimatePresence>
                  {history.map((r, i) => (
                    <motion.div
                      key={r._id}
                      initial={{ opacity: 0, y: 24, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 22 }}
                      onClick={() => navigate(`/result/${r._id}`)}
                      className="group relative rounded-2xl border border-gray-200/80 dark:border-white/[0.06] bg-white/90 dark:bg-white/[0.03] backdrop-blur-xl p-4 sm:p-5 cursor-pointer hover:border-indigo-400/60 dark:hover:border-indigo-500/40 hover:bg-white dark:hover:bg-white/[0.055] transition-all duration-300 overflow-hidden shadow-sm dark:shadow-none"
                      style={{
                        boxShadow: dark ? "0 2px 20px rgba(0,0,0,0.3)" : "0 2px 12px rgba(99,102,241,0.06)",
                      }}
                      whileHover={{
                        y: -2,
                        boxShadow: dark
                          ? "0 8px 40px rgba(99,102,241,0.12)"
                          : "0 8px 30px rgba(99,102,241,0.15)",
                      }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {/* Hover glow line */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b ${scoreGradient(r.score || 0)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      <div className="flex items-center justify-between gap-3 sm:gap-4">
                        {/* Left: Ring + Info */}
                        <div className="flex items-center gap-3 sm:gap-5 min-w-0">

                          {/* Score Ring — smaller on mobile */}
                          <div className="relative shrink-0 flex items-center justify-center">
                            <div className="block sm:hidden">
                              <Ring score={r.score || 0} size={52} stroke={4} />
                            </div>
                            <div className="hidden sm:block">
                              <Ring score={r.score || 0} size={64} stroke={4} />
                            </div>
                            <span
                              className="absolute text-sm sm:text-lg font-black text-gray-800 dark:text-white"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {r.score || 0}
                            </span>
                          </div>

                          {/* Info */}
                          <div className="min-w-0">
                            <h4
                              className="font-bold text-gray-800 dark:text-white text-sm sm:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300 truncate"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {new Date(r.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </h4>

                            <span
                              className={`inline-block mt-1 mb-2 px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase border ${scoreBg(r.score || 0)}`}
                            >
                              {scoreLabel(r.score || 0)}
                            </span>

                            {/* Keyword Pills */}
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-semibold">
                                  {r.matchedKeywords?.length || 0} Matched
                                </span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-rose-500/10 border border-rose-500/20">
                                <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-600 dark:text-rose-400" />
                                <span className="text-rose-600 dark:text-rose-400 text-[11px] sm:text-xs font-semibold">
                                  {r.missingKeywords?.length || 0} Missing
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Score bar + Arrow */}
                        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                          {/* Mini bar chart — desktop only */}
                          <div className="hidden sm:flex items-end gap-[3px] h-10">
                            {[...Array(5)].map((_, idx) => {
                              const height = Math.max(20, Math.round(((r.score || 0) / 100) * 40) - (4 - idx) * 4);
                              return (
                                <div
                                  key={idx}
                                  className={`w-1.5 rounded-full bg-gradient-to-t ${scoreGradient(r.score || 0)} opacity-${idx === 4 ? "100" : idx === 3 ? "80" : idx === 2 ? "60" : idx === 1 ? "40" : "20"}`}
                                  style={{ height: `${height}px`, transition: "height 0.5s ease" }}
                                />
                              );
                            })}
                          </div>

                          {/* Arrow */}
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-300 dark:group-hover:border-indigo-500/30 transition-all duration-300">
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* ── Footer CTA ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: history.length * 0.06 + 0.3 }}
                className="mt-8 text-center"
              >
                <button
                  onClick={() => navigate("/analyze")}
                  className="group inline-flex items-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/20 dark:to-violet-500/20 border border-indigo-400/30 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-semibold text-sm hover:from-indigo-500/20 hover:to-violet-500/20 dark:hover:from-indigo-500/30 dark:hover:to-violet-500/30 hover:border-indigo-400/60 dark:hover:border-indigo-500/40 hover:text-indigo-700 dark:hover:text-indigo-200 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Run another analysis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            </>
          )}
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        `}</style>
      </div>
    </div>
  );
}
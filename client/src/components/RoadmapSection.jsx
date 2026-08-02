// components/RoadmapSection.jsx
// Collapsible accordion section (Beginner / Intermediate / Advanced)

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiSettings, FiZap } from "react-icons/fi";

const SECTION_CONFIG = {
  beginner: {
    label: "Beginner",
    Icon: FiBook,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  intermediate: {
    label: "Intermediate",
    Icon: FiSettings,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  advanced: {
    label: "Advanced",
    Icon: FiZap,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    dot: "bg-indigo-400",
  },
};

export default function RoadmapSection({ level, topics = [] }) {
  const [open, setOpen] = useState(level === "beginner"); // beginner open by default
  const config = SECTION_CONFIG[level] || SECTION_CONFIG.beginner;
  const { label, Icon, color, bg, border, dot } = config;

  return (
    <div className={`rounded-xl border ${border} ${bg} overflow-hidden`}>
      {/* Header — clickable toggle */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3
          hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-2">
          <Icon className={`${color} text-base`} />
          <span className={`text-sm font-semibold ${color}`}>{label}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${bg} border ${border} ${color}`}>
            {topics.length} topics
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`${color} text-xs`}
        >
          ▼
        </motion.span>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 space-y-2">
              {topics.map((topic, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${dot} mt-1.5 flex-shrink-0`} />
                  <span className="text-sm dark:text-slate-300 text-gray-600 leading-relaxed">
                    {topic}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
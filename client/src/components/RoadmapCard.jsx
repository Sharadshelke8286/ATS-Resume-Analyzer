// components/RoadmapCard.jsx
// Full card for a single skill: title + roadmap + videos

import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlayCircle, FiChevronDown } from "react-icons/fi";
import RoadmapSection from "./RoadmapSection";
import VideoCard from "./VideoCard";

export default function RoadmapCard({ skill, data, index }) {
  const [showVideos, setShowVideos] = useState(false);

  // First video for "Start Learning"
  const firstVideo = data?.resources?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="dark:bg-slate-900/80 bg-white rounded-2xl border
      dark:border-slate-700/50 border-gray-200
      p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* 🔹 Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {/* Skill Badge */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600
            flex items-center justify-center shadow-md shadow-indigo-500/20">
            <span className="text-white font-bold text-sm">
              {skill?.charAt(0)?.toUpperCase()}
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold dark:text-white text-gray-900">
              {skill}
            </h3>
            <p className="text-xs dark:text-slate-400 text-gray-500 mt-0.5">
              Learning Roadmap
            </p>
          </div>
        </div>

        {/* 🚀 Start Learning Button */}
        {firstVideo && (
          <a
            href={firstVideo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
              bg-gradient-to-r from-indigo-500 to-purple-600
              text-white hover:opacity-90 transition-all
              shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40"
          >
            <FiPlayCircle className="text-sm" />
            Start Learning
          </a>
        )}
      </div>

      {/* 📘 Roadmap Sections */}
      <div className="space-y-2.5 mb-5">
        {["beginner", "intermediate", "advanced"].map((level) => (
          <RoadmapSection
            key={level}
            level={level}
            topics={data?.[level] || []}
          />
        ))}
      </div>

      {/* 🎥 Video Resources */}
      {data?.resources?.length > 0 && (
        <div>
          {/* Toggle Button */}
          <button
            onClick={() => setShowVideos((prev) => !prev)}
            className="w-full flex items-center justify-between
              px-4 py-3 rounded-xl
              dark:bg-slate-800/60 bg-gray-50
              border dark:border-slate-700/50 border-gray-200
              dark:text-slate-300 text-gray-600
              hover:border-indigo-500/50 transition-all text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              <span className="text-red-500"></span>
              Video Resources
              <span className="text-xs px-2 py-0.5 rounded-full
                bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                {data.resources.length}
              </span>
            </span>

            <motion.span
              animate={{ rotate: showVideos ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown className="text-base" />
            </motion.span>
          </button>

          {/* 🎬 Video Grid */}
          {showVideos && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.25 }}
              className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {data.resources.map((video, i) => (
                <VideoCard key={i} video={video} />
              ))}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}
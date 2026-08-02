const Analysis = require("../models/Analysis");
const { parseResume } = require("../services/parser");
const { getAllKeywords } = require("../services/keyword");
const { matchSkills, calculateScore, detectSections, atsCheck } = require("../services/matcher");
const { analyzeWithAI } = require("../services/ai");
const log = require("../utils/logger");
const { generateRoadmap } = require("../services/ai");
const { getVideos } = require("../services/youtube");

exports.analyzeResume = async (req, res) => {
  try {
    log("info", "Analysis started", req.user.id);

    if (!req.file) {
      return res.status(400).json({ message: "Resume file required" });
    }

    const { jd } = req.body;
    if (!jd) {
      return res.status(400).json({ message: "Job description required" });
    }

    // 1. Parse resume
    const resumeText = await parseResume(req.file.path, req.file.mimetype);
    log("info", "Resume parsed, length:", resumeText.length);

    // 2. Extract keywords
    const keywords = getAllKeywords(jd);
    log("info", "Keywords extracted:", keywords.length);

    // 3. Match skills
    const { matched, missing } = matchSkills(resumeText, keywords);

    let ruleScore = calculateScore(matched, keywords.length);
    if (isNaN(ruleScore)) ruleScore = 0;

    log("info", "Rule-based score:", ruleScore);

    // 4. AI Analysis
    const aiResult = await analyzeWithAI(resumeText, jd);

    let aiScore = aiResult?.score;
    if (isNaN(aiScore) || aiScore === undefined) aiScore = 0;

    log("info", "AI score:", aiScore);

    // 5. Final Score
    const finalScore = Math.round((ruleScore * 0.6) + (aiScore * 0.4));

    // 6. Extra checks
    const sections = detectSections(resumeText);
    const ats = atsCheck(resumeText);

    // 7. Save to DB
    const analysis = await Analysis.create({
      userId: req.user.id,
      resumeText,
      jdText: jd,

      // ✅ SAVE SCORES
      score: finalScore,
      ruleScore: ruleScore,
      aiScore: aiScore,

      matchedKeywords: matched,
      missingKeywords: [...new Set([...missing, ...(aiResult.missingSkills || [])])],
      aiSuggestions: aiResult.suggestions || [],
      sectionFeedback: aiResult.sectionFeedback || {},
      atsCheck: ats,
    });

    log("success", "Analysis saved, ID:", analysis._id);

    // 8. Response
// 8. Prepare response payload (DON’T send yet)
const responsePayload = {
  id: analysis._id,
  score: finalScore,
  ruleScore,
  aiScore,
  matchedKeywords: matched,
  missingKeywords: [...new Set([...missing, ...(aiResult.missingSkills || [])])],
  aiSuggestions: aiResult.suggestions || [],
  sectionFeedback: aiResult.sectionFeedback || {},
  sections,
  atsCheck: ats,
};

// ── NEW: Add roadmap + videos ─────────────────────────────
// ── ROADMAP + VIDEOS ─────────────────────────────
try {
  const allMissing = [
    ...new Set([...missing, ...(aiResult.missingSkills || [])]),
  ];

  if (allMissing.length > 0) {
    const roadmap = await generateRoadmap(allMissing);

    for (const skill of Object.keys(roadmap)) {
      const queries = roadmap[skill].searchQueries || [];
      const videoResults = [];

      const MAX_VIDEOS_PER_SKILL = 4;

      for (const query of queries.slice(0, 3)) {
        if (videoResults.length >= MAX_VIDEOS_PER_SKILL) break;
        if (!query || query.trim() === "") continue;

        try {
let videos = [];

try {
  videos = await getVideos(query, 2);
} catch (err) {
  log("warn", "YouTube failed", query);
}

if (!videos || videos.length === 0) {
  continue; // skip instead of fake data
}
          for (const v of videos) {
            if (videoResults.length >= MAX_VIDEOS_PER_SKILL) break;
            videoResults.push(v);
          }
        } catch (err) {
          log("warn", "YouTube fetch failed", query);
        }
      }

      const seen = new Set();
      roadmap[skill].resources = videoResults
        .filter((v) => {
          if (!v.url || seen.has(v.url)) return false;
          seen.add(v.url);
          return true;
        })
        .slice(0, MAX_VIDEOS_PER_SKILL);
    }

    const safeRoadmap = {};
    for (const key of Object.keys(roadmap)) {
      const safeKey = key.replace(/\./g, "");
      safeRoadmap[safeKey] = roadmap[key];
    }

    await Analysis.findByIdAndUpdate(analysis._id, {
      roadmap: safeRoadmap,
    });

    responsePayload.roadmap = roadmap;
  }

} catch (err) {
  log("error", "Roadmap failed (safe fallback)", err.message);
}

// ✅ ALWAYS SEND RESPONSE (OUTSIDE EVERYTHING)
res.json(responsePayload);

} catch (err) {
  log("error", "Analysis error", err.message);
  res.status(500).json({ message: "Analysis failed: " + err.message });
}
};
// 📜 HISTORY
exports.getHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.user.id })
      .select("score ruleScore aiScore matchedKeywords missingKeywords createdAt") // ✅ include scores
      .sort({ createdAt: -1 });

    res.json(analyses);
  } catch (err) {
    log("error", "History fetch error", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 📊 RESULT BY ID
exports.getResultById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!analysis) {
      return res.status(404).json({ message: "Not found" });
    }

const result = analysis.toObject();

// ✅ convert Map → plain object
if (result.roadmap instanceof Map) {
  result.roadmap = Object.fromEntries(result.roadmap);
}

res.json(result);
  } catch (err) {
    log("error", "Result fetch error", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
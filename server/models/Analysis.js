const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  resumeText: { type: String },
  jdText: { type: String },

  // ✅ SCORES (TOP LEVEL — IMPORTANT)
  score: { type: Number },
  ruleScore: { type: Number },   // ✅ ADD HERE
  aiScore: { type: Number },     // ✅ ADD HERE

  matchedKeywords: [String],
  missingKeywords: [String],
  aiSuggestions: [String],

  sectionFeedback: {
    experience: String,
    skills: String,
    projects: String,
    education: String,
  },

  atsCheck: {
    hasTables: Boolean,
    properSections: Boolean,
  },
  roadmap: {
  type: Map,
  of: Object,
  default: {},
},

}, { timestamps: true });

module.exports = mongoose.model("Analysis", analysisSchema);
// ✅ Escape regex special characters
const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const matchSkills = (resumeText, keywords) => {
  const resume = resumeText.toLowerCase();

  const matched = [];   // ✅ FIX 1
  const missing = [];   // ✅ FIX 1

  keywords.forEach((skill) => {
    try {
      const safeSkill = escapeRegex(skill.toLowerCase());

      // ❌ REMOVE \b (causes error for c++, node.js)
      const regex = new RegExp(safeSkill, "i");

      if (regex.test(resume)) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    } catch (err) {
      console.log("Regex error for skill:", skill);
      missing.push(skill);
    }
  });

  return { matched, missing };
};

const calculateScore = (matched, total) =>
  total === 0 ? 0 : Math.round((matched.length / total) * 100);

const detectSections = (resume) => {
  const text = resume.toLowerCase();
  return {
    skills: text.includes("skills"),
    experience: text.includes("experience"),
    projects: text.includes("projects"),
    education: text.includes("education"),
    summary: text.includes("summary") || text.includes("objective"),
  };
};

const atsCheck = (resume) => {
  const text = resume.toLowerCase();
  return {
    hasTables: resume.includes("|"),
    properSections: text.includes("experience") && text.includes("skills"),
  };
};

module.exports = { matchSkills, calculateScore, detectSections, atsCheck };
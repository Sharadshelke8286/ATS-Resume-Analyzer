const stopwords = new Set([
  "the","and","is","in","at","of","a","to","for","with","on","are","be",
  "this","that","we","you","will","have","from","or","an","by","our","your",
  "as","it","its","was","but","not","they","he","she","all","been","has",
  "had","do","does","did","can","could","would","should","may","might",
  "shall","must","need","used","use","using","work","working","works",
  "looking","seeking","preferred","plus","related","required","strong",
  "good","great","excellent","ability","minimum","maximum","least","most",
  "years","year","team","teams","member","members","candidate","candidates",
  "degree","field","bachelor","master","knowledge","understanding","hands",
  "experience","experienced","including","include","includes","etc","well",
  "also","both","new","high","key","role","based","level","across","within",
  "help","helps","build","building","design","designing","develop","developing",
  "manage","managing","support","supporting","provide","providing","ensure",
  "ensuring","responsible","responsibilities","preferred","required","plus",
  "equivalent","relevant","related","similar","following","general","specific",
  "such","other","various","multiple","different","additional","bonus","nice","problem","solving","solve","solution","solutions","implement","implementation",
"maintain","maintenance","collaborate","collaboration","communicate","communication",
"analytical","interpersonal","organizational","verbal","written","proactive",
"self","motivated","driven","passionate","dynamic","innovative","creative"
]);

// server/services/keyword.js

// 🔥 INDUSTRY-LEVEL CLEAN KEYWORD SYSTEM

const techSkills = [
  // Languages
  "javascript","typescript","python","java","c++","c#","php","ruby",
  "swift","kotlin","go","rust","scala","r",

  // Frontend
  "react","nextjs","vue","angular","html","css","tailwind","bootstrap","redux",

  // Backend
  "node","express","django","flask","spring","springboot","fastapi","nestjs",

  // Databases
  "mongodb","mysql","postgresql","sqlite","redis","firebase","dynamodb",

  // DevOps / Cloud
  "aws","azure","gcp","docker","kubernetes","jenkins","terraform","nginx",
  "linux","git","github","gitlab","ci","cd","cicd","devops",

  // APIs
  "rest","graphql","grpc","api","jwt","oauth",

  // AI/ML
  "machine learning","deep learning","tensorflow","pytorch","nlp",

  // Tools
  "jira","figma","postman","swagger",

  // Others
  "microservices","websocket","kafka","rabbitmq","agile","scrum"
];

// SYNONYMS NORMALIZATION (VERY IMPORTANT)
const synonyms = {
  js: "javascript",
  ts: "typescript",
  "node.js": "node",
  "react.js": "react",
  "next.js": "nextjs",
  "express.js": "express",
  "mongo": "mongodb",
  "postgres": "postgresql",
  "ci/cd": "cicd",
  "rest api": "rest",
  "restful": "rest",
};

// 🔥 NORMALIZE TEXT
const normalizeText = (text) => {
  let cleaned = text.toLowerCase();

  // replace synonyms
  Object.keys(synonyms).forEach((key) => {
    const regex = new RegExp(`\\b${key}\\b`, "g");
    cleaned = cleaned.replace(regex, synonyms[key]);
  });

return cleaned; // ✅ DO NOT remove symbol
};

// 🔥 EXTRACT ONLY VALID TECH SKILLS
const extractTechKeywords = (text) => {
  const normalized = normalizeText(text);

  return techSkills.filter((skill) => {
    try {
      const safeSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // ✅ escape

      // ❌ REMOVE \b (same problem as matcher)
      const regex = new RegExp(safeSkill, "i");

      return regex.test(normalized);
    } catch (err) {
      console.log("Keyword regex error:", skill);
      return false;
    }
  });
};

// 🔥 FINAL FUNCTION (STRICT FILTERING)
const getAllKeywords = (jd) => {
  if (!jd) return [];

  const tech = extractTechKeywords(jd);

  // ✅ ONLY TECH SKILLS (NO GENERIC WORDS)
  return [...new Set(tech)];
};

module.exports = {
  getAllKeywords,
  cleanText: normalizeText,
};
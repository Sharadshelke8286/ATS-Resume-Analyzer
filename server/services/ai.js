const Groq = require("groq-sdk");
const log = require("../utils/logger");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeWithAI = async (resumeText, jdText) => {
  try {
    const prompt = `You are an expert ATS resume analyzer. Analyze the resume against the job description below.

Return ONLY a valid JSON object — no extra text, no markdown, no backticks.

{
  "score": <number between 0 and 100>,
  "missingSkills": ["skill1", "skill2", "skill3"],
  "suggestions": [
    "Specific suggestion 1",
    "Specific suggestion 2",
    "Specific suggestion 3"
  ],
  "sectionFeedback": {
    "experience": "Detailed feedback on experience section",
    "skills": "Detailed feedback on skills section",
    "projects": "Detailed feedback on projects section",
    "education": "Detailed feedback on education section"
  }
}

RESUME:
${resumeText.substring(0, 3000)}

JOB DESCRIPTION:
${jdText.substring(0, 2000)}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an ATS resume analyzer. Always respond with valid JSON only. No extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const text = completion.choices[0]?.message?.content || "";
    log("info", "Groq raw response length:", text.length);

    // Clean and parse JSON
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    log("success", "Groq AI analysis complete, score:", parsed.score);
    return parsed;

  } catch (err) {
    log("error", "Groq AI error", err.message);
    console.error("GROQ FULL ERROR:", err);
    return {
      score: 50,
      missingSkills: [],
      suggestions: [
        "Could not get AI analysis. Rule-based score used.",
        "Try again in a few seconds.",
      ],
      sectionFeedback: {
        experience: "AI analysis unavailable",
        skills: "AI analysis unavailable",
        projects: "AI analysis unavailable",
        education: "AI analysis unavailable",
      },
    };
  }
};
// ADD this new function to your existing ai.js (keep analyzeWithAI unchanged)

const generateRoadmap = async (skills) => {
  // Fallback static roadmap in case AI or YouTube fails
  const fallback = {};
  skills.forEach((skill) => {
    fallback[skill] = {
      beginner: [`Learn ${skill} basics`, `Set up ${skill} environment`],
      intermediate: [`Build projects with ${skill}`, `Understand core ${skill} concepts`],
      advanced: [`Master advanced ${skill} patterns`, `Optimize ${skill} in production`],
      searchQueries: [
        `${skill} beginner full course`,
        `${skill} tutorial for beginners`,
        `${skill} advanced concepts`,
      ],
      resources: [],
    };
  });

  try {
    const skillList = skills.slice(0, 8).join(", "); // limit to 8 skills to stay within token limits

    const prompt = `You are a technical learning roadmap expert.

For each of these skills: ${skillList}

Return ONLY a valid JSON object — no markdown, no backticks, no extra text.

Format:
{
  "SkillName": {
    "beginner": ["topic1", "topic2", "topic3"],
    "intermediate": ["topic1", "topic2", "topic3"],
    "advanced": ["topic1", "topic2", "topic3"],
    "searchQueries": [
      "${skillList.split(",")[0]} beginner full course",
      "${skillList.split(",")[0]} tutorial",
      "${skillList.split(",")[0]} advanced guide"
    ]
  }
}

Rules:
- Each level must have exactly 3 topics
- searchQueries must have exactly 3 YouTube-friendly search strings
- Keys must match skill names exactly
- Return valid JSON only`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a learning roadmap generator. Always respond with valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const text = completion.choices[0]?.message?.content || "";

    // Clean and parse safely
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    log("success", "Roadmap AI generation complete");

    // Attach empty resources array (YouTube will fill these later)
    const roadmap = {};
    for (const skill of skills) {
      // Use AI result if available, otherwise fallback
      const key = Object.keys(parsed).find(
        (k) => k.toLowerCase() === skill.toLowerCase()
      );
      roadmap[skill] = key
        ? { ...parsed[key], resources: [] }
        : fallback[skill];
    }

    return roadmap;
  } catch (err) {
    log("error", "generateRoadmap AI error", err.message);
    return fallback; // always return something usable
  }
};

module.exports = { analyzeWithAI, generateRoadmap }; // ← update exports

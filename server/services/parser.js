const pdfParse = require("pdf-parse");
const pdf = pdfParse.default || pdfParse;
console.log("PDF TYPE:", typeof pdf);
const mammoth = require("mammoth");
const fs = require("fs");
const log = require("../utils/logger");

const parseResume = async (filePath, mimetype) => {
  try {
    const buffer = fs.readFileSync(filePath);

    if (mimetype === "application/pdf") {
      const data = await pdf(buffer); // ✅ now works
      log("success", "PDF parsed");
      return data.text;
    }

    if (mimetype.includes("wordprocessingml")) {
      const result = await mammoth.extractRawText({ buffer });
      log("success", "DOCX parsed");
      return result.value;
    }

    throw new Error("Unsupported file type");
  } catch (err) {
    log("error", "Parse error", err.message);
    throw err;
  } finally {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};

module.exports = { parseResume };
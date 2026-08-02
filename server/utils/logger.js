const log = (type, message, data = "") => {
  const time = new Date().toISOString();
  const icons = { info: "ℹ️", success: "✅", error: "❌", warn: "⚠️" };
  console.log(`[${time}] ${icons[type] || "📌"} ${message}`, data);
};

module.exports = log;
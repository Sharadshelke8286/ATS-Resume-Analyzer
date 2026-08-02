// services/youtube.js
// ✅ NEW: YouTube scraping (NO API, NO LIMIT)

const youtubesearchapi = require("youtube-search-api");
const log = require("../utils/logger");

const getVideos = async (query, maxResults = 3) => {
  try {
    if (!query || query.trim() === "") return [];

    const result = await youtubesearchapi.GetListByKeyword(
      query,
      false,
      maxResults
    );

    if (!result?.items) return [];

    return result.items
      .filter((item) => item.type === "video")
      .map((item) => ({
        title: item.title,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        thumbnail:
          item.thumbnail?.thumbnails?.[0]?.url ||
          item.thumbnail?.thumbnails?.[1]?.url ||
          "",
        type: "video",
      }));

  } catch (err) {
    log("error", "YouTube SCRAPER error", err.message);
    return [];
  }
};

module.exports = { getVideos };
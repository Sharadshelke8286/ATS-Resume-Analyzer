// components/VideoCard.jsx
// Displays a single YouTube video as a clickable thumbnail card

export default function VideoCard({ video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl overflow-hidden border 
      dark:border-slate-700/50 border-gray-200 
      dark:bg-slate-800/60 bg-white 
      hover:border-indigo-500/60 transition-all duration-200
      hover:shadow-lg hover:shadow-indigo-500/10"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video bg-slate-800">
      {video?.thumbnail && video.thumbnail !== "" ?  (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover 
            group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl">▶</span>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center 
          bg-black/0 group-hover:bg-black/30 transition-all duration-200">
          <div className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center 
            opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-white text-sm">▶</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="p-3 text-sm line-clamp-2 text-gray-700 dark:text-gray-200">
        {video.title}
      </div>
    </a>
  );
}
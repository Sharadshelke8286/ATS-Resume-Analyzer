import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleFile = (f) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(f.type)) { toast.error("Only PDF or DOCX files allowed"); return; }
    setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { toast.error("Please upload your resume"); return; }
    if (!jd.trim()) { toast.error("Please paste the job description"); return; }
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jd", jd);
    try {
      const res = await api.post("/analysis/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Analysis complete!");
      navigate(`/result/${res.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-slate-950 bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-3xl font-bold dark:text-white text-gray-900">Analyze Resume</h2>
          <p className="dark:text-slate-400 text-gray-500 mt-1">Upload your resume and paste the job description to get your ATS score</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Zone */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                dragOver
                  ? "border-indigo-500 bg-indigo-500/10"
                  : file
                  ? "border-green-500/50 bg-green-500/5 dark:bg-green-500/10"
                  : "dark:border-slate-700 border-gray-300 dark:hover:border-indigo-500/50 hover:border-indigo-400 dark:bg-slate-900/50 bg-white"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => document.getElementById("resume-input").click()}
            >
              <input id="resume-input" type="file" accept=".pdf,.docx" className="hidden"
                onChange={(e) => handleFile(e.target.files[0])} />

              {file ? (
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl mx-auto mb-4">
                    ✅
                  </div>
                  <p className="text-green-400 font-semibold text-lg">{file.name}</p>
                  <p className="dark:text-slate-500 text-gray-400 text-sm mt-1">
                    {(file.size / 1024).toFixed(1)} KB · Click to change file
                  </p>
                </div>
              ) : (
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl mx-auto mb-4">
                    📄
                  </div>
                  <p className="dark:text-slate-200 text-gray-700 font-semibold text-lg">
                    {dragOver ? "Drop your resume here" : "Drag & drop your resume"}
                  </p>
                  <p className="dark:text-slate-500 text-gray-400 text-sm mt-2">
                    or click to browse · <span className="text-indigo-400">PDF or DOCX</span> · Max 10MB
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* JD Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label className="text-sm font-medium dark:text-slate-300 text-gray-700 block mb-2">
              Job Description
            </label>
            <textarea
              rows={10}
              placeholder="Paste the full job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="w-full px-4 py-3 rounded-xl dark:bg-slate-900/80 bg-white border dark:border-slate-700 border-gray-200 dark:text-slate-200 text-gray-900 dark:placeholder-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all text-sm"
            />
            <p className="text-xs dark:text-slate-600 text-gray-400 mt-1 text-right">{jd.length} characters</p>
          </motion.div>

          <motion.button
            type="submit" disabled={loading}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-all hover:shadow-xl hover:shadow-indigo-500/25 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing your resume...
              </span>
            ) : "Analyze Resume →"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
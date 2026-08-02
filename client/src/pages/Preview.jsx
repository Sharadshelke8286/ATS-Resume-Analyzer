import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TemplateRenderer from "../components/TemplateRenderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "../utils/reactPdfGenerator";

const TEMPLATE_LABELS = {
  standard: "Standard ATS Template",
  modern: "Modern Clean Template",
  compact: "Compact Pro Template",
};

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeData = location.state?.resumeData;

  const fileName =
    resumeData?.personalInfo?.name?.replace(/\s+/g, "_") || "resume";

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center gap-4 transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No resume data found.
        </p>
        <button
          onClick={() => navigate("/builder")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
        >
          Go to Builder
        </button>
      </div>
    );
  }

  const templateLabel =
    TEMPLATE_LABELS[resumeData.template] || "Standard ATS Template";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Resume Preview
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {templateLabel}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/builder", { state: { resumeData } })}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-5 py-2 rounded-lg transition text-sm font-medium"
            >
              ← Edit Resume
            </button>

            <PDFDownloadLink
              document={<ResumePDF data={resumeData} />}
              fileName={`${fileName}.pdf`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition text-sm font-medium"
            >
              {({ loading }) => (loading ? "Generating..." : "⬇ Download PDF")}
            </PDFDownloadLink>
          </div>

          <button
            onClick={() => navigate("/analyze", { state: { resumeData } })}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition text-sm font-medium"
          >
            🚀 Analyze Resume
          </button>
        </div>

        {/* Resume Container */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-x-auto transition-colors duration-300">

          {/* 🔥 IMPORTANT: PDF WRAPPER */}
          <div id="pdf-wrapper" className="flex justify-center">
            <TemplateRenderer resumeData={resumeData} />
          </div>

        </div>

        {/* Bottom Button */}
        <div className="mt-6 flex justify-center">

          <PDFDownloadLink
            document={<ResumePDF data={resumeData} />}
            fileName={`${fileName}.pdf`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition font-semibold text-base"
          >
            {({ loading }) => (loading ? "Generating..." : "⬇ Download PDF")}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default Preview;
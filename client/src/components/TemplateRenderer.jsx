// import React from "react";
// import StandardTemplate from "./StandardTemplate";
// import ModernTemplate from "./ModernTemplate";
// import CompactTemplate from "./CompactTemplate";

// /**
//  * TemplateRenderer
//  * Routes resumeData to the correct template component.
//  *
//  * Supported templates:
//  *   "standard" — Classic single-column, Times New Roman (default)
//  *   "modern"   — Minimalist sans-serif with ruled dividers
//  *   "compact"  — Left sidebar (skills/contact) + right main content
//  *
//  * To add a new template:
//  *   1. Create NewTemplate.jsx
//  *   2. Import it here
//  *   3. Add case "new-id": return <NewTemplate data={resumeData} />;
//  */
// const TemplateRenderer = ({ resumeData }) => {
//   const template = resumeData?.template || "standard";

//   switch (template) {
//     case "modern":
//       return <ModernTemplate data={resumeData} />;
//     case "compact":
//       return <CompactTemplate data={resumeData} />;
//     case "standard":
//     default:
//       return <StandardTemplate data={resumeData} />;
//   }
// };

// export default TemplateRenderer;


import React from "react";
import StandardTemplate from "./StandardTemplate";
import ModernTemplate from "./ModernTemplate";
import CompactTemplate from "./CompactTemplate";

/**
 * TemplateRenderer
 * Routes resumeData to the correct template component.
 * Templates:
 *   "standard" — Classic single-column Times New Roman
 *   "modern"   — Minimalist sans-serif with ruled dividers
 *   "compact"  — Dark left sidebar + white main content
 */
const TemplateRenderer = ({ resumeData }) => {
  const template = resumeData?.template || "standard";
  switch (template) {
    case "modern":
      return <ModernTemplate data={resumeData} />;
    case "compact":
      return <CompactTemplate data={resumeData} />;
    case "standard":
    default:
      return <StandardTemplate data={resumeData} />;
  }
};

export default TemplateRenderer;
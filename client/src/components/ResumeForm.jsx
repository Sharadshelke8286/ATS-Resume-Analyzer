// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "./Navbar";

// // ─── Validation Rules ─────────────────────────────────────────────────────────
// const validators = {
//   name: (v) => {
//     if (!v.trim()) return "Full name is required";
//     if (v.trim().length < 2) return "Name must be at least 2 characters";
//     if (!/^[a-zA-Z\s.'-]+$/.test(v.trim()))
//       return "Name can only contain letters, spaces, dots, hyphens, apostrophes";
//     return "";
//   },
//   email: (v) => {
//     if (!v.trim()) return "Email is required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
//       return "Enter a valid email (e.g. jane@example.com)";
//     return "";
//   },
//   phone: (v) => {
//     if (!v.trim()) return "Phone number is required";
//     const digits = v.replace(/\D/g, "");
//     if (digits.length < 10) return "Phone must have at least 10 digits";
//     if (digits.length > 15) return "Phone must have at most 15 digits";
//     return "";
//   },
//   linkedin: (v) => {
//     if (!v.trim()) return "";
//     if (
//       !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_%-]+\/?$/.test(
//         v.trim()
//       )
//     )
//       return "Format: linkedin.com/in/your-profile";
//     return "";
//   },
//   github: (v) => {
//     if (!v.trim()) return "";
//     if (
//       !/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/.test(v.trim())
//     )
//       return "Format: github.com/your-username";
//     return "";
//   },
// };

// const validatePersonal = (personalInfo) => {
//   const errs = {};
//   Object.keys(validators).forEach((f) => {
//     const msg = validators[f](personalInfo[f] || "");
//     if (msg) errs[f] = msg;
//   });
//   return errs;
// };

// // ─── Template Options ─────────────────────────────────────────────────────────
// const TEMPLATES = [
//   {
//     id: "standard",
//     name: "Standard ATS",
//     desc: "Classic single-column, Times New Roman. Maximum ATS compatibility.",
//     tag: "Most Compatible",
//     tagColor: "bg-green-500/20 text-green-400",
//   },
//   {
//     id: "modern",
//     name: "Modern Clean",
//     desc: "Minimalist sans-serif with ruled dividers. Great for tech & design roles.",
//     tag: "Popular",
//     tagColor: "bg-blue-500/20 text-blue-400",
//   },
//   {
//     id: "compact",
//     name: "Compact Pro",
//     desc: "Left sidebar for skills & info. Dense layout fits more content on one page.",
//     tag: "Fits More",
//     tagColor: "bg-violet-500/20 text-violet-400",
//   },
// ];

// // ─── Default Data ─────────────────────────────────────────────────────────────
// const defaultData = {
//   template: "standard",
//   personalInfo: { name: "", email: "", phone: "", linkedin: "", github: "" },
//   summary: "",
//   skills: [""],
//   education: [
//     {
//       institution: "",
//       degree: "",
//       field: "",
//       startDate: "",
//       endDate: "",
//       gpa: "",
//     },
//   ],
//   experience: [
//     {
//       company: "",
//       title: "",
//       location: "",
//       startDate: "",
//       endDate: "",
//       bullets: [""],
//     },
//   ],
//   projects: [{ name: "", tech: "", description: "", link: "" }],
// };

// // ─── Shared UI Atoms ──────────────────────────────────────────────────────────
// const getInputClass = (hasErr) =>
//   `w-full bg-gray-700 border ${
//     hasErr ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-indigo-500"
//   } text-white placeholder-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 transition text-sm`;

// const labelClass = "block text-gray-300 text-sm font-medium mb-1";

// const FieldError = ({ msg }) =>
//   msg ? <p className="text-red-400 text-xs mt-1 flex items-center gap-1">⚠ {msg}</p> : null;

// const SectionTitle = ({ children }) => (
//   <h2 className="text-lg font-semibold text-indigo-400 border-b border-gray-700 pb-2 mb-4">
//     {children}
//   </h2>
// );

// const Card = ({ children }) => (
//   <div className="bg-gray-800 rounded-2xl p-6 mb-6 shadow-md">{children}</div>
// );

// // ─── Main Component ───────────────────────────────────────────────────────────
// const ResumeForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [data, setData] = useState(location.state?.resumeData || defaultData);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // ── Personal Info ────────────────────────────────────────────
//   const updatePersonal = (field, value) => {
//     setData((d) => ({ ...d, personalInfo: { ...d.personalInfo, [field]: value } }));
//     if (touched[field] && validators[field]) {
//       setErrors((e) => ({ ...e, [field]: validators[field](value) }));
//     }
//   };

//   const blurPersonal = (field) => {
//     setTouched((t) => ({ ...t, [field]: true }));
//     if (validators[field]) {
//       setErrors((e) => ({
//         ...e,
//         [field]: validators[field](data.personalInfo[field] || ""),
//       }));
//     }
//   };

//   // ── Skills ───────────────────────────────────────────────────
//   const updateSkill = (i, v) =>
//     setData((d) => {
//       const s = [...d.skills];
//       s[i] = v;
//       return { ...d, skills: s };
//     });
//   const addSkill = () =>
//     setData((d) => ({ ...d, skills: [...d.skills, ""] }));
//   const removeSkill = (i) =>
//     setData((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));

//   // ── Education ────────────────────────────────────────────────
//   const updateEdu = (i, field, v) =>
//     setData((d) => {
//       const a = [...d.education];
//       a[i] = { ...a[i], [field]: v };
//       return { ...d, education: a };
//     });
//   const addEdu = () =>
//     setData((d) => ({
//       ...d,
//       education: [
//         ...d.education,
//         { institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" },
//       ],
//     }));
//   const removeEdu = (i) =>
//     setData((d) => ({ ...d, education: d.education.filter((_, idx) => idx !== i) }));

//   // ── Experience ───────────────────────────────────────────────
//   const updateExp = (i, field, v) =>
//     setData((d) => {
//       const a = [...d.experience];
//       a[i] = { ...a[i], [field]: v };
//       return { ...d, experience: a };
//     });
//   const updateExpBullet = (i, bi, v) =>
//     setData((d) => {
//       const a = [...d.experience];
//       const b = [...a[i].bullets];
//       b[bi] = v;
//       a[i] = { ...a[i], bullets: b };
//       return { ...d, experience: a };
//     });
//   const addExpBullet = (i) =>
//     setData((d) => {
//       const a = [...d.experience];
//       a[i] = { ...a[i], bullets: [...a[i].bullets, ""] };
//       return { ...d, experience: a };
//     });
//   const removeExpBullet = (i, bi) =>
//     setData((d) => {
//       const a = [...d.experience];
//       a[i] = { ...a[i], bullets: a[i].bullets.filter((_, idx) => idx !== bi) };
//       return { ...d, experience: a };
//     });
//   const addExp = () =>
//     setData((d) => ({
//       ...d,
//       experience: [
//         ...d.experience,
//         { company: "", title: "", location: "", startDate: "", endDate: "", bullets: [""] },
//       ],
//     }));
//   const removeExp = (i) =>
//     setData((d) => ({
//       ...d,
//       experience: d.experience.filter((_, idx) => idx !== i),
//     }));

//   // ── Projects ─────────────────────────────────────────────────
//   const updateProj = (i, field, v) =>
//     setData((d) => {
//       const a = [...d.projects];
//       a[i] = { ...a[i], [field]: v };
//       return { ...d, projects: a };
//     });
//   const addProj = () =>
//     setData((d) => ({
//       ...d,
//       projects: [...d.projects, { name: "", tech: "", description: "", link: "" }],
//     }));
//   const removeProj = (i) =>
//     setData((d) => ({
//       ...d,
//       projects: d.projects.filter((_, idx) => idx !== i),
//     }));

//   // ── Submit ───────────────────────────────────────────────────
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errs = validatePersonal(data.personalInfo);
//     setTouched({ name: true, email: true, phone: true, linkedin: true, github: true });
//     setErrors(errs);
//     if (Object.values(errs).some(Boolean)) {
//       document.getElementById("personal-section")?.scrollIntoView({ behavior: "smooth" });
//       return;
//     }
//     navigate("/preview", { state: { resumeData: data } });
//   };

//   return (
//     <>

//     <form onSubmit={handleSubmit} className="space-y-2" noValidate>

//       {/* ── Template Selector ───────────────────────────────── */}
//       <Card>
//         <SectionTitle>Choose Template</SectionTitle>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {TEMPLATES.map((t) => (
//             <button
//               key={t.id}
//               type="button"
//               onClick={() => setData((d) => ({ ...d, template: t.id }))}
//               className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
//                 data.template === t.id
//                   ? "border-indigo-500 bg-indigo-500/10"
//                   : "border-gray-600 bg-gray-700/40 hover:border-gray-500"
//               }`}
//             >
//               <div className="flex items-start justify-between gap-2 mb-2">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-0.5 ${
//                       data.template === t.id
//                         ? "border-indigo-400 bg-indigo-400"
//                         : "border-gray-500"
//                     }`}
//                   />
//                   <span className="text-white font-semibold text-sm">{t.name}</span>
//                 </div>
//                 <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${t.tagColor}`}>
//                   {t.tag}
//                 </span>
//               </div>
//               <p className="text-gray-400 text-xs leading-relaxed pl-5">{t.desc}</p>
//             </button>
//           ))}
//         </div>
//       </Card>

//       {/* ── Personal Info ─────────────────────────────────────── */}
//       <div id="personal-section">
//         <Card>
//           <SectionTitle>Personal Information</SectionTitle>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//             {/* Name */}
//             <div>
//               <label className={labelClass}>
//                 Full Name <span className="text-red-400">*</span>
//               </label>
//               <input
//                 className={getInputClass(touched.name && errors.name)}
//                 placeholder="Jane Doe"
//                 value={data.personalInfo.name}
//                 onChange={(e) => updatePersonal("name", e.target.value)}
//                 onBlur={() => blurPersonal("name")}
//               />
//               <FieldError msg={touched.name && errors.name} />
//             </div>

//             {/* Email */}
//             <div>
//               <label className={labelClass}>
//                 Email <span className="text-red-400">*</span>
//               </label>
//               <input
//                 type="email"
//                 className={getInputClass(touched.email && errors.email)}
//                 placeholder="jane@example.com"
//                 value={data.personalInfo.email}
//                 onChange={(e) => updatePersonal("email", e.target.value)}
//                 onBlur={() => blurPersonal("email")}
//               />
//               <FieldError msg={touched.email && errors.email} />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className={labelClass}>
//                 Phone <span className="text-red-400">*</span>
//                 <span className="text-gray-500 font-normal ml-1">(10–15 digits)</span>
//               </label>
//               <input
//                 type="tel"
//                 className={getInputClass(touched.phone && errors.phone)}
//                 placeholder="+91 9876543210"
//                 value={data.personalInfo.phone}
//                 onChange={(e) => {
//                   const val = e.target.value.replace(/[^\d+\-() ]/g, "");
//                   updatePersonal("phone", val);
//                 }}
//                 onBlur={() => blurPersonal("phone")}
//                 maxLength={20}
//               />
//               <FieldError msg={touched.phone && errors.phone} />
//             </div>

//             {/* LinkedIn */}
//             <div>
//               <label className={labelClass}>
//                 LinkedIn URL{" "}
//                 <span className="text-gray-500 font-normal text-xs">(optional)</span>
//               </label>
//               <input
//                 className={getInputClass(touched.linkedin && errors.linkedin)}
//                 placeholder="linkedin.com/in/janedoe"
//                 value={data.personalInfo.linkedin}
//                 onChange={(e) => updatePersonal("linkedin", e.target.value)}
//                 onBlur={() => blurPersonal("linkedin")}
//               />
//               <FieldError msg={touched.linkedin && errors.linkedin} />
//             </div>

//             {/* GitHub */}
//             <div>
//               <label className={labelClass}>
//                 GitHub URL{" "}
//                 <span className="text-gray-500 font-normal text-xs">(optional)</span>
//               </label>
//               <input
//                 className={getInputClass(touched.github && errors.github)}
//                 placeholder="github.com/janedoe"
//                 value={data.personalInfo.github}
//                 onChange={(e) => updatePersonal("github", e.target.value)}
//                 onBlur={() => blurPersonal("github")}
//               />
//               <FieldError msg={touched.github && errors.github} />
//             </div>

//           </div>
//         </Card>
//       </div>

//       {/* ── Summary ───────────────────────────────────────────── */}
//       <Card>
//         <SectionTitle>Professional Summary</SectionTitle>
//         <label className={labelClass}>Summary</label>
//         <textarea
//           className={`${getInputClass(false)} resize-none`}
//           rows={4}
//           placeholder="A brief summary of your professional background and goals..."
//           value={data.summary}
//           onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
//         />
//       </Card>

//       {/* ── Skills ────────────────────────────────────────────── */}
//       <Card>
//         <SectionTitle>Skills</SectionTitle>
//         <div className="flex flex-wrap gap-2 mb-3">
//           {data.skills.map((skill, i) => (
//             <div key={i} className="flex items-center gap-1">
//               <input
//                 className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-36"
//                 placeholder={`Skill ${i + 1}`}
//                 value={skill}
//                 onChange={(e) => updateSkill(i, e.target.value)}
//               />
//               {data.skills.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeSkill(i)}
//                   className="text-red-400 hover:text-red-300 text-lg leading-none"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//         <button
//           type="button"
//           onClick={addSkill}
//           className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
//         >
//           + Add Skill
//         </button>
//       </Card>

//       {/* ── Education ─────────────────────────────────────────── */}
//       <Card>
//         <SectionTitle>Education</SectionTitle>
//         {data.education.map((edu, i) => (
//           <div key={i} className="mb-5 last:mb-0 border border-gray-700 rounded-xl p-4">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-sm text-gray-400 font-medium">Entry {i + 1}</span>
//               {data.education.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeEdu(i)}
//                   className="text-red-400 hover:text-red-300 text-sm"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 { field: "institution", label: "Institution", placeholder: "MIT" },
//                 { field: "degree", label: "Degree", placeholder: "Bachelor of Science" },
//                 { field: "field", label: "Field of Study", placeholder: "Computer Science" },
//                 { field: "gpa", label: "GPA (optional)", placeholder: "3.9" },
//                 { field: "startDate", label: "Start Date", placeholder: "Aug 2019" },
//                 { field: "endDate", label: "End Date", placeholder: "May 2023" },
//               ].map(({ field, label, placeholder }) => (
//                 <div key={field}>
//                   <label className={labelClass}>{label}</label>
//                   <input
//                     className={getInputClass(false)}
//                     placeholder={placeholder}
//                     value={edu[field]}
//                     onChange={(e) => updateEdu(i, field, e.target.value)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addEdu}
//           className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium"
//         >
//           + Add Education
//         </button>
//       </Card>

//       {/* ── Experience ────────────────────────────────────────── */}
//       <Card>
//         <SectionTitle>Work Experience</SectionTitle>
//         {data.experience.map((exp, i) => (
//           <div key={i} className="mb-5 last:mb-0 border border-gray-700 rounded-xl p-4">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-sm text-gray-400 font-medium">Job {i + 1}</span>
//               {data.experience.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeExp(i)}
//                   className="text-red-400 hover:text-red-300 text-sm"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//               {[
//                 { field: "title", label: "Job Title", placeholder: "Software Engineer" },
//                 { field: "company", label: "Company", placeholder: "Acme Corp" },
//                 { field: "location", label: "Location", placeholder: "San Francisco, CA" },
//                 { field: "startDate", label: "Start Date", placeholder: "Jun 2021" },
//                 { field: "endDate", label: "End Date", placeholder: "Present" },
//               ].map(({ field, label, placeholder }) => (
//                 <div key={field}>
//                   <label className={labelClass}>{label}</label>
//                   <input
//                     className={getInputClass(false)}
//                     placeholder={placeholder}
//                     value={exp[field]}
//                     onChange={(e) => updateExp(i, field, e.target.value)}
//                   />
//                 </div>
//               ))}
//             </div>
//             <label className={labelClass}>Responsibilities / Achievements</label>
//             {exp.bullets.map((b, bi) => (
//               <div key={bi} className="flex gap-2 mb-2">
//                 <input
//                   className={getInputClass(false)}
//                   placeholder={`Bullet ${bi + 1}: Achieved X by doing Y resulting in Z`}
//                   value={b}
//                   onChange={(e) => updateExpBullet(i, bi, e.target.value)}
//                 />
//                 {exp.bullets.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeExpBullet(i, bi)}
//                     className="text-red-400 hover:text-red-300 text-xl leading-none"
//                   >
//                     ×
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => addExpBullet(i)}
//               className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
//             >
//               + Add Bullet
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addExp}
//           className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium"
//         >
//           + Add Experience
//         </button>
//       </Card>

//       {/* ── Projects ──────────────────────────────────────────── */}
//       <Card>
//         <SectionTitle>Projects</SectionTitle>
//         {data.projects.map((proj, i) => (
//           <div key={i} className="mb-5 last:mb-0 border border-gray-700 rounded-xl p-4">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-sm text-gray-400 font-medium">Project {i + 1}</span>
//               {data.projects.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeProj(i)}
//                   className="text-red-400 hover:text-red-300 text-sm"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 { field: "name", label: "Project Name", placeholder: "Portfolio Website" },
//                 { field: "tech", label: "Technologies", placeholder: "React, Node.js, MongoDB" },
//                 { field: "link", label: "Link (optional)", placeholder: "github.com/user/project" },
//               ].map(({ field, label, placeholder }) => (
//                 <div key={field}>
//                   <label className={labelClass}>{label}</label>
//                   <input
//                     className={getInputClass(false)}
//                     placeholder={placeholder}
//                     value={proj[field]}
//                     onChange={(e) => updateProj(i, field, e.target.value)}
//                   />
//                 </div>
//               ))}
//               <div className="sm:col-span-2">
//                 <label className={labelClass}>Description</label>
//                 <textarea
//                   className={`${getInputClass(false)} resize-none`}
//                   rows={2}
//                   placeholder="Brief description of what the project does and your role..."
//                   value={proj.description}
//                   onChange={(e) => updateProj(i, "description", e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addProj}
//           className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium"
//         >
//           + Add Project
//         </button>
//       </Card>

//       {/* ── Submit ────────────────────────────────────────────── */}
//       <div className="flex justify-end pb-8">
//         <button
//           type="submit"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold text-base transition"
//         >
//           Preview Resume →
//         </button>
//       </div>
//     </form>
//     </>
//   );
// };

// export default ResumeForm;


import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const FieldError = ({ msg }) =>
  msg ? (
    <p className="text-red-500 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
      ⚠ {msg}
    </p>
  ) : null;
// ─── Validation Rules ─────────────────────────────────────────────────────────
const validators = {
  name: (v) => {
    if (!v.trim()) return "Full name is required";
    if (v.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s.'-]+$/.test(v.trim()))
      return "Name can only contain letters, spaces, dots, hyphens, apostrophes";
    return "";
  },
  email: (v) => {
    if (!v.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
      return "Enter a valid email (e.g. jane@example.com)";
    return "";
  },
  phone: (v) => {
    if (!v.trim()) return "Phone number is required";
    const digits = v.replace(/\D/g, "");
    if (digits.length < 10) return "Phone must have at least 10 digits";
    if (digits.length > 15) return "Phone must have at most 15 digits";
    return "";
  },
  linkedin: (v) => {
    if (!v.trim()) return "";
    if (!/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_%-]+\/?$/.test(v.trim()))
      return "Format: linkedin.com/in/your-profile";
    return "";
  },
  github: (v) => {
    if (!v.trim()) return "";
    if (!/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/.test(v.trim()))
      return "Format: github.com/your-username";
    return "";
  },
};

const validatePersonal = (personalInfo) => {
  const errs = {};
  Object.keys(validators).forEach((f) => {
    const msg = validators[f](personalInfo[f] || "");
    if (msg) errs[f] = msg;
  });
  return errs;
};

// ─── Template Options ─────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "standard",
    name: "Standard ATS",
    desc: "Classic single-column, Times New Roman. Maximum ATS compatibility.",
    tag: "Most Compatible",
    tagColor: "bg-green-500/20 text-green-600 dark:text-green-400",
  },
  {
    id: "modern",
    name: "Modern Clean",
    desc: "Minimalist sans-serif with ruled dividers. Great for tech & design roles.",
    tag: "Popular",
    tagColor: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
  },
  {
    id: "compact",
    name: "Compact Pro",
    desc: "Left sidebar for skills & info. Dense layout fits more content on one page.",
    tag: "Fits More",
    tagColor: "bg-violet-500/20 text-violet-600 dark:text-violet-400",
  },
];

// ─── Default Data ─────────────────────────────────────────────────────────────
const defaultData = {
  template: "standard",
  personalInfo: { name: "", email: "", phone: "", linkedin: "", github: "" },
  summary: "",
  skills: [""],
  education: [{ institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }],
  experience: [{ company: "", title: "", location: "", startDate: "", endDate: "", bullets: [""] }],
  projects: [{ name: "", tech: "", description: "", link: "" }],
};

// ─── Theme-aware UI Atoms ─────────────────────────────────────────────────────

// Input: light bg-gray-100, dark bg-gray-700
const getInputClass = (hasErr) =>
  `w-full 
   bg-white/60 dark:bg-gray-800/60 
   backdrop-blur-md
   border ${
     hasErr
       ? "border-red-500"
       : "border-gray-300/50 dark:border-gray-600/50"
   }
   text-gray-900 dark:text-white 
   placeholder-gray-400 
   rounded-xl px-4 py-2.5 
   focus:outline-none focus:ring-2 focus:ring-indigo-500 
   transition-all duration-200 text-sm`;

const labelClass =
  "block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1";

const SectionTitle = ({ children }) => (
  <h2 className="text-lg font-semibold 
    text-transparent bg-clip-text 
    bg-gradient-to-r from-indigo-500 to-purple-500 
    border-b border-gray-200/50 dark:border-gray-700/50 
    pb-2 mb-4">
    {children}
  </h2>
);

const Card = ({ children }) => (
  <div className="
    bg-white/70 dark:bg-gray-900/60 
    backdrop-blur-xl
    border border-gray-200/50 dark:border-gray-700/50
rounded-2xl p-5 mb-5
    shadow-lg hover:shadow-xl 
    transition-all duration-300">
    {children}
  </div>
);

const EntryCard = ({ children }) => (
  <div className="
    mb-5 last:mb-0 
    border border-gray-200/50 dark:border-gray-700/50 
    rounded-xl p-4 
    bg-white/60 dark:bg-gray-800/60 
    backdrop-blur-md
    hover:shadow-md transition">
    {children}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ResumeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(location.state?.resumeData || defaultData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ── Personal Info ────────────────────────────────────────────
  const updatePersonal = (field, value) => {
    setData((d) => ({ ...d, personalInfo: { ...d.personalInfo, [field]: value } }));
    if (touched[field] && validators[field]) {
      setErrors((e) => ({ ...e, [field]: validators[field](value) }));
    }
  };
  const blurPersonal = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (validators[field]) {
      setErrors((e) => ({ ...e, [field]: validators[field](data.personalInfo[field] || "") }));
    }
  };

  // ── Skills ───────────────────────────────────────────────────
  const updateSkill = (i, v) =>
    setData((d) => { const s = [...d.skills]; s[i] = v; return { ...d, skills: s }; });
  const addSkill = () => setData((d) => ({ ...d, skills: [...d.skills, ""] }));
  const removeSkill = (i) => setData((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));

  // ── Education ────────────────────────────────────────────────
  const updateEdu = (i, field, v) =>
    setData((d) => { const a = [...d.education]; a[i] = { ...a[i], [field]: v }; return { ...d, education: a }; });
  const addEdu = () =>
    setData((d) => ({ ...d, education: [...d.education, { institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }] }));
  const removeEdu = (i) =>
    setData((d) => ({ ...d, education: d.education.filter((_, idx) => idx !== i) }));

  // ── Experience ───────────────────────────────────────────────
  const updateExp = (i, field, v) =>
    setData((d) => { const a = [...d.experience]; a[i] = { ...a[i], [field]: v }; return { ...d, experience: a }; });
  const updateExpBullet = (i, bi, v) =>
    setData((d) => { const a = [...d.experience]; const b = [...a[i].bullets]; b[bi] = v; a[i] = { ...a[i], bullets: b }; return { ...d, experience: a }; });
  const addExpBullet = (i) =>
    setData((d) => { const a = [...d.experience]; a[i] = { ...a[i], bullets: [...a[i].bullets, ""] }; return { ...d, experience: a }; });
  const removeExpBullet = (i, bi) =>
    setData((d) => { const a = [...d.experience]; a[i] = { ...a[i], bullets: a[i].bullets.filter((_, idx) => idx !== bi) }; return { ...d, experience: a }; });
  const addExp = () =>
    setData((d) => ({ ...d, experience: [...d.experience, { company: "", title: "", location: "", startDate: "", endDate: "", bullets: [""] }] }));
  const removeExp = (i) =>
    setData((d) => ({ ...d, experience: d.experience.filter((_, idx) => idx !== i) }));

  // ── Projects ─────────────────────────────────────────────────
  const updateProj = (i, field, v) =>
    setData((d) => { const a = [...d.projects]; a[i] = { ...a[i], [field]: v }; return { ...d, projects: a }; });
  const addProj = () =>
    setData((d) => ({ ...d, projects: [...d.projects, { name: "", tech: "", description: "", link: "" }] }));
  const removeProj = (i) =>
    setData((d) => ({ ...d, projects: d.projects.filter((_, idx) => idx !== i) }));

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validatePersonal(data.personalInfo);
    setTouched({ name: true, email: true, phone: true, linkedin: true, github: true });
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      document.getElementById("personal-section")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/preview", { state: { resumeData: data } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>

      {/* ── Template Selector ── */}
<Card>
  <SectionTitle>Choose Template</SectionTitle>

<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {TEMPLATES.map((t) => {
      const selected = data.template === t.id;

      return (
        <button
          key={t.id}
          type="button"
          onClick={() =>
            setData((d) => ({ ...d, template: t.id }))
          }
  className={`
  relative text-left p-6 rounded-2xl 
  min-h-[180px]
  transition-all duration-300
  border
  ${
    selected
      ? "border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.25)]"
      : "border-gray-200/50 dark:border-gray-700/50"
  }
  bg-gradient-to-br 
  from-white/70 to-white/40 
  dark:from-gray-900/80 dark:to-gray-900/40
  backdrop-blur-xl
  hover:scale-[1.02]
`}
        >
          {/* Hover Glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 transition"></div>

      <div className="relative z-10 flex flex-col h-full justify-between">

  {/* TOP SECTION */}
  <div>

    {/* TAG (TOP LEFT) */}
    <span className="
      inline-block mb-3 
      text-[10px] tracking-wide font-semibold 
      px-3 py-1 rounded-full
      bg-gradient-to-r from-indigo-500 to-purple-500 
      text-white
      shadow-md
    ">
       {t.tag.toUpperCase()}
    </span>

    {/* TITLE */}
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
      {t.name}
    </h3>

    {/* ACCENT LINE */}
    <div className="w-10 h-[2px] bg-indigo-500 mt-1 mb-3 rounded-full"></div>

    {/* DESCRIPTION */}
    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
      {t.desc}
    </p>
  </div>

  {/* OPTIONAL BOTTOM INDICATOR */}
  {selected && (
    <div className="mt-4 text-xs text-indigo-500 font-medium">
      Selected ✓
    </div>
  )}
</div>
        </button>
      );
    })}
  </div>
</Card>


      {/* ── Personal Info ── */}
      <div id="personal-section">
        <Card>
          <SectionTitle>Personal Information</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
              <input
                className={getInputClass(touched.name && errors.name)}
                placeholder="Jane Doe"
                value={data.personalInfo.name}
                onChange={(e) => updatePersonal("name", e.target.value)}
                onBlur={() => blurPersonal("name")}
              />
              <FieldError msg={touched.name && errors.name} />
            </div>

            <div>
              <label className={labelClass}>Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                className={getInputClass(touched.email && errors.email)}
                placeholder="jane@example.com"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonal("email", e.target.value)}
                onBlur={() => blurPersonal("email")}
              />
              <FieldError msg={touched.email && errors.email} />
            </div>

            <div>
              <label className={labelClass}>
                Phone <span className="text-red-500">*</span>
                <span className="text-gray-400 dark:text-gray-500 font-normal ml-1 text-xs">(10–15 digits)</span>
              </label>
              <input
                type="tel"
                className={getInputClass(touched.phone && errors.phone)}
                placeholder="+91 9876543210"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonal("phone", e.target.value.replace(/[^\d+\-() ]/g, ""))}
                onBlur={() => blurPersonal("phone")}
                maxLength={20}
              />
              <FieldError msg={touched.phone && errors.phone} />
            </div>

            <div>
              <label className={labelClass}>
                LinkedIn URL <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">(optional)</span>
              </label>
              <input
                className={getInputClass(touched.linkedin && errors.linkedin)}
                placeholder="linkedin.com/in/janedoe"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonal("linkedin", e.target.value)}
                onBlur={() => blurPersonal("linkedin")}
              />
              <FieldError msg={touched.linkedin && errors.linkedin} />
            </div>

            <div>
              <label className={labelClass}>
                GitHub URL <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">(optional)</span>
              </label>
              <input
                className={getInputClass(touched.github && errors.github)}
                placeholder="github.com/janedoe"
                value={data.personalInfo.github}
                onChange={(e) => updatePersonal("github", e.target.value)}
                onBlur={() => blurPersonal("github")}
              />
              <FieldError msg={touched.github && errors.github} />
            </div>

          </div>
        </Card>
      </div>

      {/* ── Summary ── */}
      <Card>
        <SectionTitle>Professional Summary</SectionTitle>
        <label className={labelClass}>Summary</label>
        <textarea
          className={`${getInputClass(false)} resize-none`}
          rows={4}
          placeholder="A brief summary of your professional background and goals..."
          value={data.summary}
          onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
        />
      </Card>

      {/* ── Skills ── */}
      <Card>
        <SectionTitle>Skills</SectionTitle>
    <div className="flex flex-wrap gap-2 mb-3">
  {data.skills.map((skill, i) => (
    <div
      key={i}
      className="flex items-center gap-2 px-3 py-1 rounded-full 
      bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-sm"
    >
      <input
        className="bg-transparent outline-none w-20"
        value={skill}
        onChange={(e) => updateSkill(i, e.target.value)}
      />
      {data.skills.length > 1 && (
        <button onClick={() => removeSkill(i)}>×</button>
      )}
    </div>
  ))}
</div>
        <button type="button" onClick={addSkill} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium">
          + Add Skill
        </button>
      </Card>

      {/* ── Education ── */}
      <Card>
        <SectionTitle>Education</SectionTitle>
        {data.education.map((edu, i) => (
          <EntryCard key={i}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Entry {i + 1}</span>
              {data.education.length > 1 && (
                <button type="button" onClick={() => removeEdu(i)} className="text-red-500 dark:text-red-400 hover:text-red-400 text-sm">Remove</button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { field: "institution", label: "Institution", placeholder: "MIT" },
                { field: "degree", label: "Degree", placeholder: "Bachelor of Science" },
                { field: "field", label: "Field of Study", placeholder: "Computer Science" },
                { field: "gpa", label: "GPA (optional)", placeholder: "3.9" },
                { field: "startDate", label: "Start Date", placeholder: "Aug 2019" },
                { field: "endDate", label: "End Date", placeholder: "May 2023" },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className={labelClass}>{label}</label>
                  <input className={getInputClass(false)} placeholder={placeholder} value={edu[field]} onChange={(e) => updateEdu(i, field, e.target.value)} />
                </div>
              ))}
            </div>
          </EntryCard>
        ))}
        <button type="button" onClick={addEdu} className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium">+ Add Education</button>
      </Card>

      {/* ── Experience ── */}
      <Card>
        <SectionTitle>Work Experience</SectionTitle>
        {data.experience.map((exp, i) => (
          <EntryCard key={i}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Job {i + 1}</span>
              {data.experience.length > 1 && (
                <button type="button" onClick={() => removeExp(i)} className="text-red-500 dark:text-red-400 hover:text-red-400 text-sm">Remove</button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { field: "title", label: "Job Title", placeholder: "Software Engineer" },
                { field: "company", label: "Company", placeholder: "Acme Corp" },
                { field: "location", label: "Location", placeholder: "Pune, India" },
                { field: "startDate", label: "Start Date", placeholder: "Jun 2021" },
                { field: "endDate", label: "End Date", placeholder: "Present" },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className={labelClass}>{label}</label>
                  <input className={getInputClass(false)} placeholder={placeholder} value={exp[field]} onChange={(e) => updateExp(i, field, e.target.value)} />
                </div>
              ))}
            </div>
            <label className={labelClass}>Responsibilities / Achievements</label>
            {exp.bullets.map((b, bi) => (
              <div key={bi} className="flex gap-2 mb-2">
                <input
                  className={getInputClass(false)}
                  placeholder={`Bullet ${bi + 1}: Achieved X by doing Y resulting in Z`}
                  value={b}
                  onChange={(e) => updateExpBullet(i, bi, e.target.value)}
                />
                {exp.bullets.length > 1 && (
                  <button type="button" onClick={() => removeExpBullet(i, bi)} className="text-red-500 dark:text-red-400 hover:text-red-400 text-xl leading-none">×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addExpBullet(i)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium">+ Add Bullet</button>
          </EntryCard>
        ))}
        <button type="button" onClick={addExp} className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium">+ Add Experience</button>
      </Card>

      {/* ── Projects ── */}
      <Card>
        <SectionTitle>Projects</SectionTitle>
        {data.projects.map((proj, i) => (
          <EntryCard key={i}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Project {i + 1}</span>
              {data.projects.length > 1 && (
                <button type="button" onClick={() => removeProj(i)} className="text-red-500 dark:text-red-400 hover:text-red-400 text-sm">Remove</button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { field: "name", label: "Project Name", placeholder: "Portfolio Website" },
                { field: "tech", label: "Technologies", placeholder: "React, Node.js, MongoDB" },
                { field: "link", label: "Link (optional)", placeholder: "github.com/user/project" },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className={labelClass}>{label}</label>
                  <input className={getInputClass(false)} placeholder={placeholder} value={proj[field]} onChange={(e) => updateProj(i, field, e.target.value)} />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  className={`${getInputClass(false)} resize-none`}
                  rows={2}
                  placeholder="Brief description of what the project does and your role..."
                  value={proj.description}
                  onChange={(e) => updateProj(i, "description", e.target.value)}
                />
              </div>
            </div>
          </EntryCard>
        ))}
        <button type="button" onClick={addProj} className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium">+ Add Project</button>
      </Card>

      {/* ── Submit ── */}
      <div className="flex justify-end pb-8">
<button
  type="submit"
  className="
    bg-gradient-to-r from-indigo-500 to-purple-600
    hover:from-indigo-600 hover:to-purple-700
    text-white px-10 py-3 rounded-xl 
    font-semibold text-base 
    shadow-lg hover:shadow-xl
    transition-all duration-300
  "
>
   Preview Resume
</button>
      </div>
    </form>
  );
};

export default ResumeForm;
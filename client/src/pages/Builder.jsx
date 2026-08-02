import React from "react";
import Navbar from "../components/Navbar";
import ResumeForm from "../components/ResumeForm";

const Builder = () => {
  return (
<div className="
  min-h-screen 
  bg-gradient-to-br 
  from-gray-50 via-white to-gray-100 
  dark:from-gray-950 dark:via-gray-900 dark:to-black
  transition-colors duration-300
">      <Navbar />

<div className="max-w-5xl mx-auto py-10 px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Resume Builder
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Fill in your details to generate an ATS-friendly resume
          </p>
        </div>

        {/* Form */}
        <ResumeForm />
      </div>
    </div>
  );
};

export default Builder;
import React from "react";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { Code} from "lucide-react";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const EditorNavbar = ({ projectName, editorContent }) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    try {
      const blob = new Blob([editorContent || ""], { type: "text/plain;charset=utf-8" });
      const fileName = `${projectName || "project"}.txt`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download the file. Please try again.");
    }
  };

  return (
    <nav className="flex items-center justify-between px-10 md:px-20 h-16 bg-white shadow-md border-b">
      {/* Back Button */}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition"
      >
        <IoIosArrowBack className="text-xl" />
        <span className="hidden md:inline text-sm font-medium">Back</span>
      </button>

      {/* Brand Name */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide flex items-center gap-4">
       <Code size={40} className="text-blue-600 ml-10" />
        Code Editor
      </h1>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition"
      >
        <FiDownload className="text-xl" />
        <span className="hidden md:inline text-sm font-medium">Download</span>
      </button>
    </nav>
  );
};

export default EditorNavbar;

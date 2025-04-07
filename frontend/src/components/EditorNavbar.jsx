import React from "react";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { Code } from "lucide-react";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const EditorNavbar = ({
  projectName,
  editorContent,
  isMobile,
  currentView,
  setCurrentView,
  saveProjectCallback,
}) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    try {
      const blob = new Blob([editorContent || ""], {
        type: "text/plain;charset=utf-8",
      });
      const fileName = `${projectName || "project"}.txt`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download the file. Please try again.");
    }
  };

  const handleBack = () => {
    // Warning for unsaved changes
    if (
      window.confirm(
        "Your unsaved changes might be lost. Are you sure you want to go back?"
      )
    ) {
      navigate("/projects");
    }
  };

  const toggleView = () => {
    setCurrentView(currentView === "editor" ? "output" : "editor");
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-20 h-16 bg-white shadow-md border-b">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 px-3 py-2 text-sm md:text-base text-gray-700 rounded-lg hover:bg-gray-100 transition"
      >
        <IoIosArrowBack className="text-xl" />
        <span className="hidden md:inline font-medium">Back</span>
      </button>

      {/* Brand: show full name only on medium and larger screens */}
      <div className="hidden md:flex items-center gap-2">
        <Code size={32} className="text-blue-600" />
        <span className="text-3xl font-semibold text-gray-800">Code Editor</span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile view toggle button */}
        {isMobile && (
          <button
            onClick={toggleView}
            className="px-3 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition text-sm"
          >
            {currentView === "editor" ? "Show Output" : "Show Editor"}
          </button>
        )}

        {/* Save Button */}
        <button
          onClick={saveProjectCallback}
          className="px-3 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition text-sm"
        >
          Save
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          <FiDownload className="text-xl" />
          <span className="hidden md:inline font-medium">Download</span>
        </button>
      </div>
    </nav>
  );
};

export default EditorNavbar;

import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { Code } from "lucide-react";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const EditorNavbar = ({
  projectName,
  editorContent,
  isMobile,
  currentView,
  setCurrentView,
  saveProjectCallback,
}) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lastSavedContent, setLastSavedContent] = useState(editorContent);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalSaving, setModalSaving] = useState(false); 

  useEffect(() => {
    if (editorContent !== lastSavedContent) {
      setIsSaved(false);
    }
  }, [editorContent, lastSavedContent]);

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
    if (!isSaved) {
      setShowConfirmModal(true);
    } else {
      navigate("/projects");
    }
  };

  const handleConfirmBack = () => {
    setShowConfirmModal(false);
    navigate("/projects");
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveProjectCallback();
      setLastSavedContent(editorContent);
      setIsSaved(true);
    } catch (error) {
      alert("Error saving the project.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleModalSave = async () => {
    try {
      setModalSaving(true);
      await saveProjectCallback();
      setLastSavedContent(editorContent);
      setIsSaved(true);
      setShowConfirmModal(false); 
    } catch (error) {
      alert("Error saving the project.");
      console.error(error);
    } finally {
      setModalSaving(false);
    }
  };

  const toggleView = () => {
    setCurrentView(currentView === "editor" ? "output" : "editor");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-20 h-16 bg-white shadow-md border-b">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-3 py-2 text-sm md:text-base text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          <IoIosArrowBack className="text-xl" />
          <span className="hidden md:inline font-medium">Back</span>
        </button>

        {/* Brand */}
        <div className="hidden md:flex items-center gap-2">
          <Code size={32} className="text-blue-600" />
          <span className="text-3xl font-semibold text-gray-800">Code Editor</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile View Toggle */}
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
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-3 py-2 rounded shadow text-sm transition
              ${isSaved ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            {isSaving ? (
              <>
                <FaSpinner className="animate-spin" />
                Saving...
              </>
            ) : (
              <span>{isSaved ? "Saved" : "Save"}</span>
            )}
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p className="text-lg font-medium mb-4">
              Please save your changes before leaving to avoid losing your work. ✨
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmBack}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Go Back
              </button>
              <button
                onClick={handleModalSave}
                disabled={modalSaving}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-2"
              >
                {modalSaving ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EditorNavbar;

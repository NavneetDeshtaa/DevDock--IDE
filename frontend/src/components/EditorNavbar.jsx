import React from "react";
import logo from "../images/logos/logo.png";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const EditiorNavbar = ({ projectName, editorContent }) => {
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

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#1a1a1a] shadow-lg">
      {/* Back Button */}
      <i
        onClick={handleBack}
        className="p-[10px] bg-[#333] rounded-[8px] cursor-pointer text-[20px] mr-4 transition-all duration-200 hover:bg-[#555] text-white"
        title="Back to Home"
      >
        <IoIosArrowBack />
      </i>
      
      {/* Logo */}
      <div className="logo">
        <img className="w-[150px] object-contain" src={logo} alt="Logo" />
      </div>
      
      {/* Download Button */}
      <i
        onClick={handleDownload}
        className="p-[10px] bg-[#333] rounded-[8px] cursor-pointer text-[20px] transition-all duration-200 hover:bg-[#555] text-white"
        title="Download Editor Content"
      >
        <FiDownload />
      </i>
    </div>
  );
};

export default EditiorNavbar;

import React, { useEffect, useState, useContext, useCallback } from "react";
import Editor2 from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Play, Code, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import EditorNavbar from "../components/EditorNavbar";

const Editor = () => {
  const [code, setCode] = useState("");
  const [editorWidth, setEditorWidth] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const { id } = useParams();
  const { api_base_url } = useContext(AppContext);

  // Fetch Project Data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${api_base_url}/api/getProject`, {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            projectId: id,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setCode(result.project.code || "");
          setData(result.project);
        } else {
          toast.error(result.msg);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        toast.error("Failed to load project.");
      }
    };

    fetchProject();
  }, [id, api_base_url]);

  // Save Project
  const saveProject = useCallback(() => {
    if (!code) return;

    fetch(`${api_base_url}/api/saveProject`, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
        code: code.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.success ? toast.success(data.msg) : toast.error(data.msg);
      })
      .catch((err) => {
        console.error("Error saving project:", err);
        toast.error("Failed to save the project.");
      });
  }, [code, id, api_base_url]);

  // Handle Save Shortcut (Ctrl + S)
  useEffect(() => {
    const handleSaveShortcut = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveProject();
      }
    };

    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [saveProject]);

  // Run Code Execution
  const runProject = async () => {
    if (!data?.projLanguage || !data?.version) {
      toast.error("Invalid project settings.");
      return;
    }

    setIsRunning(true);
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: data.projLanguage,
          version: data.version,
          files: [
            {
              filename: `${data.name}.${getFileExtension(data.projLanguage)}`,
              content: code,
            },
          ],
        }),
      });

      const result = await response.json();
      setOutput(result.run.output || "Execution completed with no output.");
      setError(result.run.code === 1);
    } catch (err) {
      console.error("Error running project:", err);
      setOutput("An error occurred while running the code.");
      setError(true);
    }
    setIsRunning(false);
  };

  // Get File Extension Based on Language
  const getFileExtension = (language) => {
    const extensions = {
      python: "py",
      java: "java",
      javascript: "js",
      c: "c",
      cpp: "cpp",
      bash: "sh",
    };
    return extensions[language] || "";
  };

  return (
    <>
      <EditorNavbar projectName={data?.name} editorContent={code} />
      <div
        className="flex items-center bg-gray-100"
        style={{ height: "calc(100vh - 90px)" }}
      >
        {/* Left Section - Code Editor */}
        <div
          className="h-full p-6 bg-white rounded-lg shadow-lg border border-gray-300"
          style={{ width: `${editorWidth}%` }}
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-300">
            <div className="flex-grow flex justify-center">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Code size={20} /> Code Editor
              </h2>
            </div>
          </div>

          <Editor2
            onChange={(newCode) => setCode(newCode || "")}
            theme="light"
            height="100%"
            width="100%"
            language={data?.projLanguage}
            value={code}
          />
        </div>

        {/* Resizable Divider */}
        <div
          className="w-2 h-full bg-gray-400 cursor-col-resize"
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startWidth = editorWidth;

            const onMouseMove = (e) => {
              const newWidth = Math.max(
                20,
                Math.min(
                  80,
                  startWidth + ((e.clientX - startX) / window.innerWidth) * 100
                )
              );
              setEditorWidth(newWidth);
            };

            const onMouseUp = () => {
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          }}
        ></div>

        {/* Right Section - Output */}
        <div
          className="h-full p-6 bg-white rounded-lg shadow-lg border border-gray-300"
          style={{ width: `${100 - editorWidth}%` }}
        >
          <div className="flex pb-4 border-b border-gray-300 items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Play size={20} /> Output
            </h2>
            <button
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md shadow-md transition-all hover:bg-blue-700"
              onClick={runProject}
              disabled={isRunning}
            >
              {isRunning ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Play size={18} />
              )}{" "}
              Run
            </button>
          </div>
          <pre
            className={`w-full h-full mt-4 p-5 rounded-lg bg-gray-100 border border-gray-300 text-sm overflow-auto ${
              error ? "text-red-500" : "text-gray-800"
            }`}
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {output || "Your output will appear here..."}
          </pre>
        </div>
      </div>
    </>
  );
};

export default Editor;

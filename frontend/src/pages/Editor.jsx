import React, { useEffect, useState, useContext, useCallback } from "react";
import Editor2 from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Play, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import EditorNavbar from "../components/EditorNavbar";

const Editor = () => {
  const [code, setCode] = useState("");
  const [editorWidth, setEditorWidth] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [animatedOutput, setAnimatedOutput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentView, setCurrentView] = useState("editor"); // "editor" or "output" for mobile toggle

  const { id } = useParams();
  const { api_base_url } = useContext(AppContext);

  // Responsive detection for mobile screens.
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Save function to be passed to the navbar.
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
      const finalOutput =
        result.run.output || "Execution completed with no output.";
      setOutput(finalOutput);
      setError(result.run.code === 1);
    } catch (err) {
      console.error("Error running project:", err);
      setOutput("An error occurred while running the code.");
      setError(true);
    }
    setIsRunning(false);
  };

  // Animate the output display (typing effect) when output changes.
  useEffect(() => {
    let index = 0;
    setAnimatedOutput("");
    const interval = setInterval(() => {
      if (index < output.length) {
        setAnimatedOutput((prev) => prev + output.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [output]);

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
      <EditorNavbar
        projectName={data?.name}
        editorContent={code}
        isMobile={isMobile}
        currentView={currentView}
        setCurrentView={setCurrentView}
        saveProjectCallback={saveProject}
      />

      {isMobile ? (
        // On mobile, show only the selected view.
        <div className="bg-gray-100" style={{ height: "calc(100vh - 64px)" }}>
          {currentView === "editor" ? (
            <div className="h-full p-4 bg-white m-4 rounded-lg shadow border border-gray-300">
              <div className="flex items-center justify-center pb-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  Code Editor
                </h2>
              </div>
              <Editor2
                onChange={(newCode) => setCode(newCode || "")}
                theme="light"
                height="calc(100% - 50px)"
                width="100%"
                language={data?.projLanguage}
                value={code}
              />
            </div>
          ) : (
            <div className="h-full p-4 bg-white m-4 rounded-lg shadow border border-gray-300 flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  Output
                </h2>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md shadow transition-all hover:bg-blue-700"
                  onClick={runProject}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Play size={18} />
                  )}
                  Run
                </button>
              </div>
              <pre
                className={`w-full mt-4 p-5 rounded-lg bg-gray-100 border border-gray-300 text-sm overflow-auto ${
                  error ? "text-red-500" : "text-gray-800"
                }`}
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {animatedOutput || "Your output will appear here..."}
              </pre>
            </div>
          )}
        </div>
      ) : (
        // Desktop view: show both editor and output side-by-side with draggable divider.
        <div
          className="flex bg-gray-100"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div
            className="h-full p-6 bg-white rounded-lg shadow border border-gray-300"
            style={{ width: `${editorWidth}%` }}
          >
            <div className="flex items-center justify-center pb-4 border-b border-gray-300">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                Code Editor
              </h2>
            </div>
            <Editor2
              onChange={(newCode) => setCode(newCode || "")}
              theme="light"
              height="calc(100% - 50px)"
              width="100%"
              language={data?.projLanguage}
              value={code}
            />
          </div>

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
                    startWidth +
                      ((e.clientX - startX) / window.innerWidth) * 100
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

          <div
            className="h-full p-6 bg-white rounded-lg shadow border border-gray-300"
            style={{ width: `${100 - editorWidth}%` }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                Output
              </h2>
              <button
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md shadow transition-all hover:bg-blue-700"
                onClick={runProject}
                disabled={isRunning}
              >
                {isRunning ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Play size={18} />
                )}
                Run
              </button>
            </div>
            <pre
              className={`w-full mt-4 p-5 rounded-lg bg-gray-100 border border-gray-300 text-sm overflow-auto ${
                error ? "text-red-500" : "text-gray-800"
              }`}
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {animatedOutput || "Your output will appear here..."}
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;

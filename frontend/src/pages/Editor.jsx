import React, { useEffect, useState,useContext } from 'react';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';
import EditiorNavbar from '../components/EditorNavbar';

const Editor = () => {
  const [code, setCode] = useState(""); 
  const { id } = useParams(); 
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const { api_base_url } = useContext(AppContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${api_base_url}/api/getProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); 
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        toast.error('Failed to load project.');
      });
  }, [id]);


  const saveProject = () => {
    const trimmedCode = code?.toString().trim(); 
    console.log('Saving code:', trimmedCode); 

    fetch(`${api_base_url}/api/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error saving project:', err);
        toast.error('Failed to save the project.');
      });
  };

 
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault(); 
      saveProject(); 
    }
  };


  useEffect(() => {
    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [code]); 

  const runProject = () => {
    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: data.projLanguage,
        version: data.version,
        files: [
          {
            filename: data.name + data.projLanguage === "python" ? ".py" : data.projLanguage === "java" ? ".java" : data.projLanguage === "javascript" ? ".js" : data.projLanguage === "c" ? ".c" : data.projLanguage === "cpp" ? ".cpp" : data.projLanguage === "bash" ? ".sh" : "",
            content: code
          }
        ]
      })
    }).then(res => res.json()).then(data => {
      console.log(data)
      setOutput(data.run.output);
      setError(data.run.code === 1 ? true : false);
    })
  }

  return (
    <>
      <EditiorNavbar projectName={data?.name} editorContent={code} />
      <div className="flex items-center justify-between" style={{ height: 'calc(100vh - 90px)', backgroundColor: '#f9f9f9' }}>
        {/* Left Section - Code Editor */}
        <div className="left w-[50%] h-full">
          <Editor2
            onChange={(newCode) => {
              setCode(newCode || ''); 
            }}
            theme="vs-dark"
            height="100%"
            width="100%"
            language="python"
            value={code} 
          />
        </div>

        {/* Right Section - Output */}
        <div className="right p-[20px] w-[50%] h-full bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex pb-3 border-b-[1px] border-b-[#e1e1e1] items-center justify-between px-[30px]">
            <p className="text-lg font-semibold">Output</p>
            <button
              className="btnNormal !w-fit !px-[20px] bg-blue-500 text-white transition-all hover:bg-blue-600 rounded-md"
              onClick={runProject}
            >
              Run
            </button>
          </div>
          <pre
            className={`w-full h-[75vh] mt-4 p-4 rounded-lg bg-[#f0f0f0] border border-[#e1e1e1] ${error ? 'text-red-500' : 'text-black'}`}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {output || 'Your output will appear here...'}
          </pre>
        </div>
      </div>
    </>
  );
};

export default Editor;
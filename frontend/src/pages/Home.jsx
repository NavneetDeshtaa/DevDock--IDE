import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isEditModelShow, setIsEditModelShow] = useState(false);
  const username = localStorage.getItem("username");
  const { api_base_url } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [projects, setProjects] = useState(null);
  const [editProjId, setEditProjId] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: "#ccc",
      color: "#000",
      padding: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "#000",
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
      color: "#000",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa",
    }),
  };

  const getRunTimes = async () => {
    try {
      let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
      let data = await res.json();

      const filteredLanguages = [
        "python",
        "javascript",
        "c",
        "c++",
        "java",
        "bash",
      ];

      const options = data
        .filter((runtime) => filteredLanguages.includes(runtime.language))
        .map((runtime) => ({
          label: `${runtime.language} (${runtime.version})`,
          value: runtime.language === "c++" ? "cpp" : runtime.language,
          version: runtime.version,
        }));

      setLanguageOptions(options);
    } catch (error) {
      toast.error("Failed to fetch runtimes");
    }
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  const getProjects = async () => {
    try {
      const res = await fetch(api_base_url + "/api/getProjects", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getProjects(), getRunTimes()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createProj = async () => {
    try {
      const res = await fetch(api_base_url + "/api/createProj", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          projLanguage: selectedLanguage.value,
          token: localStorage.getItem("token"),
          version: selectedLanguage.version,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setName("");
        navigate("/editior/" + data.projectId);
        toast.success("Project Created successfully");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  const deleteProject = async (id) => {
    let conf = confirm("Are you sure you want to delete this project?");
    if (conf) {
      try {
        const res = await fetch(api_base_url + "/api/deleteProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: id,
            token: localStorage.getItem("token"),
          }),
        });
        const data = await res.json();
        if (data.success) {
          getProjects();
          toast.success("Project Deleted Successfully");
        } else {
          toast.error(data.msg);
        }
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  };

  const updateProj = async () => {
    try {
      const res = await fetch(api_base_url + "/api/editProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: editProjId,
          token: localStorage.getItem("token"),
          name: name,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
        toast.success("Project Updated Successfully");
      } else {
        toast.error(data.msg);
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      }
    } catch (error) {
      toast.error("Failed to update project");
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      ) : isLoggedIn ? (
        <>
          {/* Greeting & Create Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center px-6 sm:px-10 md:px-20 justify-between mt-6 text-black pt-20 gap-4">
            <h3 className="text-xl sm:text-2xl font-semibold">
              👋 Hi, {username || "Guest"}!{" "}
              <span className="text-gray-500 text-base sm:text-lg">
                Ready to code today?
              </span>
            </h3>
            <button
              onClick={() => setIsCreateModelShow(true)}
              className="w-full md:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 shadow-md"
            >
              Create New Project<span className="text-white">➕</span>
            </button>
          </div>

          {/* Project List */}
          <div className="projects px-6 sm:px-10 md:px-20 mt-6 pb-10">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={index}
                  className="project flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white text-black border border-gray-200 rounded-lg shadow-sm mb-4 hover:shadow-lg transition-all gap-4"
                >
                  {/* Project Info */}
                  <div
                    onClick={() => navigate("/editior/" + project._id)}
                    className="flex flex-1 items-center gap-4 cursor-pointer"
                  >
                    {/* Project Language Icon */}
                    <img
                      className="w-16 sm:w-20 h-14 sm:h-16 object-cover rounded-md"
                      src={
                        project.projLanguage === "python"
                          ? "https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png"
                          : project.projLanguage === "javascript"
                          ? "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                          : project.projLanguage === "cpp"
                          ? "https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png"
                          : project.projLanguage === "c"
                          ? "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"
                          : project.projLanguage === "java"
                          ? "https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png"
                          : project.projLanguage === "bash"
                          ? "https://w7.pngwing.com/pngs/48/567/png-transparent-bash-shell-script-command-line-interface-z-shell-shell-rectangle-logo-commandline-interface-thumbnail.png"
                          : ""
                      }
                      alt="Project Language"
                    />

                    {/* Project Name & Date */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Created on: {new Date(project.date).toDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium transition-all hover:bg-blue-600 shadow"
                      onClick={() => {
                        setIsEditModelShow(true);
                        setEditProjId(project._id);
                        setName(project.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md font-medium transition-all hover:bg-red-600 shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">
                No Projects Found!
              </p>
            )}
          </div>

          {/* Create Project Modal */}
          {isCreateModelShow && (
            <div
              onClick={(e) => {
                if (e.target.classList.contains("modalContainer")) {
                  setIsCreateModelShow(false);
                  setName("");
                }
              }}
              className="modalContainer flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 px-4"
            >
              <div className="modalBox p-6 w-full max-w-md bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-center mb-4">
                  Create Project
                </h3>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter project name"
                  className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Select
                  placeholder="Select a Language"
                  options={languageOptions}
                  styles={customStyles}
                  onChange={handleLanguageChange}
                />
                {selectedLanguage && (
                  <>
                    <p className="text-sm text-green-600 mt-2">
                      Selected Language: {selectedLanguage.label}
                    </p>
                    <button
                      onClick={async () => {
                        setIsCreateLoading(true);
                        await createProj();
                        setIsCreateLoading(false);
                      }}
                      className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all flex items-center justify-center"
                      disabled={isCreateLoading}
                    >
                      {isCreateLoading ? <Spinner /> : "✅ Create"}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Edit Project Modal */}
          {isEditModelShow && (
            <div
              onClick={(e) => {
                if (e.target.classList.contains("modalContainer")) {
                  setIsEditModelShow(false);
                  setName("");
                }
              }}
              className="modalContainer flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 px-4"
            >
              <div className="modalBox p-6 w-full max-w-md bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-center mb-4">
                  Update Project
                </h3>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter project name"
                  className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={async () => {
                    setIsUpdateLoading(true);
                    await updateProj();
                    setIsUpdateLoading(false);
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all flex items-center justify-center"
                  disabled={isUpdateLoading}
                >
                  {isUpdateLoading ? <Spinner /> : "🔄Update"}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-center w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Access Restricted
            </h2>
            <p className="text-gray-600 mt-2">
              Please log in to create and manage your projects.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 shadow-md w-full"
            >
              🔑 Log In / Sign up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import DOMPurify from "dompurify";
function Page() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/projects/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setProjects((prev) => prev.filter((p) => p._id !== deleteId));
      setFilteredProjects((prev) => prev.filter((p) => p._id !== deleteId));
      setShowModal(false);
      setDeleteId(null);
    } catch (err) {
      alert("Delete failed");
      console.error("Delete error:", err);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data); // Initialize with all data
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log("projects form Project page:", projects);

  const stripHtml = (html) => {
    if (typeof window === "undefined") return ""; // For SSR safety
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Handle search on button click
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredProjects(projects); // Reset to full list if empty
    } else {
      const filtered = projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <>
      <div className="w-full h-full ">
        <div className="flex flex-col md:flex-row justify-between">
          <li
            onClick={() => router.push("projects/addNewProject")}
            className="activeBg px-4 py-1.5 rounded flex items-center gap-3 cursor-pointer text-xs md:text-base w-fit mb-5 md:mb-0"
          >
            <FaPlus /> Add New
          </li>

          <div className="h-fit flex gap-2 justify-end">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="subBoxBg subTitleText font-thin rounded px-4 py-1.5 outline-none w-full"
            />
            <button
              onClick={handleSearch}
              className="activeBg px-4 rounded cursor-pointer text-xs md:text-base "
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg titleText">Projects List</h2>

          {loading ? (
            <p className="titleText text-center mt-10">Loading...</p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-center subTitleText mt-10">No projects found.</p>
          ) : (
            <div className="flex flex-col gap-5 mt-5 pb-10">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="relative w-full h-20 p-3 md:p-0 subBoxBg drop-shadow-lg flex flex-col md:flex-row md:justify-between rounded overflow-hidden"
                >
                  <div className="flex items-center gap-5">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      width={500}
                      height={500}
                      className="w-40 h-full hidden md:flex"
                    />
                    <div>
                      <span className="text-[9px] subTitleText capitalize hidden md:block">
                        {project.projectType}
                      </span>
                      <h2 className="text-xs md:text-base activeText">{project.title}</h2>
                      <div
                        className="text-xs subTitleText hidden md:block"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            stripHtml(project.description).length > 130
                              ? stripHtml(project.description).slice(0, 130) +
                                  "..."
                              : project.description
                          ),
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex mt-3 md:mt-0 gap-3">
                    <button
                      className="textWithHover cursor-pointer"
                      onClick={() =>
                        router.push(`/projects/edit/${project._id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="textWithHover cursor-pointer"
                      onClick={() => handleDeleteClick(project._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000bb] z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this project?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;

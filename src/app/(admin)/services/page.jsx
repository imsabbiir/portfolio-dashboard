"use client";
import React, { useEffect, useState } from "react";
import { FaPen, FaTimes, FaTrash } from "react-icons/fa";

function Page() {
  const [services, setServices] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });

  // Track which service is currently being asked for delete confirmation
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services data", error);
      }
    };
    fetchData();
  }, []);

  const handleDetailChange = (serviceIndex, detailIndex, newValue) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].details[detailIndex] = newValue;
    setServices(updatedServices);
  };

  const handleUpdate = async (serviceIndex) => {
    const updatedService = services[serviceIndex];

    try {
      const res = await fetch(`/api/services/${updatedService._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedService),
      });

      if (!res.ok) throw new Error("Failed to update");
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewServiceSubmit = async (e) => {
    e.preventDefault();

    const { title, details } = formData;

    if (!title.trim() || !details.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    const detailLines = details
      .split("\n") // split on new lines
      .map((line) => line.trim()) // trim each line
      .filter(Boolean); // remove empty lines

    const finalData = {
      title: title.trim(),
      details: detailLines,
    };

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) throw new Error("Failed to add service");

      const newService = await res.json();
      setServices((prev) => [...prev, newService]);
      setFormData({ title: "", details: "" }); // clear form
    } catch (err) {
      console.error("Error adding service:", err);
    }
  };

  const handleDeleteConfirm = (serviceIndex) => {
    setDeleteIndex(serviceIndex);
  };

  const handleDeleteCancel = () => {
    setDeleteIndex(null);
  };

  const handleDelete = async (serviceIndex) => {
    const serviceToDelete = services[serviceIndex];

    try {
      const res = await fetch(`/api/services/${serviceToDelete._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete service");

      // Remove from local state
      setServices((prev) => prev.filter((_, index) => index !== serviceIndex));
      setDeleteIndex(null);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="">
      <form
        className="flex flex-col gap-5 md:w-1/3 p-10 gradientBg rounded"
        onSubmit={handleNewServiceSubmit}
      >
        <input
          name="title"
          type="text"
          placeholder="Service Title"
          value={formData.title}
          onChange={handleChange}
          className="subBoxBg px-3 py-2 rounded subtitleText focus:outline-none"
        />
        <textarea
          name="details"
          placeholder="Service Lists... (each line becomes a list item)"
          value={formData.details}
          onChange={handleChange}
          className="subBoxBg px-3 py-2 rounded subtitleText text-sm resize-none h-40 focus:outline-none"
        ></textarea>
        <button
          type="submit"
          className="text-base font-semibold activeBg px-5 py-2 rounded cursor-pointer flex items-center gap-3 justify-center"
        >
          <span className="text-xl">+</span> <span>Add Services</span>
        </button>
      </form>

      <div className="w-full mt-6 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {services?.map((service, serviceIndex) => {
          const isEditing = editIndex === serviceIndex;
          const isDeleteConfirm = deleteIndex === serviceIndex;

          return (
            <div
              key={service._id}
              className="px-4 py-6 gradientBg relative flex flex-col"
            >
              {isEditing ? (
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => {
                    const updatedServices = [...services];
                    updatedServices[serviceIndex].title = e.target.value;
                    setServices(updatedServices);
                  }}
                  className="text-sm font-semibold titleText mb-4 bg-transparent serviceListBottomBorder focus:outline-none w-full"
                />
              ) : (
                <h2 className="text-sm font-semibold titleText mb-4">
                  {service.title}
                </h2>
              )}

              <ul className="mb-4 flex flex-col gap-2">
                {service?.details?.map((li, detailIndex) => (
                  <li key={detailIndex}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={li}
                        onChange={(e) =>
                          handleDetailChange(
                            serviceIndex,
                            detailIndex,
                            e.target.value
                          )
                        }
                        className="text-xs subTitleText bg-transparent serviceListBottomBorder w-full focus:outline-none"
                      />
                    ) : (
                      <span className="subTitleText text-xs">{li}</span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Edit / Close Icon */}
              <div className="absolute top-2 right-2 flex gap-2">
                <div
                  className="h-7 w-7 rounded-full activeBg flex justify-center items-center cursor-pointer swapText"
                  onClick={() =>
                    isEditing ? setEditIndex(null) : setEditIndex(serviceIndex)
                  }
                >
                  {isEditing ? (
                    <FaTimes className="text-xs" />
                  ) : (
                    <FaPen className="text-xs" />
                  )}
                </div>
                <div
                  className=" h-7 w-7 rounded-full activeBg flex justify-center items-center cursor-pointer swapText"
                  onClick={() => handleDeleteConfirm(serviceIndex)}
                >
                  <FaTrash className="text-xs" />
                </div>
              </div>

              {/* Delete Icon */}

              {/* Update Button */}
              {isEditing && (
                <button
                  onClick={() => handleUpdate(serviceIndex)}
                  className="mt-3 px-4 py-1 text-xs rounded cursor-pointer activeBg self-start"
                >
                  Update
                </button>
              )}

              {/* Delete Confirmation */}
              {isDeleteConfirm && (
                <div className="absolute top-10 right-0 bg-white text-black p-3 rounded shadow-md z-10 flex flex-col gap-2">
                  <p className="text-sm font-semibold">Are you sure?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(serviceIndex)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-xs cursor-pointer"
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleDeleteCancel}
                      className="px-3 py-1 bg-gray-300 rounded text-xs cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;

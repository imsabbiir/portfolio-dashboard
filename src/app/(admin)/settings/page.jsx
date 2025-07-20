"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaUpload, FaTimes } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";

const Settings = () => {
  const imageChnageRef = useRef();
  const [details, setDetails] = useState(null);
  const [tempValues, setTempValues] = useState({});
  const [editSection, setEditSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/developerdetails");
        const data = await res.json();
        setDetails(data);
        setTempValues(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching developer details:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = () => {
    imageChnageRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempValues((prev) => ({
          ...prev,
          profileImage: reader.result, // base64 preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (section) => {
    setEditSection(section);
    setTempValues({ ...details });
  };

  const handleCancel = () => {
    setEditSection(null);
    setTempValues({ ...details });
  };

  const handleInputChange = (field, value) => {
    setTempValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    console.log("Data to be saved:", tempValues);

    try {
      const response = await fetch("/api/developerdetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempValues),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Data successfully updated:", result);
        setDetails(tempValues);
        setEditSection(null);
      } else {
        console.error("Failed to update:", result.message);
        alert(result.message || "Update failed");
      }
    } catch (error) {
      console.error("Error while saving:", error);
      alert("An error occurred while saving");
    }
  };

  // Check if any value changed compared to original details
  const isChanged = () => {
    if (!details) return false;
    return Object.keys(details).some((key) => details[key] !== tempValues[key]);
  };

  if (loading || !details) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-7">
        {/* Profile Section */}
        <div className="py-5 px-10 rounded flex flex-col justify-center items-center gradientBg relative">
          <div className="mt-4 relative w-32 h-32 rounded-full overflow-hidden group cursor-pointer">
            <Image
              src={tempValues.profileImage || details.profileImage}
              alt="Profile"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              onClick={handleImageChange}
            />
            <div
              className="w-full h-full hidden group-hover:flex justify-center items-center absolute top-0 left-0 bg-[#0000009a] transition-all duration-200 ease-in-out cursor-pointer"
              onClick={handleImageChange}
            >
              <FaUpload className="text-2xl text-white" />
            </div>
            <input
              type="file"
              ref={imageChnageRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {editSection === "profile" ? (
            <>
              <input
                type="text"
                value={tempValues.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="text-xl titleText mt-2 text-center w-full bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none"
              />
              <input
                type="text"
                value={tempValues.profession}
                onChange={(e) => handleInputChange("profession", e.target.value)}
                className="text-sm subTitleText mt-1 text-center w-full bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none"
              />
            </>
          ) : (
            <>
              <h2 className="text-xl titleText">{details.name}</h2>
              <h2 className="text-sm subTitleText">{details.profession}</h2>
            </>
          )}

          <div
            className="absolute -top-2 -right-2 h-7 w-7 rounded-full activeBg flex justify-center items-center cursor-pointer swapText"
            onClick={() =>
              editSection === "profile" ? handleCancel() : handleEdit("profile")
            }
          >
            {editSection === "profile" ? (
              <FaTimes className="text-xs" />
            ) : (
              <FaPen className="text-xs" />
            )}
          </div>
        </div>

        {/* Address Section */}
        <div className="py-5 px-10 rounded flex flex-col justify-center items-center gradientBg relative">
          <ul className="w-full flex flex-col gap-2 titleText">
            <li className="flex justify-between w-full items-center">
              <span>Residence:</span>
              {editSection === "address" ? (
                <input
                  value={tempValues.residence}
                  onChange={(e) => handleInputChange("residence", e.target.value)}
                  className="subTitleText w-2/3 text-right bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none"
                />
              ) : (
                <span className="subTitleText w-2/3 text-right">{details.residence}</span>
              )}
            </li>
            <li className="flex justify-between w-full items-center">
              <span>City:</span>
              {editSection === "address" ? (
                <input
                  value={tempValues.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="subTitleText w-2/3 text-right bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none"
                />
              ) : (
                <span className="subTitleText w-2/3 text-right">{details.city}</span>
              )}
            </li>
            <li className="flex justify-between w-full items-center">
              <span>District:</span>
              {editSection === "address" ? (
                <input
                  value={tempValues.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  className="subTitleText w-2/3 text-right bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none"
                />
              ) : (
                <span className="subTitleText w-2/3 text-right">{details.district}</span>
              )}
            </li>
          </ul>
          <div
            className="absolute -top-2 -right-2 h-7 w-7 rounded-full activeBg flex justify-center items-center cursor-pointer swapText"
            onClick={() =>
              editSection === "address" ? handleCancel() : handleEdit("address")
            }
          >
            {editSection === "address" ? (
              <FaTimes className="text-xs" />
            ) : (
              <FaPen className="text-xs" />
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-5 px-10 rounded flex flex-col justify-center items-center gradientBg relative">
          <ul className="w-full flex flex-col gap-2 titleText">
            <li className="flex justify-between w-full items-center">
              <span>Email:</span>
              {editSection === "contact" ? (
                <input
                  value={tempValues.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="subTitleText w-2/3 text-right bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none"
                />
              ) : (
                <span className="subTitleText w-2/3 text-right">{details.email}</span>
              )}
            </li>
            <li className="flex justify-between w-full items-center">
              <span>Mobile:</span>
              {editSection === "contact" ? (
                <input
                  value={tempValues.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className="subTitleText w-2/3 text-right bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none"
                />
              ) : (
                <span className="subTitleText w-2/3 text-right">{details.mobile}</span>
              )}
            </li>
            <li className="flex justify-between w-full items-center">
              <span>WhatsApp:</span>
              {editSection === "contact" ? (
                <input
                  value={tempValues.whatsapp}
                  onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                  className="subTitleText w-2/3 text-right bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none"
                />
              ) : (
                <span className="subTitleText w-2/3 text-right">{details.whatsapp}</span>
              )}
            </li>
            <li className="flex justify-between w-full items-center">
              <span>Telegram:</span>
              {editSection === "contact" ? (
                <input
                  value={tempValues.telegram}
                  onChange={(e) => handleInputChange("telegram", e.target.value)}
                  className="subTitleText w-2/3 text-right bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none"
                />
              ) : (
                <span className="subTitleText w-2/3 text-right">{details.telegram}</span>
              )}
            </li>
          </ul>
          <div
            className="absolute -top-2 -right-2 h-7 w-7 rounded-full activeBg flex justify-center items-center cursor-pointer swapText"
            onClick={() =>
              editSection === "contact" ? handleCancel() : handleEdit("contact")
            }
          >
            {editSection === "contact" ? (
              <FaTimes className="text-xs" />
            ) : (
              <FaPen className="text-xs" />
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        className={`px-5 py-2 rounded mt-7 cursor-pointer ${
          isChanged() ? "activeBg" : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleSave}
        disabled={!isChanged()}
      >
        Save
      </button>
    </div>
  );
};

export default Settings;

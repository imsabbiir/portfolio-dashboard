"use client";
import React, { useState } from "react";
import MultipleImageSelection from "@/Components/MultipleImageSelection";
import BasicDatePicker from "@/Components/DatePicker";
import MultipleSelection from "@/Components/MultipleSelection";
import SingleSelected from "@/Components/SingleSelected";
import TinyEditor from "@/Components/TinyEditor";

const technologies = [
  "HTML5",
  "CSS3",
  "SCSS",
  "Tailwind CSS",
  "Bootstrap",
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Svelte",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Git",
  "GitHub",
  "Webpack",
  "Vite",
  "Babel",
  "Parcel",
  "JSX",
];

const plugins = [
  "GSAP",
  "Framer Motion",
  "AOS",
  "Lottie",
  "React Icons",
  "Font Awesome",
  "BoxIcons",
  "Google Fonts",
  "TinyMCE",
  "Quill",
  "CKEditor",
  "Dropzone",
  "React Dropzone",
  "React Hook Form",
  "Formik",
  "Yup",
  "Zod",
  "uuid",
  "classnames",
  "React Helmet",
  "Next.js Head",
  "i18next",
  "react-intl",
  "Moment.js",
  "Day.js",
  "date-fns",
  "Lodash",
  "Axios",
  "SWR",
  "React Query",
  "TanStack Query",
  "React Table",
  "DataTables.js",
  "Recharts",
  "Chart.js",
  "Victory",
  "ApexCharts",
  "NextAuth.js",
  "Auth0",
  "Firebase Auth",
  "Jest",
  "React Testing Library",
  "Cypress",
  "Playwright",
  "Puppeteer",
];
const projectTypes = ["Design", "Development", "WordPress", "Blogger"];

const initialForm = {
  title: "",
  description: "",
  liveLink: "",
  clientName: "",
  technologies: [],
  plugins: [],
  projectType: "",
  orderDate: null,
  completeDate: null,
  images: [],
};

function Page() {
  const [formData, setFormData] = useState(initialForm);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const imgbbAPIKey = "6ad1958c294b93229c443eb0b10d8673";

  const updateForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
  if (!selectedImages.length) {
    alert("Please select images!");
    return;
  }

  setUploading(true);

  try {
    const uploadedUrls = [];

    for (const file of selectedImages) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        uploadedUrls.push(result.data.url);
      } else {
        console.error("Image upload failed:", result);
        alert("Image upload failed!");
        setUploading(false);
        return;
      }
    }

    const finalData = {
      ...formData,
      images: uploadedUrls,
    };

    console.log("📦 Final Project Data:", finalData);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      console.error("❌ Server Error:", errorResponse);
      alert("❌ Submission failed: " + errorResponse.message);
      setUploading(false);
      return;
    }

    const result = await res.json();
    console.log("✅ Project created:", result);

    alert("✅ Project submitted successfully!");
    setFormData(initialForm);
    setSelectedImages([]);
    setUploading(false);

  } catch (error) {
    console.error("❌ Error submitting form:", error);
    alert("Submission failed: " + error.message);
    setUploading(false);
  }
};


  return (
    <div>
      <h2 className="text-lg titleText">Add New Project</h2>
      <div className="grid grid-cols-6 gap-14 mt-5">
        <div className="col-span-4">
          <input
            name="title"
            value={formData.title}
            placeholder="Project Name"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            className="gradientBg w-full subTitleText font-thin rounded px-4 outline-none py-2"
          />
          <TinyEditor
            value={formData.description}
            onEditorChange={(val) => updateForm("description", val)}
          />
          <MultipleImageSelection onFilesChange={setSelectedImages} />
        </div>

        <div className="col-span-2">
          <div className="gradientBg shadow-lg p-7 rounded flex flex-col gap-3">
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleSave}
                disabled={uploading}
                className="activeBg px-3 py-1.5 rounded cursor-pointer"
              >
                {uploading ? "Uploading..." : "Save"}
              </button>
              <button
                className="activeBg px-3 py-1.5 rounded cursor-pointer"
                onClick={() => router.push("/projects")}
              >
                Cancel
              </button>
            </div>
            <input
              name="liveLink"
              value={formData.liveLink}
              placeholder="Project Link"
              onChange={(e) => updateForm(e.target.name, e.target.value)}
              className="subBoxBg w-full subTitleText font-thin rounded px-4 outline-none py-2"
            />
            <MultipleSelection
              names={technologies}
              tag="Technologies"
              selectedValues={formData.technologies}
              onChange={(val) => updateForm("technologies", val)}
            />
            <MultipleSelection
              names={plugins}
              tag="Plugins"
              selectedValues={formData.plugins}
              onChange={(val) => updateForm("plugins", val)}
            />
            <SingleSelected
              names={projectTypes}
              tag="Project Type"
              value={formData.projectType}
              onChange={(val) => updateForm("projectType", val)}
            />
          </div>

          <div className="gradientBg shadow-lg p-7 rounded mt-5">
            <input
              name="clientName"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={(e) => updateForm(e.target.name, e.target.value)}
              className="subBoxBg w-full subTitleText font-thin rounded px-4 outline-none py-2"
            />
            <BasicDatePicker
              tag="Order Date"
              name="orderDate"
              value={formData.orderDate}
              onChange={(name, val) => updateForm(name, val)}
            />
            <BasicDatePicker
              tag="Complete Date"
              name="completeDate"
              value={formData.completeDate}
              onChange={(name, val) => updateForm(name, val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

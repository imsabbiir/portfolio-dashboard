"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MultipleImageSelection from "@/Components/MultipleImageSelection";
import MultipleSelection from "@/Components/MultipleSelection";
import BasicDatePicker from "@/Components/DatePicker";
import SingleSelected from "@/Components/SingleSelected";
import TinyEditor from "@/Components/TinyEditor";
import dayjs from "dayjs";
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
  features: [],
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
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const params = useParams(); // gets id from URL
  const { id } = params;
  const [existingImages, setExistingImages] = useState([]);

  const imgbbAPIKey = "6ad1958c294b93229c443eb0b10d8673";

  useEffect(() => {
    if (id) {
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const parsedData = {
            ...data,
            orderDate: data.orderDate ? dayjs(data.orderDate) : null,
            completeDate: data.completeDate ? dayjs(data.completeDate) : null,
          };
          setFormData(parsedData);
          setExistingImages(data.images || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading project:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const updateForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async () => {
    let imageUrls = [...existingImages]; // start with current images

    if (selectedImages.length) {
      setUploading(true);
      const uploaded = [];

      for (const file of selectedImages) {
        const form = new FormData();
        form.append("image", file);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
          {
            method: "POST",
            body: form,
          }
        );
        const result = await res.json();
        if (result.success) uploaded.push(result.data.url);
      }

      imageUrls = [...imageUrls, ...uploaded]; // keep existing, add new
      setUploading(false);
    }

    const updatedData = {
      ...formData,
      projectLink: formData.liveLink, // if needed
      images: imageUrls,
    };

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update");

      alert("Project updated successfully!");
      router.push("/projects");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="titleText text-center mt-10">Loading...</p>;

  return (
    <div>
      <h2 className="text-lg titleText">Edit Project</h2>
      <div className="grid grid-cols-6 gap-14 mt-5">
        <div className="col-span-4">
          <input
            name="title"
            value={formData.title}
            onChange={(e) => updateForm(e.target.name, e.target.value)}
            placeholder="Project Name"
            className="gradientBg w-full subTitleText font-thin rounded px-4 outline-none py-2"
          />
          <TinyEditor
            value={formData.description}
            onEditorChange={(val) => updateForm("description", val)}
          />
          <MultipleImageSelection
            existingImages={existingImages}
            onFilesChange={setSelectedImages}
            onExistingImageDelete={(url) =>
              setExistingImages((prev) => prev.filter((img) => img !== url))
            }
          />
        </div>

        <div className="col-span-2">
          <div className="gradientBg shadow-lg p-7 rounded flex flex-col gap-3">
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleUpdate}
                disabled={uploading}
                className="activeBg px-3 py-1.5 rounded cursor-pointer"
              >
                {uploading ? "Updating..." : "Update"}
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
              onChange={(e) => updateForm(e.target.name, e.target.value)}
              placeholder="Project Link"
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
              value={formData.clientName}
              onChange={(e) => updateForm(e.target.name, e.target.value)}
              placeholder="Client Name"
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

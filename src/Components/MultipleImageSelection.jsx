"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";

function MultipleImageSelection({
  onFilesChange,
  existingImages = [],
  onExistingImageDelete,
}) {
  const browseRef = useRef();
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleClick = () => browseRef.current.click();

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const handleDelete = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  useEffect(() => {
    return () => previewImages.forEach((url) => URL.revokeObjectURL(url));
  }, [previewImages]);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl titleText mb-2">Upload Your Images</h2>
      <span className="text-sm subTitleText mb-4 block">
        Select one or more images to upload
      </span>

      <div className="flex flex-wrap gap-2">
        <div
          className="flex items-center justify-center gap-2 cursor-pointer w-24 h-24 border border-gray-600 rounded"
          onClick={handleClick}
        >
          <FaUpload className="text-3xl text-blue-500" />
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={browseRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* New images preview */}
        {previewImages.map((img, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 group rounded overflow-hidden"
          >
            <Image
              src={img}
              alt={`preview-${idx}`}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center opacity-0 group-hover:opacity-100 transition">
              <FaTrash
                className="mx-auto cursor-pointer"
                onClick={() => handleDelete(idx)}
              />
            </div>
          </div>
        ))}

        {/* Existing images preview */}
        {existingImages.map((img, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 group rounded overflow-hidden"
          >
            <Image
              src={img}
              alt={`existing-${idx}`}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition">
              <FaTrash
                className="cursor-pointer"
                onClick={() => onExistingImageDelete(img)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleImageSelection;

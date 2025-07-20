import React from 'react'
import { FaPen, FaSave, FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdUpdate } from "react-icons/md";
function ActionButtons({ mode, onSave, onCancel, onAdd, onEdit, onUpdate }) {
    if (mode === "add") {
    return (
      <div className="flex gap-5 mb-5">
        <button onClick={onSave} className="activeBg swapText flex gap-3 items-center py-1.5 px-3 rounded cursor-pointer">
          <FaSave className="text-xs" /> <span>Save</span>
        </button>
        <button onClick={onCancel} className="activeBg swapText flex gap-3 items-center py-1.5 px-3 rounded cursor-pointer">
          <FaTimes className="text-xs" /> <span>Cancel</span>
        </button>
      </div>
    );
  } else if (mode === "edit") {
    return (
      <div className="flex gap-5 mb-5">
        <button onClick={onUpdate} className="activeBg swapText flex gap-3 items-center py-1.5 px-3 rounded cursor-pointer">
          <MdUpdate className="text-xs" /> <span>Update</span>
        </button>
        <button onClick={onCancel} className="activeBg swapText flex gap-3 items-center py-1.5 px-3 rounded cursor-pointer">
          <FaTimes className="text-xs" /> <span>Cancel</span>
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-5 mb-5">
        <button onClick={onAdd} className="activeBg swapText flex gap-3 items-center py-1.5 px-3 rounded cursor-pointer">
          <FaPlus className="text-xs" /> <span>Add</span>
        </button>
        <button onClick={onEdit} className="activeBg swapText flex gap-3 items-center py-1.5 px-3 rounded cursor-pointer">
          <FaPen className="text-xs" /> <span>Edit</span>
        </button>
      </div>
    );
  }
}

export default ActionButtons

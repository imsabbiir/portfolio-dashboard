import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  liveLink: { type: String, required: false },
  clientName: { type: String },
  projectType: { type: String, required: true },
  technologies: { type: [String], default: [] },
  plugins: { type: [String], default: [] },
  images: { type: [String], default: [] },
  orderDate: { type: Date, default: null },
  completeDate: { type: Date, default: null },
});

export default mongoose.models.Project || mongoose.model("Project", projectSchema);

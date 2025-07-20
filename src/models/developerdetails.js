import mongoose from "mongoose";

const developerDetailSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  telegram: {
    type: String,
    required: true,
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.models.developerdetail ||
  mongoose.model("developerdetail", developerDetailSchema);

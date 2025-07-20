import mongoose from "mongoose";

const serviceShcema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: [String],
    required: true,
  },
});

export default mongoose.models.Service ||
  mongoose.model("Service", serviceShcema);

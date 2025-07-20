import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  included: {
    type: Boolean,
    default: false,
  },
});

const packageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  services: {
    type: [serviceSchema],
    default: [],
  },
});

export default mongoose.models.Package || mongoose.model("Package", packageSchema);

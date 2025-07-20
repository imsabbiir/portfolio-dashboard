import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    percent: {
        type: String,
        required: true
    },
});


const skillSchema = new mongoose.Schema({
    languages: [itemSchema],
    technologies: [itemSchema],
    others: {
        type: [String],
        required: true
    }
})

export default mongoose.models.Skill ||
  mongoose.model("Skill", skillSchema);
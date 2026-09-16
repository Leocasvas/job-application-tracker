import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["applied", "interview", "assessment", "offer", "rejected"],
      default: "applied",
    },
    applicationDate: { type: Date, default: Date.now },
    salary: { type: Number, min: 0 },
    notes: { type: String, default: "" },
    interviewDate: Date,
    reminderDate: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Job", jobSchema);

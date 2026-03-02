import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: [true, "Long URL is required."],
      maxlength: [2000, "Long URL cannot be more than 2000 characters."],
    },
    shortCode: {
      type: String,
      required: [true, "Short code is required."],
      unique: true,
      trim: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;

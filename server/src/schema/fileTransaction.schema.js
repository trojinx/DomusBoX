import mongoose, { Schema } from "mongoose";
const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileOwnerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileOwnerUsername: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const File = new mongoose.model("File", fileSchema);
export default File;

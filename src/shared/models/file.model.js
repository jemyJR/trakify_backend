const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);
module.exports = File;

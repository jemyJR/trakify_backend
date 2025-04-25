const multer = require("multer");
const {
  UnsupportedMediaTypeException,
} = require("../exceptions/http.exceptions");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImages = process.env.ALLOWED_IMAGE_MIME_TYPES.split(",");
  const allowedDocuments = process.env.ALLOWED_DOCUMENT_MIME_TYPES.split(",");
  let allowedTypes = [];
  switch (file.fieldname) {
    case "image":
      allowedTypes = allowedImages;
      break;
    case "document":
      allowedTypes = allowedDocuments;
      break;
    default:
      allowedTypes = [];
  }

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new UnsupportedMediaTypeException("Unsupported file type"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: (parseInt(process.env.MAX_FILE_SIZE, 10) || 5) * 1024 * 1024,
  },
  fileFilter,
});

module.exports = { upload };

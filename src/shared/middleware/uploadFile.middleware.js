const sharp = require("sharp");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const { upload } = require("../utils/upload");
const logger = require("../utils/logger");
const File = require("../models/file.model");

const preprocessBuffer = async (buffer, mimetype, originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  if (mimetype.startsWith("image/") && ext !== ".pdf") {
    try {
      return await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .toFormat("webp", { quality: 80 })
        .toBuffer();
    } catch (error) {
      logger.warn(`Error processing image buffer: ${error.message}`);
      throw error;
    }
  }
  return buffer;
};

const sanitizeFilename = (originalname) => {
  const ext = path.extname(originalname);
  const baseName = path.basename(originalname, ext);
  return `${baseName
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")}-${Date.now()}${ext}`;
};

const uploadToCloudinary = async (
  buffer,
  { folder, mimetype, originalname }
) => {
  const isPdf = mimetype === "application/pdf";
  const sanitizedFilename = sanitizeFilename(originalname);

  const uploadOpts = {
    folder,
    resource_type: isPdf ? "raw" : "image",
    public_id: sanitizedFilename,
    ...(isPdf
      ? { filename: sanitizedFilename, overwrite: false }
      : { transformation: [{ fetch_format: "auto" }, { quality: "auto" }] }),
  };

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      uploadOpts,
      (error, result) => {
        if (error) return reject(error);
        const publicUrl = isPdf
          ? cloudinary
              .url(result.public_id, {
                resource_type: "raw",
                version: result.version,
                secure: true,
              })
              .split("?")[0]
          : result.secure_url;
        resolve({ secure_url: publicUrl, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

const uploadFileMiddleware = (fieldName, folder) => [
  upload.fields([{ name: fieldName, maxCount: 1 }]),
  async (req, res, next) => {
    const incoming = req.files?.[fieldName] || [];
    try {
      const uploadedFiles = await Promise.all(
        incoming.map(async (file) => {
          const buf = await preprocessBuffer(
            file.buffer,
            file.mimetype,
            file.originalname
          );
          const { secure_url, public_id } = await uploadToCloudinary(buf, {
            folder,
            mimetype: file.mimetype,
            originalname: file.originalname,
          });
          const savedFile = await File.create({
            url: secure_url,
            publicId: public_id,
            folder,
            fileType: fieldName,
          });
          return savedFile;
        })
      );
      req.uploadedFiles = { [fieldName]: uploadedFiles };
      next();
    } catch (error) {
      logger.error(`Error in upload middleware: ${error.message}`);
      next(error);
    }
  },
];

module.exports = uploadFileMiddleware;

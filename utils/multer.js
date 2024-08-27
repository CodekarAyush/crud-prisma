import multer from "multer";
import path from "path";
import sanitizeFilename from "sanitize-filename"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = formatFilename(file.originalname);
    cb(null, sanitizedFilename);
  }
});

  const formatFilename = (filename) => {
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    const sanitizedBaseName = sanitizeFilename(baseName).replace(/\s+/g, '_');
    const formattedFilename = `${sanitizedBaseName}-${Date.now()}${ext}`;
    return formattedFilename;
  };
 export  const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|svg|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, SVG, and WebP are allowed.'));
    }
  }
});

import multer from 'multer';

// Multer middleware for handling uploads
export const upload = multer({
  dest: 'uploads/', // Temporary folder for storing uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

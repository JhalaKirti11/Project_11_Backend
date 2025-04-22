// const multer = require('multer');
import multer from "multer";
import path from "path";
// const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
  //   limits: { fileSize: 5 * 1024 * 1024 },
});
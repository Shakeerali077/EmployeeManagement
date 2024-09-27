import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Save in 'uploads/' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);  // Save with a unique name using timestamp
    },
});

const upload = multer({ storage });

export default upload;

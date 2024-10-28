const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up the uploads directory
const uploadsDir = 'uploads/';

// Check if the uploads directory exists, if not, create it
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create directory if it doesn't exist
}

// Set up storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        // Save file with a unique name using the current timestamp
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Create the multer upload instance with file type and size limits
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/; // Allow only specific file types
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: File type not allowed!');
        }
    },
});

// Export the upload middleware
module.exports = upload;

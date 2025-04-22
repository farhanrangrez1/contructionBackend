const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
    format: async (req, file) => 'png',
    public_id: (req, file) => `user-${Date.now()}`,
  },
});

module.exports = { cloudinary, storage };
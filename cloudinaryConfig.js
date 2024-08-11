// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// // Example upload logging
// cloudinary.uploader.upload("../Downloads/Telegram Desktop/IMG_2124.JPG", function(error, result) {
//   if (error) {
//     console.error("Cloudinary upload error:", error);
//   } else {
//     console.log("Cloudinary upload result:", JSON.stringify(result, null, 2));
//   }
// });

export default cloudinary;

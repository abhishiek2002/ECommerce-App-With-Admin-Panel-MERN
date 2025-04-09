import { v2 as cloudinary } from "cloudinary";
import path from 'path'

cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.CLOUD_API_KEY,
  // api_secret: process.env.CLOUD_API_SECRET,
  cloud_name:"dxymka8gr",
  api_key:113497677329653,
  api_secret:"xAvb11cG9HfNb1fPexdxSBMxqf8"
});


 async function imageUpload (file) {
  try {
    return await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
  } catch (error) {
    return {
      message: "imageUpload Error",
      Error: error
    }
  }
}

  async function deleteUploadedImage(url) {
    const basename = path.basename(url);
    const publicId = basename.split('.')[0];
    try {
      return await cloudinary.uploader.destroy(publicId)
    } catch (error) {
      return{
        message: "delete Uploaded image url error",
        Error: error
      }
    }
  }

export {imageUpload , deleteUploadedImage};

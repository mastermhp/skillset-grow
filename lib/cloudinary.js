// Cloudinary configuration and upload utilities
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = async (file, folder = "skillset-grow", options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto", // Automatically detect file type (image/video)
      chunk_size: 10000000, // 10MB chunks for better large file handling
      timeout: 300000, // 5 minute timeout for large videos
      ...options,
    })
    return {
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      format: result.format,
      duration: result.duration, // Video duration in seconds
      bytes: result.bytes,
    }
  } catch (error) {
    console.error("[v0] Cloudinary upload error:", error)
    throw error
  }
}

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId)
    return true
  } catch (error) {
    console.error("[v0] Cloudinary delete error:", error)
    throw new Error("Failed to delete file")
  }
}

export default cloudinary

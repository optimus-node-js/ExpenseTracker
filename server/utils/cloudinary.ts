import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Uploads a file buffer to Cloudinary
 * @param buffer - The file buffer to upload
 * @param folder - Optional folder path in Cloudinary
 * @returns Promise with Cloudinary upload result
 */
export async function uploadToCloudinary(
  buffer: Buffer, 
  folder: string = 'bank-statements'
): Promise<any> {
  return new Promise((resolve, reject) => {
    // Use Cloudinary's upload stream for efficient uploading
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto', // auto-detect resource type
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to stream and pipe to upload stream
    const bufferStream = require('stream').Readable.from(buffer);
    bufferStream.pipe(uploadStream);
  });
}

/**
 * Deletes a file from Cloudinary by its public ID
 * @param publicId - The public ID of the file to delete
 * @returns Promise with Cloudinary deletion result
 */
export async function deleteFromCloudinary(publicId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error('Error deleting from Cloudinary:', error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Generates a signed URL for a file in Cloudinary
 * @param publicId - The public ID of the file
 * @param expiresAt - Expiration time in seconds (default: 1 hour)
 * @returns Signed URL string
 */
export function getSignedUrl(publicId: string, expiresAt: number = 3600): string {
  return cloudinary.url(publicId, {
    secure: true,
    sign_url: true,
    expires_at: Math.floor(Date.now() / 1000) + expiresAt
  });
}

/**
 * Check if Cloudinary credentials are configured
 * @returns boolean indicating if Cloudinary is properly configured
 */
export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'default',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
});

/**
 * Upload a file to Cloudinary
 * @param file - The file buffer to upload
 * @param folder - The folder to upload to (optional)
 * @returns Promise with cloudinary upload result
 */
export async function uploadToCloudinary(
  file: Buffer,
  folder: string = 'statements'
): Promise<cloudinary.UploadApiResponse> {
  return new Promise((resolve, reject) => {
    // Create a writable stream for uploading to Cloudinary
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        timestamp: Math.floor(Date.now() / 1000),
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result as cloudinary.UploadApiResponse);
      }
    );

    // Write the file buffer to the upload stream
    uploadStream.end(file);
  });
}

/**
 * Delete a file from Cloudinary
 * @param publicId - The public ID of the file to delete
 * @returns Promise with cloudinary deletion result
 */
export async function deleteFromCloudinary(
  publicId: string
): Promise<cloudinary.DeleteApiResponse> {
  return cloudinary.v2.uploader.destroy(publicId);
}
// export async function uploadImageToCloudinary(file) {
//   const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//   const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", uploadPreset);

//   const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     throw new Error("Image upload failed");
//   }

//   const data = await res.json();
//   return data.secure_url;
// }

const MAX_DIMENSION = 1600; // px, longest side
const JPEG_QUALITY = 0.75;

// Downscales + re-encodes an image client-side before upload.
// Keeps PNGs with transparency as PNG; everything else becomes JPEG.
// Falls back to the original file if compression fails for any reason
// (e.g. unsupported file type) so uploads never get silently blocked.
async function compressImage(file) {
  if (!file.type.startsWith("image/")) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, width, height);

    const keepPng = file.type === "image/png";
    const mimeType = keepPng ? "image/png" : "image/jpeg";

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, mimeType, keepPng ? undefined : JPEG_QUALITY)
    );

    if (!blob || blob.size >= file.size) return file; // compression didn't help, use original

    const newName = file.name.replace(/\.\w+$/, keepPng ? ".png" : ".jpg");
    return new File([blob], newName, { type: mimeType });
  } catch (err) {
    console.warn("Client-side image compression skipped:", err);
    return file;
  }
}

export async function uploadImageToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const compressed = await compressImage(file);

  const formData = new FormData();
  formData.append("file", compressed);
  formData.append("upload_preset", uploadPreset);

  let res;
  try {
    res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });
  } catch (networkErr) {
    throw new Error("Image upload failed: network error (check your connection and try again).");
  }

  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const errBody = await res.json();
      detail = errBody?.error?.message || detail;
    } catch {
      // response wasn't JSON, keep the HTTP status as the detail
    }
    throw new Error(`Image upload failed: ${detail}`);
  }

  const data = await res.json();
  return data.secure_url;
}
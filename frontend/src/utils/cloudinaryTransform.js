/**
 * Inserts a Cloudinary transformation into an existing Cloudinary URL.
 * Safe no-op if the URL isn't a Cloudinary URL (e.g. old Unsplash seed images).
 */
export function cld(url, { width, quality = "auto", format = "auto" } = {}) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const transforms = [];
  if (width) transforms.push(`w_${width}`);
  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`);

  return url.replace("/upload/", `/upload/${transforms.join(",")}/`);
}
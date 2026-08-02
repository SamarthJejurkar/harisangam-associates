import api from "./axios";

export async function getGalleryImages() {
  const res = await api.get("/api/gallery");
  return res.data;
}

export async function createGalleryImage(data) {
  const res = await api.post("/api/gallery", data);
  return res.data;
}

export async function updateGalleryImage(id, data) {
  const res = await api.put(`/api/gallery/${id}`, data);
  return res.data;
}

export async function deleteGalleryImage(id) {
  const res = await api.delete(`/api/gallery/${id}`);
  return res.data;
}

export async function reorderGalleryImages(orderedIds) {
  const res = await api.put("/api/gallery/reorder/bulk", { order: orderedIds });
  return res.data;
}
import api from "./axios";

export async function getProjects(category) {
  const params = category && category !== "All" ? { category } : {};
  const res = await api.get("/api/projects", { params });
  return res.data;
}

export async function getProject(id) {
  const res = await api.get(`/api/projects/${id}`);
  return res.data;
}

export async function createProject(data) {
  const res = await api.post("/api/projects", data);
  return res.data;
}

export async function updateProject(id, data) {
  const res = await api.put(`/api/projects/${id}`, data);
  return res.data;
}

export async function deleteProject(id) {
  const res = await api.delete(`/api/projects/${id}`);
  return res.data;
}

export async function reorderProjects(orderedIds) {
  const res = await api.put("/api/projects/reorder/bulk", { order: orderedIds });
  return res.data;
}

export async function getFeaturedProjects() {
  const res = await api.get("/api/projects/featured/list");
  return res.data;
}

export async function setFeaturedProjects(orderedIds) {
  const res = await api.put("/api/projects/featured/bulk", { ids: orderedIds });
  return res.data;
}
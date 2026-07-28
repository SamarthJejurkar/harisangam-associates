import api from "./axios";

export async function getSection(sectionName) {
  const res = await api.get(`/api/sections/${sectionName}`);
  return res.data;
}

export async function updateSection(sectionName, content) {
  const res = await api.put(`/api/sections/${sectionName}`, content);
  return res.data;
}
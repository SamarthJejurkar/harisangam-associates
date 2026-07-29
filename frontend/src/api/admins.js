import api from "./axios";

export async function listAdmins() {
  const res = await api.get("/api/auth/admins");
  return res.data;
}

export async function createAdmin(username, email, password) {
  const res = await api.post("/api/auth/admins", { username, email, password });
  return res.data;
}

export async function deleteAdmin(id) {
  const res = await api.delete(`/api/auth/admins/${id}`);
  return res.data;
}
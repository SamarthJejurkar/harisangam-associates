import api from "./axios";

export async function submitEnquiry(data) {
  const res = await api.post("/api/enquiries", data);
  return res.data;
}

export async function listEnquiries() {
  const res = await api.get("/api/enquiries");
  return res.data;
}

export async function markEnquiryRead(id, read) {
  const res = await api.put(`/api/enquiries/${id}/read`, null, { params: { read } });
  return res.data;
}

export async function deleteEnquiry(id) {
  const res = await api.delete(`/api/enquiries/${id}`);
  return res.data;
}
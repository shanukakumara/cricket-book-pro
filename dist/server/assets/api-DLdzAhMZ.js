const BASE_URL = "http://localhost:5000/api";
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}
async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}
const authApi = {
  login: (email, password) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  }),
  register: (data) => request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  me: () => request("/auth/me")
};
const groundsApi = {
  getAll: () => request("/grounds"),
  getById: (id) => request(`/grounds/${id}`),
  create: (data) => request("/grounds", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/grounds/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => request(`/grounds/${id}`, { method: "DELETE" })
};
const usersApi = {
  getAll: () => request("/users"),
  update: (id, data) => request(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) })
};
const bookingsApi = {
  getAll: () => request("/bookings"),
  getById: (id) => request(`/bookings/${id}`),
  create: (data) => request("/bookings", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/bookings/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  cancel: (id) => request(`/bookings/${id}/cancel`, { method: "PUT" }),
  getAvailability: (groundId, date) => request(`/bookings/availability?groundId=${groundId}&date=${date}`)
};
const slotsApi = {
  getAvailability: (groundId, date) => request(`/slots/availability?groundId=${groundId}&date=${date}`),
  getByGround: (groundId, date) => request(`/slots/${groundId}${date ? `?date=${date}` : ""}`),
  block: (data) => request("/slots", { method: "POST", body: JSON.stringify(data) }),
  unblock: (id) => request(`/slots/${id}`, { method: "DELETE" })
};
export {
  authApi as a,
  bookingsApi as b,
  groundsApi as g,
  slotsApi as s,
  usersApi as u
};

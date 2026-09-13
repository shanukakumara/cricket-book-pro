const BASE_URL = "http://localhost:5000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }

  return res.json();
}

export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    request<{ token: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  me: () => request<any>("/auth/me"),
};

export const groundsApi = {
  getAll: () => request<any[]>("/grounds"),
  getById: (id: string) => request<any>(`/grounds/${id}`),
  create: (data: any) =>
    request<any>("/grounds", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    request<any>(`/grounds/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<any>(`/grounds/${id}`, { method: "DELETE" }),
};

export const usersApi = {
  getAll: () => request<any[]>("/users"),
  update: (id: string, data: any) =>
    request<any>(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};

export const bookingsApi = {
  getAll: () => request<any[]>("/bookings"),
  getById: (id: string) => request<any>(`/bookings/${id}`),
  create: (data: any) =>
    request<any>("/bookings", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    request<any>(`/bookings/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  cancel: (id: string) =>
    request<any>(`/bookings/${id}/cancel`, { method: "PUT" }),
  getAvailability: (groundId: string, date: string) =>
    request<string[]>(`/bookings/availability?groundId=${groundId}&date=${date}`),
};

export const slotsApi = {
  getAvailability: (groundId: string, date: string) =>
    request<{ booked: string[]; blocked: string[] }>(`/slots/availability?groundId=${groundId}&date=${date}`),
  getByGround: (groundId: string, date?: string) =>
    request<any[]>(`/slots/${groundId}${date ? `?date=${date}` : ""}`),
  block: (data: { groundId: string; date: string; slot: string }) =>
    request<any>("/slots", { method: "POST", body: JSON.stringify(data) }),
  unblock: (id: string) =>
    request<any>(`/slots/${id}`, { method: "DELETE" }),
};

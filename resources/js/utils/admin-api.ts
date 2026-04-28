import { useAdminAuthStore } from "@/stores/admin-auth-store";

const BASE = "/api/admin";

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = useAdminAuthStore.getState().token;
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 401 || res.status === 403) {
    useAdminAuthStore.getState().clearAuth();
    window.location.href = "/admin/login";
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Onbekende fout" }));
    throw new Error(error.message ?? "API fout");
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const adminApi = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

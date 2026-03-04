const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchApi(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  console.log("Tentando fazer requisição para a URL:", url);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    data = { message: text };
  }

  if (!response.ok) {
    if (response.status === 401) {
      if (!path.includes("/login")) {
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Sessão expirada. Redirecionando para login...");
      }
    }

    const errorMessage =
      typeof data === "object" && data.message
        ? data.message
        : `Erro na requisição: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return data;
}

{
  /* API Endpoints */
}

export const registerUser = (data: any) =>
  fetchApi("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getUser = (id: string) =>
  fetchApi(`/users/${id}`, {
    method: "GET",
    body: JSON.stringify(id),
  });

export const verifyCode = (data: any) =>
  fetchApi("/users/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const loginUser = (data: any) =>
  fetchApi("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

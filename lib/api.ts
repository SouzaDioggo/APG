import { da } from "date-fns/locale";

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
// =========================================================================
// USUÁRIOS
// =========================================================================
export const registerUser = (data: any) =>
  fetchApi("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const loginUser = (data: any) =>
  fetchApi("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const verifyCode = (data: any) =>
  fetchApi("/users/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resendCode = (data: { email: string }) =>
  fetchApi("/users/resendCode", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resetPassword = (data: {
  email: string;
  code: string;
  password: string;
}) =>
  fetchApi("/users/resetPassword", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getUser = (id: string) =>
  fetchApi(`/users/${id}`, {
    method: "GET",
    body: JSON.stringify(id),
  });

export const getAllUsers = () =>
  fetchApi("/users", {
    method: "GET",
  });

export const changeUserType = (
  id: number,
  type: "leitor" | "autor" | "admin",
) =>
  fetchApi(`/users/${id}/changeType`, {
    method: "PATCH",
    body: JSON.stringify({ type }),
  });

export const deleteUser = (id: number) =>
  fetchApi(`/users/${id}`, {
    method: "DELETE",
  });

// ==========================================
// POSTS
// ==========================================
export const getAllPosts = () =>
  fetchApi("/posts", {
    method: "GET",
  });

export const createPost = (data: any) =>
  fetchApi("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getPostById = (id: string | number) =>
  fetchApi(`/posts/${id}`, {
    method: "GET",
  });

// ==========================================
//  CATEGORIAS
// ==========================================
export const getAllCategories = () =>
  fetchApi("/categories", {
    method: "GET",
  });

export const createCategory = (data: { name: string }) =>
  fetchApi("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteCategory = (id: number) =>
  fetchApi(`/categories/${id}`, {
    method: "DELETE",
  });

export const ChangeCategory = (id: number, data: { name: string }) =>
  fetchApi(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// ==========================================
//  COMENTÁRIOS
// ==========================================
export const createComment = (data: {
  text: string;
  postId: number;
  userId: number;
  date?: string;
}) =>
  fetchApi("/comments", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getAllComments = () =>
  fetchApi("/comments", {
    method: "GET",
  });

export const getCommentsByPost = (postId: number) =>
  fetchApi(`/comments/post/${postId}`, {
    method: "GET",
  });

export const getCommentById = (id: number) =>
  fetchApi(`/comments/${id}`, {
    method: "GET",
  });

export const updateComment = (
  id: number,
  userId: number,
  data: { text: string },
) =>
  fetchApi(`/comments/${id}/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteComment = (id: number) =>
  fetchApi(`/comments/${id}`, {
    method: "DELETE",
  });

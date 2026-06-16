// lib/api/api.ts

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // також додаємо цей параметр
});
api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export interface ApiError {
  message?: string;
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
}

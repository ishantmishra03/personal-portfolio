"use client";

import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

const api: AxiosInstance = axios.create({
    baseURL,
});

export default api;

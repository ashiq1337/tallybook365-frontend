import axios from "axios";
import { configuration } from "../configurations/configurations";

export const instance = axios.create({
  baseURL: configuration.baseUrl,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  //getting token from local storage

  if (token) {  //sending token with every request if available
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


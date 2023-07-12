import axios from "axios";
import { configuration } from "../configurations/configurations";

export const instance = axios.create({
  baseURL: configuration.baseUrl,
  headers: { "Content-Type": "application/json" },
});

//interceptor for adding token in your request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); //getting token from local storage

  if (token) {
    //sending token with every request if available
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//interceptor for removing token
instance.interceptors.response.use(
  (config) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return config;
  },
  function (error) {
    // if error code is 401 means authentication is not valid
    if (error.response.status === 401) {
      localStorage.clear(); //clearing the local storage (token and other info)
      window.location.reload(false); //refreshing the page to go to login page
    } else {
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);

import axios from "axios";
import { configuration } from "../configurations/configurations";

//getting token from local storage
const access_token = localStorage.getItem("token");

//sending token with every request if available
if (access_token) {
  //console.log(access_token)
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
}

export const instance = axios.create({
  baseURL: configuration.baseUrl,
  headers: { "Content-Type": "application/json" },
});

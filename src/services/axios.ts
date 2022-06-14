import axios from "axios";

export const baseUrl = "http://192.168.1.2:3333";

export const api = axios.create({
  baseURL: baseUrl,
});

export const fileApi = "http://192.168.1.13:3333";

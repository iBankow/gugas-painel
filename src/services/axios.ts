import axios from "axios";

export const baseUrl = process.env.REACT_APP_API;

export const api = axios.create({
  baseURL: baseUrl,
});

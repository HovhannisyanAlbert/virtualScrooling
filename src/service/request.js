import axios from "axios";
import { baseURLFlickr, baseURLSwapi } from "../configHTTP";

export const requestSwapi = axios.create({
  baseURL: baseURLSwapi,
});

export const requestFlick = axios.create({
  baseURL: baseURLFlickr,
});

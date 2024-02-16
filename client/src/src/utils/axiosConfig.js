import Axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? "http://localhost:8000";

const axios = Axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default axios;

import axios from "axios";

const axiosInterface = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default axiosInterface;

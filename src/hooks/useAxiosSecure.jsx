import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://sports-club-manegement-server.vercel.app",
  });

  // Request interceptor: attach JWT
  axiosSecure.interceptors.request.use(
  (config) => {
    if (user?.accessToken) {
      
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


  // Response interceptor: handle 401/403
  axiosSecure.interceptors.response.use(
    (res) => res,
    async (error) => {
      const status = error.response?.status;

      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        try {
          await logOut();
          navigate("/login");
        } catch {}
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

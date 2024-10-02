import { AUTH_API_URL } from "../globals";
import axios from "axios";

const customerAxios = axios.create({
  baseURL: `${AUTH_API_URL}`,
});

// Request interceptor for adding the bearer token
customerAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Accept = "*/*";
      config.headers.Accept = "*/*";
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
export const GenerateCustomerToken = (phone: string) => {
  return customerAxios.post(
    `/GenerateCustomerToken/ValidationCustomer/${phone}`
  );
};
export const LoginCustomer = (phone: string, code: number) => {
  return customerAxios.post(
    `/GenerateCustomerToken/LoginCustomer?_mobile=${phone}&_regNumber=${code}`
  );
};
export const GenerateWorkMasterToken = (phone: string) => {
  return customerAxios.post(`/GenerateWorkMasterToken?mobile=${phone}`);
};

// Export the api instance
export default customerAxios;

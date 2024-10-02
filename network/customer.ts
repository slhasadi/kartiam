import { API_SITE_MANAGER, BASE_API_URL } from "../globals";
import axios from "axios";

const customerAxios = axios.create({
  baseURL: `${BASE_API_URL}`,
});
const customerAxiosFromFile = axios.create({
  baseURL: `${BASE_API_URL}`,
});
const regionAxios = axios.create({
  baseURL: `${API_SITE_MANAGER}`,
});

// Request interceptor for adding the bearer token
customerAxiosFromFile.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.mode = "no-cors";
    config.headers["Content-Type"] = "multipart/form-data";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
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
regionAxios.interceptors.request.use(
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
export const getInfoCustomer = () => {
  return customerAxios.get("/GetInfoCustomer");
};
export const GetCity = (region: any) => {
  return customerAxios.get(`/GetCity?RegionId=${region}`);
};
export const GetRegion = () => {
  return regionAxios.get("/GetRegion");
};
export const GetRequestCustomerForDashboard = (id: number) => {
  return customerAxios.get(`/GetListRequestCustomer?typeStatusId=${id}`);
};
export const GetExpertForDashboard = (id: number) => {
  return customerAxios.get(`/GetExpertForDashboard?requestNumber=${id}`);
};
export const GetStatusTypeCustomer = () => {
  return customerAxios.get(`/GetStatusTypeCustomer`);
};
export const GetQuestionServices = (id: number) => {
  return customerAxios.get(`/GetQuestionServices/${id}`);
};
export const ValidRequestCustomer = (phoneNumber: string) => {
  return customerAxios.post(
    `/ValidRequestCustomer/${phoneNumber}?FlgRequestCustomer=true`
  );
};
export const AnswerCustomer = (data: any) => {
  return customerAxios.post(`/AnswerCustomer`, data);
};
export const RegisterScoreCustomer = (data: any) => {
  return customerAxios.post(`/RegisterScoreCustomer`, data);
};
export const ConfirmRequest = (requestId: any, expertId: any) => {
  return customerAxios.post(
    `/ConfirmRequest?requestId=${requestId}&expertId=${expertId}`
  );
};
export const EditProfileCustomer = (data: any) => {
  return customerAxiosFromFile.post(`/EditProfileCustomer`, data);
};
export const AddAddressCustomer = (data: any) => {
  return customerAxios.post(`/AddAddressCustomer`, data);
};
export const GetListService = () => {
  return customerAxios.get(`/GetListService`);
};
export const GetAddressCustomer = () => {
  return customerAxios.get(`/GetAddressCustomer`);
};
export const GetScoreCustomer = () => {
  return customerAxios.get(`/GetScoreCustomer`);
};
export const GetListCategoryService = () => {
  return customerAxios.get(`/GetListCategoryService`);
};
export const GetListCategoryServiceById = (id: any) => {
  return customerAxios.get(`/GetListCategoryService?categoryRef=${id}`);
};

export default customerAxios;

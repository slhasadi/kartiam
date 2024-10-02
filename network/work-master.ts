import { AUTH_CHECK_BASE_URL, WORK_MASTER_API_URL } from "../globals";
import axios from "axios";

const customerAxios = axios.create({
  baseURL: `${WORK_MASTER_API_URL}`,
});
const customerAxiosFromFile = axios.create({
  baseURL: `${WORK_MASTER_API_URL}`,
});
const authCheck = axios.create({
  baseURL: `${AUTH_CHECK_BASE_URL}`,
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
      config.headers["Accept-Language"] = "en-US,en;q=0.9,fa;q=0.8";
      config.headers["Accept-Encoding"] = "gzip, deflate, br, zstd";
      config.headers["Content-Type"] = "application/json, charset=utf-8";
      config.headers["Charset"] = "utf-8";
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
authCheck.interceptors.request.use(
  (config) => {
    const apiToken = "662b723b7a3a4f1c88f040457db46d46";
    config.headers.Accept = "*/*";
    config.headers.Accept = "*/*";
    config.headers.Authorization = `Bearer ${apiToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints

export const ShahkarInquiry = (data: any) => {
  return authCheck.post("shahkarInquiry", data);
};
export const EditProfileExpert = (data: any) => {
  return customerAxiosFromFile.post(`/EditProfileExpert`, data);
};
export const GetStatusTypeWorkMaster = () => {
  return customerAxios.get("/GetStatusTypeWorkExpert");
};
export const GetInfoWorkMaster = () => {
  return customerAxios.get("/GetInfoExpert");
};
export const GetExpertServices = () => {
  return customerAxios.get("/GetExpertServices");
};
export const GetListRequestForExpert = (id: number) => {
  return customerAxios.get(`/GetListRequestExpert?statusTypeId=${id}`);
};
export const RequestExpert = (data: any) => {
  return customerAxios.post(`/RequestExpert`, data);
};
export const RegisterScoreExpert = (data: any) => {
  return customerAxios.post(`/RegisterScoreExpert`, data);
};
export const RegisterExpertHistory = (data: any) => {
  return customerAxios.post(`/RegisterExpertHistory`, data);
};

export const RegisterAddressExpert = (data: any) => {
  return customerAxios.post(`/RegisterAddressExpert`, data);
};
export const ComputingCostWage = (costWage: any) => {
  return customerAxios.post(`/ComputingCostWage?FinalCostWage=${costWage}`);
};
export const GetScoreExpert = () => {
  return customerAxios.get("/GetScoreExpert");
};
export const GetHistoryExpert = () => {
  return customerAxios.get("/GetHistoryExpert");
};
export const GetAddressExpert = () => {
  return customerAxios.get("/GetAddressExpert");
};
export const GetServiceCategory = () => {
  return customerAxios.get(`/GetServiceCategory`);
};
export const GetServices = (id: any) => {
  return customerAxios.get(`/GetServices/${id}`);
};
export const GetTypeLicense = () => {
  return customerAxios.get(`/GetTypeLicense`);
};
export const GetExpertLicense = () => {
  return customerAxios.get(`/GetExpertLicense`);
};
export const AddExpertLicense = (data: any) => {
  return customerAxios.post(`AddExpertLicense`);
};
export const AcceptRuleExpert = () => {
  return customerAxios.post(`AcceptRuleExpert?FlgAcceptRule=true`);
};
// Export the api instance
export default customerAxios;

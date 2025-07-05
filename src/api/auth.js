import axiosInstance from "./axiosInstance";


export const login = async (email, password) => {
  const response = await axiosInstance.post("/token", {
    email,
    password,
  });
  
  localStorage.setItem("token", response.data.access_token);
  return response.data;
};


export const register = async (email, password) => {
  const response = await axiosInstance.post("/users/", {
    email,
    password,
  });
  return response.data;
};


export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/me"); 
  return response.data;
};


export const logout = () => {
  localStorage.removeItem("token");
};
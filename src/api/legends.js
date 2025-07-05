import axiosInstance from "./axiosInstance";


export const getLegends = async (params = {}) => {
  const response = await axiosInstance.get("/legends/", { params });
  return response.data;
};


export const createLegend = async (legendData) => {
  const formData = new FormData();

  for (const key in legendData) {
    formData.append(key, legendData[key]);
  }

  const response = await axiosInstance.post("/legends/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const updateLegend = async (id, updatedData) => {
  const response = await axiosInstance.put(`/legends/${id}`, updatedData);
  return response.data;
};


export const deleteLegend = async (id) => {
  const response = await axiosInstance.delete(`/legends/${id}`);
  return response.data;
};


export const getCategories = async () => {
  const response = await axiosInstance.get("/legends/categories");
  return response.data;
};


export const getProvinces = async () => {
  const response = await axiosInstance.get("/legends/provinces");
  return response.data;
};


export const getCantons = async ( provinceId) => {
  const response = await axiosInstance.get("/legends/cantons", {
    params: { province_id: provinceId },
  });
  return response.data;
};


export const getDistricts = async ( cantonId) => {
  const response = await axiosInstance.get("/legends/districts", {
    params: { canton_id: cantonId },
    
  });
  return response.data;
  
};
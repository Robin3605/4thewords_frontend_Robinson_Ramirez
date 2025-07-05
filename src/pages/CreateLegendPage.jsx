import React from "react";
import LegendForm from "../components/LegendForm";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const CreateLegendPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const res = await axiosInstance.post("/legends", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 || res.status === 201) {
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error creando leyenda:", error);
      alert("No se pudo crear la leyenda.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Crear nueva leyenda</h2>
      <LegendForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateLegendPage;
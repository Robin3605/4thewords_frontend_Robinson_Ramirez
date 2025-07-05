import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import LegendForm from "../components/LegendForm";

const EditLegendPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [legend, setLegend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLegend = async () => {
      try {
        const res = await axiosInstance.get(`/legends/${id}`);
        setLegend(res.data);
      } catch (error) {
        console.error("Error al cargar leyenda:", error);
       
      } finally {
        setLoading(false);
      }
    };

    fetchLegend();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await axiosInstance.put(`/legends/${id}`, updatedData); 
      navigate("/");
    } catch (error) {
      console.error("Error actualizando leyenda:", error);
      alert("No se pudo actualizar la leyenda.");
    }
  };

  if (loading) return <p>Cargando leyenda...</p>;
  if (!legend) return <p>Leyenda no encontrada.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Editar leyenda</h2>
      <LegendForm legend={legend} onSubmit={handleUpdate} isEdit />
    </div>
  );
};

export default EditLegendPage;
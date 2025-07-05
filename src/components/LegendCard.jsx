import React from "react";
import { format } from "date-fns";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LegendCard = ({ legend, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/legends/edit/${legend.id}`);
  };

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta leyenda?")) {
      onDelete(legend.id);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row gap-4">
      <img
        src={legend.image_url}
        alt={legend.title}
        className="w-full md:w-48 h-48 object-cover rounded"
      />

      <div className="flex-1">
        <h2 className="text-xl font-semibold">{legend.title}</h2>
        <p className="text-gray-600 text-sm">{legend.description}</p>

        <div className="text-sm mt-2">
          <span className="font-medium">Categoría:</span>{" "}
          {legend.category?.name} <br />
          <span className="font-medium">Ubicación:</span>{" "}
          {legend.province?.name}, {legend.canton?.name},{" "}
          {legend.district?.name} <br />
          <span className="font-medium">Fecha leyenda:</span>{" "}
          {format(new Date(legend.legend_date), "dd/MM/yyyy")} <br />
          <span className="font-medium">Creada:</span> {legend.relative_date}
        </div>

        
        {user && legend.owner_id === user.id && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-sm text-white px-2 py-1 rounded hover:bg-blue-700"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-sm text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegendCard;

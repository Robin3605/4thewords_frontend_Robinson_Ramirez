import React, { useState } from "react";
import { useFetchLegends } from "../hooks/useFetchLegends";
import LegendCard from "../components/LegendCard";
import FilterBar from "../components/FilterBar";
import { deleteLegend } from "../api/legends";

const HomePage = () => {
  const [filters, setFilters] = useState({});
  const { legends, loading, error } = useFetchLegends(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  const handleDelete = async (id) => {
    try {
      await deleteLegend(id);
      
      setFilters({ ...filters }); 
    } catch (error) {
        console.log("Error al eliminar leyenda:", error);
      alert("No se pudo eliminar la leyenda.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Leyendas</h1>

      <FilterBar onFilterChange={handleFilterChange} />

      {loading && <p>Cargando leyendas...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {legends.map((legend) => (
          <LegendCard key={legend.id} legend={legend} onDelete={handleDelete} />
        ))}

        {!loading && legends.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No se encontraron leyendas con los filtros seleccionados.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
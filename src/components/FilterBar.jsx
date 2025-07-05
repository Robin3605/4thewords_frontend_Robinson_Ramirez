import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: "",
    category_id: "",
    province_id: "",
    canton_id: "",
    district_id: "",
    start_date: "",
    end_date: "",
  });

  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cantons, setCantons] = useState([]);
  const [districts, setDistricts] = useState([]);

  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, provRes, ] = await Promise.all([
          axiosInstance.get("/legends/categories"),
          axiosInstance.get("/legends/provinces"),
        
        ]);
        setCategories(catRes.data);
        setProvinces(provRes.data);
       
      } catch (err) {
        console.error("Error cargando filtros iniciales", err);
      }
    };
    fetchInitialData();
  }, []);

  
  useEffect(() => {
    const fetchCantons = async () => {
      if (!filters.province_id) return setCantons([]);
      try {
        const res = await axiosInstance.get(`/cantons?province_id=${filters.province_id}`);
        setCantons(res.data);
      } catch (err) {
        console.error("Error cargando cantones", err);
      }
    };
    fetchCantons();
  }, [filters.province_id]);

 
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!filters.canton_id) return setDistricts([]);
      try {
        const res = await axiosInstance.get(`/districts?canton_id=${filters.canton_id}`);
        setDistricts(res.data);
      } catch (err) {
        console.error("Error cargando distritos", err);
      }
    };
    fetchDistricts();
  }, [filters.canton_id]);

  
  useEffect(() => {
    onFilterChange(filters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  return (
    <div className="p-4 bg-white shadow rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <input
        type="text"
        name="title"
        placeholder="Buscar por título"
        value={filters.title}
        onChange={handleChange}
        className="p-2 border rounded w-full"
      />

      <select name="category_id" value={filters.category_id} onChange={handleChange} className="p-2 border rounded">
        <option value="">Categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
          
        ))}
      </select>

      <select name="province_id" value={filters.province_id} onChange={handleChange} className="p-2 border rounded">
        <option value="">Provincia</option>
        {provinces.map((prov) => (
          <option key={prov.id} value={prov.id}>
            {prov.name}
          </option>
        ))}
      </select>

      <select name="canton_id" value={filters.canton_id} onChange={handleChange} className="p-2 border rounded">
        <option value="">Cantón</option>
        {cantons.map((canton) => (
          <option key={canton.id} value={canton.id}>
            {canton.name}
          </option>
        ))}
      </select>

      <select name="district_id" value={filters.district_id} onChange={handleChange} className="p-2 border rounded">
        <option value="">Distrito</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          type="date"
          name="start_date"
          value={filters.start_date}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <input
          type="date"
          name="end_date"
          value={filters.end_date}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
      </div>
    </div>
  );
  
};

export default FilterBar;
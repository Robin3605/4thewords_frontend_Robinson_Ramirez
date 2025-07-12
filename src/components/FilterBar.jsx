import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import BarFilter from "./common/BarFilter";

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
    <div>
        <BarFilter categories={categories} provinces={provinces} handleChange={handleChange} filters={filters} cantons={cantons} districts={districts} />
    </div>
    
  );
  
};

export default FilterBar;
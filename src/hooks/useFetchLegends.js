import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const useFetchLegends = (filters = {}) => {
  const [legends, setLegends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildQueryParams = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value);
      }
    });
    return params.toString();
  };

  useEffect(() => {
    const fetchLegends = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = buildQueryParams(filters);
        const res = await axiosInstance.get(`/legends${query ? "?" + query : ""}`);
        setLegends(res.data);
      } catch (err) {
        console.error("Error fetching legends:", err);
        setError("No se pudieron obtener las leyendas");
      } finally {
        setLoading(false);
      }
    };

    fetchLegends();
  }, [filters]); 

  return { legends, loading, error };
};
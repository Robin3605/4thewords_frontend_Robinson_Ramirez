import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import FormLegend from "./common/FormLegend";

const LegendForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    legend_date: "",
    category_id: "",
    province_id: "",
    canton_id: "",
    district_id: "",
    file: null,
    ...initialData,
  });

  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cantons, setCantons] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingCantons, setLoadingCantons] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, provRes] = await Promise.all([
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
    if (!formData.province_id) {
      setCantons([]);
      return;
    }
  
    setLoadingCantons(true);
    axiosInstance
      .get("/legends/cantons", {
        params: { province_id: formData.province_id },
      })
      .then((res) => {
        setCantons(res.data);
        setLoadingCantons(false);
      })
      .catch((err) => {
        console.error("Error cargando cantones", err);
        setLoadingCantons(false);
      });
  }, [formData.province_id]);

  
  useEffect(() => {
    if (!formData.canton_id) {
      setDistricts([]);
      return;
    }

    setLoadingDistricts(true);
    axiosInstance
      .get("/legends/districts", {
        params: { canton_id: formData.canton_id },
      })
      .then((res) => {
        setDistricts(res.data);
        setLoadingDistricts(false);
      })
      .catch((err) => {
        console.error("Error cargando distritos", err);
        setLoadingDistricts(false);
      });
  }, [formData.canton_id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => {
      let updated = { ...prev, [name]: value };

      
      if (name === "province_id") {
        updated.canton_id = "";
        updated.district_id = "";
      }

      if (name === "canton_id") {
        updated.district_id = "";
      }

      if (name === "file") {
        return { ...prev, file: files[0] };
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (isEdit) {
     
      const dataToSend = { ...formData };
      delete dataToSend.file; 
      onSubmit(dataToSend);
    } else {
      
      const payload = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== "") {
          payload.append(key, formData[key]);
        }
      }
      onSubmit(payload);
    }
  };

  return (
    <div>
        <FormLegend initialData={initialData} handleChange={handleChange} handleSubmit={handleSubmit} isEdit={isEdit} formData={formData} categories={categories} provinces={provinces} cantons={cantons} districts={districts} loadingCantons={loadingCantons} loadingDistricts={loadingDistricts} />
    </div>
    
  );
};

export default LegendForm;

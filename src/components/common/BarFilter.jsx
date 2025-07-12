import React from 'react'

const BarFilter = ({ categories, provinces, handleChange, filters, cantons, districts }) => {
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
  )
}

export default BarFilter
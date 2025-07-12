import React from "react";

const FormLegend = ({
  formData,
  handleChange,
  handleSubmit,
  isEdit,
  categories,
  provinces,
  cantons,
  districts,
  loadingCantons,
  loadingDistricts,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {isEdit ? "Editar Leyenda" : "Crear Nueva Leyenda"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                name="title"
                placeholder="Título de la leyenda"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="description"
                placeholder="Descripción detallada de la leyenda"
                rows="4"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de la leyenda
              </label>
              <input
                type="date"
                name="legend_date"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.legend_date}
                onChange={handleChange}
                required
              />
            </div>

            {!isEdit && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen
                </label>
                <input
                  type="file"
                  name="file"
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                name="category_id"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provincia
              </label>
              <select
                name="province_id"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.province_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una provincia</option>
                {provinces.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantón
              </label>
              <select
                name="canton_id"
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !formData.province_id ? "bg-gray-100" : ""
                }`}
                value={formData.canton_id}
                onChange={handleChange}
                required
                disabled={!formData.province_id || loadingCantons}
              >
                <option value="">Seleccione un cantón</option>
                {loadingCantons ? (
                  <option value="" disabled>
                    Cargando cantones...
                  </option>
                ) : (
                  cantons.map((canton) => (
                    <option key={canton.id} value={canton.id}>
                      {canton.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distrito
              </label>
              <select
                name="district_id"
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !formData.canton_id ? "bg-gray-100" : ""
                }`}
                value={formData.district_id}
                onChange={handleChange}
                required
                disabled={!formData.canton_id || loadingDistricts}
              >
                <option value="">Seleccione un distrito</option>
                {loadingDistricts ? (
                  <option value="" disabled>
                    Cargando distritos...
                  </option>
                ) : (
                  districts.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg"
          >
            {isEdit ? "Actualizar leyenda" : "Crear leyenda"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLegend;

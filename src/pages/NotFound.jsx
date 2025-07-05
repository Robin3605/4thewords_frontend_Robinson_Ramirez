import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Página no encontrada</p>
      <p className="text-gray-600 mb-6">La ruta que estás buscando no existe.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
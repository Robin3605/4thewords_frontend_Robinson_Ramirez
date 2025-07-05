// import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import  AuthContext  from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated,  logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold ">
        Leyendas 
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            
            <Link to="/create" className="hover:underline">
              Crear leyenda
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Iniciar sesión
            </Link>
            <Link to="/register" className="hover:underline">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
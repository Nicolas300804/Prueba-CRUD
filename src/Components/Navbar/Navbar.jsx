import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Navbar.module.css"; // Añade tus estilos personalizados si es necesario

const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${style.customNavbar}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">Inicio</Link>
        <h1></h1>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/get">Pokémons</Link>
            </li>
            <li>
            <Link to={`/create`} >
              <button className={style.buttoncreate}>
                Crear Pokemon
              </button>
            
          </Link>
            </li>
            {/* Añade más enlaces según tus necesidades */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';

function Navbar({ onNuevoLibro, busqueda, setBusqueda }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark navbar-custom sticky-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a className="navbar-brand" href="#home">
          <i className="bi bi-book-half"></i>
          <span>BiblioApp</span>
        </a>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#home">
                <i className="bi bi-house-door-fill me-1"></i> Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#libros">
                <i className="bi bi-collection-fill me-1"></i> Catálogo
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#stats">
                <i className="bi bi-graph-up me-1"></i> Estadísticas
              </a>
            </li>
          </ul>
          
          {/* Barra de búsqueda mejorada */}
          <div className="search-container me-3">
            <i className="bi bi-search search-icon"></i>
            <input 
              type="text" 
              className="form-control form-control-custom" 
              placeholder="Buscar libros..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ paddingLeft: '45px', minWidth: '280px' }}
            />
          </div>
          
          {/* Botón agregar libro mejorado */}
          <button 
            className="btn btn-light fw-bold px-4 py-2 rounded-pill shadow-sm"
            onClick={onNuevoLibro}
            style={{ transition: 'all 0.3s ease' }}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Nuevo Libro
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

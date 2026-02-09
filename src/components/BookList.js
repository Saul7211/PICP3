import React from 'react';
import BookCard from './BookCard';

function BookList({ 
  libros, 
  categorias, 
  filtroCategoria, 
  setFiltroCategoria,
  filtroEstado,
  setFiltroEstado,
  onVerDetalle,
  onCambiarEstado,
  onNuevoLibro
}) {
  return (
    <section id="libros" className="mb-5">
      {/* Sección de filtros mejorada */}
      <div className="filters-section mb-4 fade-in">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-3 mb-lg-0">
            <div className="d-flex align-items-center gap-3">
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  fontSize: '1.25rem'
                }}
              >
                <i className="bi bi-collection-fill"></i>
              </div>
              <div>
                <h3 className="mb-0 fw-bold">Catálogo de Libros</h3>
                <p className="text-muted small mb-0">
                  <i className="bi bi-book me-1"></i>
                  {libros.length} libro{libros.length !== 1 ? 's' : ''} encontrado{libros.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7">
            <div className="row g-3 justify-content-lg-end">
              {/* Filtro por categoría */}
              <div className="col-6 col-md-auto">
                <div className="position-relative">
                  <select 
                    className="form-select filter-select pe-5"
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    style={{ minWidth: '180px' }}
                  >
                    <option value="todas">📚 Todas las categorías</option>
                    {categorias.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Filtro por estado */}
              <div className="col-6 col-md-auto">
                <select 
                  className="form-select filter-select"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  style={{ minWidth: '160px' }}
                >
                  <option value="todos">🔄 Todos los estados</option>
                  <option value="disponible">✅ Disponibles</option>
                  <option value="prestado">📤 Prestados</option>
                </select>
              </div>

              {/* Botón de limpiar filtros */}
              {(filtroCategoria !== 'todas' || filtroEstado !== 'todos') && (
                <div className="col-auto">
                  <button 
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={() => {
                      setFiltroCategoria('todas');
                      setFiltroEstado('todos');
                    }}
                  >
                    <i className="bi bi-x-circle me-1"></i>
                    Limpiar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de libros con grid mejorado */}
      {libros.length > 0 ? (
        <div className="row g-4">
          {libros.map((libro, index) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={libro.id}>
              <BookCard 
                libro={libro}
                index={index}
                onVerDetalle={onVerDetalle}
                onCambiarEstado={onCambiarEstado}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state fade-in">
          <i className="bi bi-inbox-fill"></i>
          <h4 className="mt-3 mb-2">No se encontraron libros</h4>
          <p className="mb-4">Intenta ajustar los filtros o agrega un nuevo libro a tu colección.</p>
          <button 
            className="btn btn-primary-custom btn-lg"
            onClick={onNuevoLibro}
          >
            <i className="bi bi-plus-circle-fill me-2"></i>
            Agregar Primer Libro
          </button>
        </div>
      )}
    </section>
  );
}

export default BookList;

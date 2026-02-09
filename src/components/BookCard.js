import React from 'react';

function BookCard({ libro, index, onVerDetalle, onCambiarEstado }) {
  // Seleccionar gradiente basado en el índice
  const gradientes = [
    'cover-gradient-1',
    'cover-gradient-2', 
    'cover-gradient-3',
    'cover-gradient-4',
    'cover-gradient-5',
    'cover-gradient-6',
    'cover-gradient-7',
    'cover-gradient-8',
    'cover-gradient-9',
    'cover-gradient-10'
  ];
  const gradienteClase = gradientes[index % gradientes.length];

  // Iconos de libro variados
  const bookIcons = [
    'bi-book',
    'bi-book-half',
    'bi-journal-bookmark',
    'bi-journal-text',
    'bi-journals'
  ];
  const bookIcon = bookIcons[index % bookIcons.length];

  // Generar estrellas de rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'}`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div 
      className="card book-card fade-in" 
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Cover del libro con efecto shine */}
      <div className={`book-cover-placeholder ${gradienteClase}`}>
        <i className={`bi ${bookIcon}`}></i>
      </div>
      
      <div className="card-body d-flex flex-column">
        {/* Categoría con icono */}
        <span className="badge badge-category mb-3 align-self-start">
          <i className="bi bi-tag-fill me-1"></i>
          {libro.categoria}
        </span>
        
        {/* Título */}
        <h5 className="card-title text-truncate" title={libro.titulo}>
          {libro.titulo}
        </h5>
        
        {/* Autor con icono */}
        <p className="card-text mb-2">
          <i className="bi bi-person-fill"></i>
          <span className="ms-2">{libro.autor}</span>
        </p>
        
        {/* Año y páginas */}
        <div className="d-flex gap-3 mb-2">
          <p className="card-text mb-0">
            <i className="bi bi-calendar-event-fill"></i>
            <span className="ms-2">{libro.año}</span>
          </p>
          <p className="card-text mb-0">
            <i className="bi bi-file-text-fill"></i>
            <span className="ms-2">{libro.paginas} págs</span>
          </p>
        </div>
        
        {/* Rating */}
        <div className="rating-stars mb-3">
          {renderRating(libro.rating)}
          <span className="ms-2 text-muted small">({libro.rating}/5)</span>
        </div>
        
        {/* Estado con animación */}
        <span 
          className={`badge badge-status ${libro.estado === 'disponible' ? 'badge-disponible' : 'badge-prestado'} mb-3 align-self-start`}
        >
          <i className={`bi ${libro.estado === 'disponible' ? 'bi-check-circle-fill' : 'bi-hourglass-split'}`}></i>
          {libro.estado === 'disponible' ? 'Disponible' : 'Prestado'}
        </span>
        
        {/* Botones mejorados */}
        <div className="mt-auto d-flex gap-2">
          <button 
            className="btn btn-outline-custom flex-grow-1 ripple"
            onClick={() => onVerDetalle(libro)}
          >
            <i className="bi bi-eye-fill me-1"></i>
            Detalles
          </button>
          <button 
            className={`btn ${libro.estado === 'disponible' ? 'btn-warning' : 'btn-success'} ripple`}
            onClick={() => onCambiarEstado(libro.id)}
            title={libro.estado === 'disponible' ? 'Marcar como prestado' : 'Marcar como disponible'}
            style={{ minWidth: '50px' }}
          >
            <i className={`bi ${libro.estado === 'disponible' ? 'bi-arrow-right-circle-fill' : 'bi-arrow-return-left'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;

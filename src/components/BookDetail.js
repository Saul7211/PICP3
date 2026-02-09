import React from 'react';

function BookDetail({ show, libro, onClose, onEditar, onEliminar, onCambiarEstado }) {
  if (!show || !libro) return null;

  // Generar estrellas de rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'} fs-4`}
        ></i>
      );
    }
    return stars;
  };

  const infoCards = [
    { icon: 'bi-person-fill', label: 'Autor', value: libro.autor, color: '#6366f1' },
    { icon: 'bi-calendar-event-fill', label: 'Año', value: libro.año, color: '#10b981' },
    { icon: 'bi-bookmark-fill', label: 'Categoría', value: libro.categoria, color: '#8b5cf6' },
    { icon: 'bi-file-text-fill', label: 'Páginas', value: libro.paginas, color: '#f59e0b' }
  ];

  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-book-half me-2"></i>
              Detalles del Libro
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                {/* Título y estado */}
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                  <div>
                    <h2 className="mb-2 fw-bold text-gradient" style={{ fontSize: '1.75rem' }}>
                      {libro.titulo}
                    </h2>
                    <p className="text-muted mb-0">
                      <i className="bi bi-person me-1"></i>
                      por <strong>{libro.autor}</strong>
                    </p>
                  </div>
                  <span 
                    className={`badge badge-status fs-6 ${libro.estado === 'disponible' ? 'badge-disponible' : 'badge-prestado'}`}
                  >
                    <i className={`bi ${libro.estado === 'disponible' ? 'bi-check-circle-fill' : 'bi-hourglass-split'}`}></i>
                    {libro.estado === 'disponible' ? 'Disponible' : 'Prestado'}
                  </span>
                </div>

                {/* Rating con estilo */}
                <div className="d-flex align-items-center gap-3 mb-4 p-3 rounded-3" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
                  <div className="rating-stars">
                    {renderRating(libro.rating)}
                  </div>
                  <span className="fw-bold text-dark">
                    {libro.rating}/5 estrellas
                  </span>
                </div>

                {/* Información en tarjetas */}
                <div className="row g-3 mb-4">
                  {infoCards.map((card, idx) => (
                    <div className="col-6 col-md-3" key={idx}>
                      <div className="info-card h-100">
                        <i className={`bi ${card.icon}`} style={{ color: card.color }}></i>
                        <p>{card.label}</p>
                        <strong>{card.value}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Descripción */}
                {libro.descripcion && (
                  <div className="mb-4 p-4 rounded-3" style={{ background: '#f8fafc' }}>
                    <h5 className="fw-bold mb-3">
                      <i className="bi bi-text-paragraph me-2 text-primary"></i>
                      Descripción
                    </h5>
                    <p className="text-muted mb-0 lh-lg">{libro.descripcion}</p>
                  </div>
                )}

                {/* Acciones rápidas */}
                <div className="border-top pt-4">
                  <h6 className="text-muted mb-3 text-uppercase small fw-bold">
                    <i className="bi bi-lightning-fill text-warning me-1"></i>
                    Acciones Rápidas
                  </h6>
                  <button 
                    className={`btn btn-lg ${libro.estado === 'disponible' ? 'btn-warning' : 'btn-success'} ripple`}
                    onClick={onCambiarEstado}
                  >
                    <i className={`bi ${libro.estado === 'disponible' ? 'bi-arrow-right-circle-fill' : 'bi-arrow-return-left'} me-2`}></i>
                    {libro.estado === 'disponible' ? 'Marcar como Prestado' : 'Marcar como Disponible'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-outline-danger rounded-pill px-4"
              onClick={onEliminar}
            >
              <i className="bi bi-trash-fill me-1"></i>
              Eliminar
            </button>
            <button 
              type="button" 
              className="btn btn-primary-custom rounded-pill px-4"
              onClick={onEditar}
            >
              <i className="bi bi-pencil-square me-1"></i>
              Editar
            </button>
            <button 
              type="button" 
              className="btn btn-secondary rounded-pill px-4"
              onClick={onClose}
            >
              <i className="bi bi-x-lg me-1"></i>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;

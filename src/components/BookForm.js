import React, { useState, useEffect } from 'react';

function BookForm({ show, onClose, onSubmit, libro, modoEdicion, categorias }) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    nuevaCategoria: '',
    año: new Date().getFullYear(),
    descripcion: '',
    estado: 'disponible',
    rating: 3,
    paginas: 100
  });

  const [usarNuevaCategoria, setUsarNuevaCategoria] = useState(false);
  const [errors, setErrors] = useState({});

  // Cargar datos del libro si estamos editando
  useEffect(() => {
    if (modoEdicion && libro) {
      setFormData({
        ...libro,
        nuevaCategoria: ''
      });
    } else {
      setFormData({
        titulo: '',
        autor: '',
        categoria: '',
        nuevaCategoria: '',
        año: new Date().getFullYear(),
        descripcion: '',
        estado: 'disponible',
        rating: 3,
        paginas: 100
      });
    }
    setUsarNuevaCategoria(false);
    setErrors({});
  }, [modoEdicion, libro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'año' || name === 'rating' || name === 'paginas' 
        ? parseInt(value) || 0 
        : value
    });
    // Limpiar error del campo
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es requerido';
    if (!formData.autor.trim()) newErrors.autor = 'El autor es requerido';
    
    const categoriaFinal = usarNuevaCategoria ? formData.nuevaCategoria : formData.categoria;
    if (!categoriaFinal) newErrors.categoria = 'La categoría es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const categoriaFinal = usarNuevaCategoria 
      ? formData.nuevaCategoria 
      : formData.categoria;

    const libroFinal = {
      ...formData,
      categoria: categoriaFinal,
      id: modoEdicion ? libro.id : Date.now()
    };
    delete libroFinal.nuevaCategoria;

    onSubmit(libroFinal);
  };

  if (!show) return null;

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
              <i className={`bi ${modoEdicion ? 'bi-pencil-square' : 'bi-plus-circle-fill'} me-2`}></i>
              {modoEdicion ? 'Editar Libro' : 'Agregar Nuevo Libro'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Título */}
                <div className="col-12">
                  <label className="form-label fw-bold">
                    <i className="bi bi-book-fill me-1 text-primary"></i>
                    Título del Libro <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text"
                    className={`form-control form-control-custom ${errors.titulo ? 'is-invalid' : ''}`}
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ej: Cien años de soledad"
                  />
                  {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                </div>

                {/* Autor */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-person-fill me-1 text-primary"></i>
                    Autor <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text"
                    className={`form-control form-control-custom ${errors.autor ? 'is-invalid' : ''}`}
                    name="autor"
                    value={formData.autor}
                    onChange={handleChange}
                    placeholder="Ej: Gabriel García Márquez"
                  />
                  {errors.autor && <div className="invalid-feedback">{errors.autor}</div>}
                </div>

                {/* Año */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-calendar-event-fill me-1 text-primary"></i>
                    Año de Publicación
                  </label>
                  <input 
                    type="number"
                    className="form-control form-control-custom"
                    name="año"
                    value={formData.año}
                    onChange={handleChange}
                    min="1000"
                    max={new Date().getFullYear()}
                  />
                </div>

                {/* Categoría */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-bookmark-fill me-1 text-primary"></i>
                    Categoría <span className="text-danger">*</span>
                  </label>
                  {!usarNuevaCategoria ? (
                    <select 
                      className={`form-select form-control-custom ${errors.categoria ? 'is-invalid' : ''}`}
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                    >
                      <option value="">📚 Seleccionar categoría</option>
                      {categorias.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type="text"
                      className={`form-control form-control-custom ${errors.categoria ? 'is-invalid' : ''}`}
                      name="nuevaCategoria"
                      value={formData.nuevaCategoria}
                      onChange={handleChange}
                      placeholder="Escribir nueva categoría..."
                    />
                  )}
                  {errors.categoria && <div className="invalid-feedback d-block">{errors.categoria}</div>}
                  <div className="form-check mt-2">
                    <input 
                      type="checkbox"
                      className="form-check-input"
                      id="nuevaCategoria"
                      checked={usarNuevaCategoria}
                      onChange={(e) => setUsarNuevaCategoria(e.target.checked)}
                    />
                    <label className="form-check-label text-muted small" htmlFor="nuevaCategoria">
                      <i className="bi bi-plus-circle me-1"></i>
                      Crear nueva categoría
                    </label>
                  </div>
                </div>

                {/* Páginas */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-file-text-fill me-1 text-primary"></i>
                    Número de Páginas
                  </label>
                  <input 
                    type="number"
                    className="form-control form-control-custom"
                    name="paginas"
                    value={formData.paginas}
                    onChange={handleChange}
                    min="1"
                  />
                </div>

                {/* Estado */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-toggle-on me-1 text-primary"></i>
                    Estado
                  </label>
                  <div className="d-flex gap-3 mt-2">
                    <div className="form-check">
                      <input 
                        type="radio" 
                        className="form-check-input" 
                        name="estado" 
                        id="disponible"
                        value="disponible"
                        checked={formData.estado === 'disponible'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="disponible">
                        <span className="badge badge-disponible">✅ Disponible</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        type="radio" 
                        className="form-check-input" 
                        name="estado" 
                        id="prestado"
                        value="prestado"
                        checked={formData.estado === 'prestado'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="prestado">
                        <span className="badge badge-prestado">📤 Prestado</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-star-fill me-1 text-warning"></i>
                    Calificación
                  </label>
                  <div className="d-flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="btn btn-link p-0 fs-4"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        style={{ 
                          color: star <= formData.rating ? '#fbbf24' : '#cbd5e1',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        <i className="bi bi-star-fill"></i>
                      </button>
                    ))}
                    <span className="ms-2 align-self-center text-muted small">
                      ({formData.rating}/5)
                    </span>
                  </div>
                </div>

                {/* Descripción */}
                <div className="col-12">
                  <label className="form-label fw-bold">
                    <i className="bi bi-text-paragraph me-1 text-primary"></i>
                    Descripción
                  </label>
                  <textarea 
                    className="form-control form-control-custom"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Escribe una breve descripción o sinopsis del libro..."
                    style={{ resize: 'none' }}
                  ></textarea>
                  <small className="text-muted">
                    {formData.descripcion.length}/500 caracteres
                  </small>
                </div>
              </div>
            </form>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary rounded-pill px-4"
              onClick={onClose}
            >
              <i className="bi bi-x-lg me-1"></i>
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-primary-custom rounded-pill px-4"
              onClick={handleSubmit}
            >
              <i className={`bi ${modoEdicion ? 'bi-check-circle-fill' : 'bi-plus-circle-fill'} me-1`}></i>
              {modoEdicion ? 'Guardar Cambios' : 'Agregar Libro'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookForm;

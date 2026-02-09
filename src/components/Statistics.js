import React from 'react';

function Statistics({ estadisticas, onFilterClick }) {
  const stats = [
    {
      id: 'total',
      icon: 'bi-book-fill',
      number: estadisticas.total,
      label: 'Total Libros',
      color: '#6366f1',
      bgColor: 'rgba(99, 102, 241, 0.1)',
      filter: { estado: 'todos', categoria: 'todas' }
    },
    {
      id: 'disponibles',
      icon: 'bi-check-circle-fill',
      number: estadisticas.disponibles,
      label: 'Disponibles',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      filter: { estado: 'disponible', categoria: 'todas' }
    },
    {
      id: 'prestados',
      icon: 'bi-person-check-fill',
      number: estadisticas.prestados,
      label: 'Prestados',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      filter: { estado: 'prestado', categoria: 'todas' }
    },
    {
      id: 'categorias',
      icon: 'bi-bookmark-star-fill',
      number: estadisticas.categorias,
      label: 'Categorías',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      filter: { estado: 'todos', categoria: 'todas' }
    }
  ];

  const handleClick = (stat) => {
    if (onFilterClick) {
      onFilterClick(stat.filter);
    }
    // Scroll suave a la sección de libros
    const librosSection = document.getElementById('libros');
    if (librosSection) {
      librosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="stats" className="mb-5 py-4">
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div className="col-6 col-md-3" key={stat.label}>
            <div 
              className="stat-card fade-in stat-card-clickable" 
              style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
              onClick={() => handleClick(stat)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(stat)}
              title={`Ver ${stat.label.toLowerCase()}`}
            >
              <div 
                className="stat-icon"
                style={{ 
                  background: stat.bgColor, 
                  color: stat.color 
                }}
              >
                <i className={`bi ${stat.icon}`}></i>
              </div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              
              {/* Indicador de click */}
              <div className="stat-click-hint">
                <i className="bi bi-arrow-right-circle"></i>
              </div>
              
              {/* Barra de progreso decorativa */}
              <div 
                className="mt-3 mx-auto rounded-pill overflow-hidden"
                style={{ 
                  width: '60%', 
                  height: '4px', 
                  background: stat.bgColor 
                }}
              >
                <div 
                  className="h-100 rounded-pill"
                  style={{ 
                    width: `${Math.min((stat.number / (estadisticas.total || 1)) * 100, 100)}%`,
                    background: stat.color,
                    transition: 'width 1s ease'
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Statistics;

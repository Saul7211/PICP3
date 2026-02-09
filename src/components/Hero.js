import React from 'react';

function Hero() {
  return (
    <section className="hero-section">
      {/* Partículas decorativas */}
      <div className="hero-particles">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="container text-center position-relative">
        <h1 className="display-4 fade-in-up mb-4">
          <i className="bi bi-book-half me-3"></i>
          Tu Biblioteca Personal
        </h1>
        <p className="lead mb-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
          Organiza, gestiona y lleva el control de tu colección de libros de manera fácil y elegante.
          <br />
          <span className="opacity-75">Disponible incluso sin conexión a internet.</span>
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3 fade-in-up" style={{ animationDelay: '0.4s' }}>
          <span className="hero-badge">
            <i className="bi bi-cloud-check-fill"></i> PWA
          </span>
          <span className="hero-badge">
            <i className="bi bi-phone-fill"></i> Responsive
          </span>
          <span className="hero-badge">
            <i className="bi bi-wifi-off"></i> Offline Ready
          </span>
          <span className="hero-badge">
            <i className="bi bi-lightning-fill"></i> Rápido
          </span>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-5 fade-in-up" style={{ animationDelay: '0.6s' }}>
          <a href="#libros" className="text-white text-decoration-none d-inline-flex flex-column align-items-center opacity-75 hover-lift">
            <span className="small mb-2">Explorar catálogo</span>
            <i className="bi bi-chevron-double-down fs-4" style={{ animation: 'float 2s ease-in-out infinite' }}></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

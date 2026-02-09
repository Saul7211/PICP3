import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: 'bi-github', url: '#', label: 'GitHub' },
    { icon: 'bi-linkedin', url: '#', label: 'LinkedIn' },
    { icon: 'bi-twitter-x', url: '#', label: 'Twitter' }
  ];

  const technologies = [
    { icon: 'bi-filetype-jsx', name: 'React', color: '#61dafb' },
    { icon: 'bi-bootstrap-fill', name: 'Bootstrap 5', color: '#7952b3' },
    { icon: 'bi-cloud-fill', name: 'PWA', color: '#5a0fc8' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center gy-4">
          {/* Logo y descripción */}
          <div className="col-lg-5 text-center text-lg-start">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 mb-3">
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                }}
              >
                <i className="bi bi-book-half fs-4"></i>
              </div>
              <h5 className="mb-0 fw-bold">BiblioApp</h5>
            </div>
            <p className="mb-3 opacity-75" style={{ maxWidth: '350px' }}>
              Tu biblioteca personal, siempre contigo. Organiza y gestiona tu colección de libros favoritos.
            </p>
            {/* Social links */}
            <div className="d-flex gap-2 justify-content-center justify-content-lg-start">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url}
                  className="d-flex align-items-center justify-content-center rounded-circle text-white hover-lift"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  title={social.label}
                >
                  <i className={`bi ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Tecnologías */}
          <div className="col-lg-4 text-center">
            <p className="small text-uppercase opacity-50 mb-3 fw-bold letter-spacing-1">
              Construido con
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {technologies.map((tech, idx) => (
                <span 
                  key={idx}
                  className="footer-badge"
                  style={{ borderLeft: `3px solid ${tech.color}` }}
                >
                  <i className={`bi ${tech.icon}`} style={{ color: tech.color }}></i>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
          
          {/* Copyright */}
          <div className="col-lg-3 text-center text-lg-end">
            <div className="d-flex flex-column align-items-center align-items-lg-end">
              <span className="badge bg-success mb-2 px-3 py-2">
                <i className="bi bi-check-circle me-1"></i>
                v1.0.0
              </span>
              <small className="opacity-75">
                © {currentYear} BiblioApp
              </small>
              <small className="opacity-50">
                Todos los derechos reservados
              </small>
            </div>
          </div>
        </div>
        
        {/* Línea divisora decorativa */}
        <hr className="my-4 opacity-10" />
        
        {/* Mensaje final */}
        <div className="text-center">
          <small className="opacity-50">
            Hecho con <i className="bi bi-heart-fill text-danger"></i> para amantes de los libros
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

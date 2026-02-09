import React, { useEffect, useState } from 'react';

function Toast({ show, message, type }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return { 
          bg: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', 
          icon: 'bi-check-circle-fill',
          shadow: '0 10px 40px rgba(16, 185, 129, 0.4)'
        };
      case 'warning':
        return { 
          bg: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', 
          icon: 'bi-exclamation-triangle-fill',
          shadow: '0 10px 40px rgba(245, 158, 11, 0.4)'
        };
      case 'error':
        return { 
          bg: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)', 
          icon: 'bi-x-circle-fill',
          shadow: '0 10px 40px rgba(239, 68, 68, 0.4)'
        };
      case 'info':
        return { 
          bg: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)', 
          icon: 'bi-info-circle-fill',
          shadow: '0 10px 40px rgba(6, 182, 212, 0.4)'
        };
      default:
        return { 
          bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
          icon: 'bi-bell-fill',
          shadow: '0 10px 40px rgba(99, 102, 241, 0.4)'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div 
      className="position-fixed bottom-0 end-0 p-4" 
      style={{ zIndex: 9999 }}
    >
      <div 
        className="d-flex align-items-center gap-3 text-white px-4 py-3"
        role="alert"
        style={{
          background: styles.bg,
          borderRadius: '16px',
          boxShadow: styles.shadow,
          minWidth: '300px',
          animation: show ? 'toastSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
          transition: 'all 0.3s ease',
          opacity: show ? 1 : 0,
          transform: show ? 'translateX(0)' : 'translateX(100px)'
        }}
      >
        <div 
          className="d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255,255,255,0.2)',
            flexShrink: 0
          }}
        >
          <i className={`bi ${styles.icon} fs-5`}></i>
        </div>
        <span className="fw-medium" style={{ fontSize: '0.95rem' }}>{message}</span>
      </div>
    </div>
  );
}

export default Toast;

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetail from './components/BookDetail';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Datos iniciales con más libros de ejemplo
const librosIniciales = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    categoria: "Novela",
    año: 1967,
    descripcion: "Una de las obras más importantes de la literatura hispanoamericana. Narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
    estado: "disponible",
    rating: 5,
    paginas: 471
  },
  {
    id: 2,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    categoria: "Clásico",
    año: 1605,
    descripcion: "La historia del ingenioso hidalgo que lucha contra molinos de viento. Considerada la primera novela moderna de la literatura occidental.",
    estado: "disponible",
    rating: 5,
    paginas: 863
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    categoria: "Ciencia Ficción",
    año: 1949,
    descripcion: "Una novela distópica sobre el control totalitario. Winston Smith vive en un mundo donde el Gran Hermano lo vigila todo.",
    estado: "prestado",
    rating: 5,
    paginas: 328
  },
  {
    id: 4,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Fábula",
    año: 1943,
    descripcion: "Un cuento poético que nos enseña sobre el amor, la amistad y la esencia de la vida a través de los ojos de un niño venido de las estrellas.",
    estado: "disponible",
    rating: 5,
    paginas: 96
  },
  {
    id: 5,
    titulo: "Orgullo y Prejuicio",
    autor: "Jane Austen",
    categoria: "Romance",
    año: 1813,
    descripcion: "La clásica historia de amor entre Elizabeth Bennet y Mr. Darcy, ambientada en la Inglaterra rural del siglo XIX.",
    estado: "disponible",
    rating: 4,
    paginas: 432
  },
  {
    id: 6,
    titulo: "Harry Potter y la Piedra Filosofal",
    autor: "J.K. Rowling",
    categoria: "Fantasía",
    año: 1997,
    descripcion: "El inicio de la saga del joven mago Harry Potter, quien descubre que es un mago y comienza su aventura en Hogwarts.",
    estado: "prestado",
    rating: 5,
    paginas: 309
  },
  {
    id: 7,
    titulo: "Crimen y Castigo",
    autor: "Fiódor Dostoyevski",
    categoria: "Clásico",
    año: 1866,
    descripcion: "Un estudiante pobre comete un crimen terrible y debe enfrentar las consecuencias morales y psicológicas de sus actos.",
    estado: "disponible",
    rating: 4,
    paginas: 671
  },
  {
    id: 8,
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    categoria: "Fantasía",
    año: 1954,
    descripcion: "La épica aventura de Frodo Bolsón y la Comunidad del Anillo para destruir el Anillo Único en los fuegos del Monte del Destino.",
    estado: "disponible",
    rating: 5,
    paginas: 1178
  }
];

function App() {
  // Estado para los libros - Usar localStorage
  const [libros, setLibros] = useState(() => {
    const librosGuardados = localStorage.getItem('biblioteca-libros');
    return librosGuardados ? JSON.parse(librosGuardados) : librosIniciales;
  });

  // Estado para búsqueda y filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // Estado para modales
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Estado para notificaciones
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Guardar en localStorage cuando cambien los libros
  useEffect(() => {
    localStorage.setItem('biblioteca-libros', JSON.stringify(libros));
  }, [libros]);

  // Mostrar notificación
  const mostrarToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Agregar libro
  const agregarLibro = (nuevoLibro) => {
    const libro = {
      ...nuevoLibro,
      id: Date.now(),
    };
    setLibros([...libros, libro]);
    setShowFormModal(false);
    mostrarToast('📚 ¡Libro agregado exitosamente!', 'success');
  };

  // Editar libro
  const editarLibro = (libroEditado) => {
    setLibros(libros.map(libro => 
      libro.id === libroEditado.id ? libroEditado : libro
    ));
    setShowFormModal(false);
    setModoEdicion(false);
    setLibroSeleccionado(null);
    mostrarToast('✏️ ¡Libro actualizado correctamente!', 'success');
  };

  // Eliminar libro
  const eliminarLibro = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      setLibros(libros.filter(libro => libro.id !== id));
      setShowDetailModal(false);
      mostrarToast('🗑️ Libro eliminado', 'warning');
    }
  };

  // Cambiar estado del libro
  const cambiarEstado = (id) => {
    setLibros(libros.map(libro => {
      if (libro.id === id) {
        return {
          ...libro,
          estado: libro.estado === 'disponible' ? 'prestado' : 'disponible'
        };
      }
      return libro;
    }));
    mostrarToast('📖 Estado del libro actualizado', 'info');
  };

  // Abrir modal de nuevo libro
  const abrirNuevoLibro = () => {
    setModoEdicion(false);
    setLibroSeleccionado(null);
    setShowFormModal(true);
  };

  // Abrir modal de edición
  const abrirEdicion = (libro) => {
    setModoEdicion(true);
    setLibroSeleccionado(libro);
    setShowDetailModal(false);
    setShowFormModal(true);
  };

  // Abrir detalle del libro
  const abrirDetalle = (libro) => {
    setLibroSeleccionado(libro);
    setShowDetailModal(true);
  };

  // Filtrar libros
  const librosFiltrados = libros.filter(libro => {
    const coincideBusqueda = libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                            libro.autor.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria === 'todas' || libro.categoria === filtroCategoria;
    const coincideEstado = filtroEstado === 'todos' || libro.estado === filtroEstado;
    
    return coincideBusqueda && coincideCategoria && coincideEstado;
  });

  // Obtener categorías únicas
  const categorias = [...new Set(libros.map(libro => libro.categoria))];

  // Calcular estadísticas
  const estadisticas = {
    total: libros.length,
    disponibles: libros.filter(l => l.estado === 'disponible').length,
    prestados: libros.filter(l => l.estado === 'prestado').length,
    categorias: categorias.length
  };

  // Manejar click en tarjetas de estadísticas
  const handleStatFilterClick = (filter) => {
    setFiltroEstado(filter.estado);
    setFiltroCategoria(filter.categoria);
  };

  return (
    <div className="App">
      <Navbar 
        onNuevoLibro={abrirNuevoLibro}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />
      
      <Hero />
      
      <main className="container py-4">
        <Statistics 
          estadisticas={estadisticas} 
          onFilterClick={handleStatFilterClick}
        />
        
        <BookList 
          libros={librosFiltrados}
          categorias={categorias}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          filtroEstado={filtroEstado}
          setFiltroEstado={setFiltroEstado}
          onVerDetalle={abrirDetalle}
          onCambiarEstado={cambiarEstado}
          onNuevoLibro={abrirNuevoLibro}
        />
      </main>

      <Footer />

      {/* Botón flotante para agregar libro */}
      <button 
        className="btn-float"
        onClick={abrirNuevoLibro}
        title="Agregar nuevo libro"
        aria-label="Agregar nuevo libro"
      >
        <i className="bi bi-plus-lg"></i>
      </button>

      {/* Modal para agregar/editar libro */}
      {showFormModal && (
        <BookForm 
          show={showFormModal}
          onClose={() => {
            setShowFormModal(false);
            setModoEdicion(false);
            setLibroSeleccionado(null);
          }}
          onSubmit={modoEdicion ? editarLibro : agregarLibro}
          libro={libroSeleccionado}
          modoEdicion={modoEdicion}
          categorias={categorias}
        />
      )}

      {/* Modal para ver detalle del libro */}
      {showDetailModal && libroSeleccionado && (
        <BookDetail 
          show={showDetailModal}
          libro={libroSeleccionado}
          onClose={() => {
            setShowDetailModal(false);
            setLibroSeleccionado(null);
          }}
          onEditar={() => abrirEdicion(libroSeleccionado)}
          onEliminar={() => eliminarLibro(libroSeleccionado.id)}
          onCambiarEstado={() => cambiarEstado(libroSeleccionado.id)}
        />
      )}

      {/* Toast de notificación */}
      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
}

export default App;

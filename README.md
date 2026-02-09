# Biblioteca Virtual PWA 📚

Una aplicación web progresiva (PWA) para gestionar tu biblioteca personal, desarrollada con React y Bootstrap 5.

## ✨ Características

- **📱 PWA (Progressive Web App)**: Funciona offline y se puede instalar como app nativa
- **💾 LocalStorage**: Los datos se guardan localmente en el navegador
- **🎨 Bootstrap 5**: Interfaz moderna y responsive
- **⚛️ React**: Arquitectura basada en componentes
- **🔍 Búsqueda y Filtros**: Encuentra libros fácilmente
- **📊 Estadísticas**: Visualiza el estado de tu biblioteca

## 🚀 Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar en modo desarrollo**:
   ```bash
   npm start
   ```

3. **Compilar para producción**:
   ```bash
   npm run build
   ```

## 📁 Estructura del Proyecto

```
biblioteca-virtual-pwa/
├── public/
│   ├── index.html          # HTML principal
│   ├── manifest.json       # Configuración PWA
│   ├── service-worker.js   # Service Worker para offline
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Navbar.js       # Barra de navegación
│   │   ├── Hero.js         # Sección hero
│   │   ├── Statistics.js   # Estadísticas
│   │   ├── BookList.js     # Lista de libros
│   │   ├── BookCard.js     # Tarjeta de libro
│   │   ├── BookForm.js     # Formulario agregar/editar
│   │   ├── BookDetail.js   # Modal detalle del libro
│   │   ├── Footer.js       # Pie de página
│   │   └── Toast.js        # Notificaciones
│   ├── App.js              # Componente principal
│   ├── index.js            # Punto de entrada
│   ├── index.css           # Estilos personalizados
│   └── serviceWorkerRegistration.js
└── package.json
```

## 🛠️ Funcionalidades

### Gestión de Libros
- ➕ Agregar nuevos libros
- ✏️ Editar información de libros existentes
- 🗑️ Eliminar libros
- 🔄 Cambiar estado (Disponible/Prestado)

### Búsqueda y Filtros
- 🔍 Buscar por título o autor
- 📂 Filtrar por categoría
- 📋 Filtrar por estado

### Datos del Libro
- 📖 Título
- ✍️ Autor
- 📅 Año de publicación
- 📚 Categoría
- 📄 Número de páginas
- ⭐ Calificación (1-5 estrellas)
- 📝 Descripción
- 🏷️ Estado (Disponible/Prestado)

## 💡 Uso

1. **Agregar un libro**: Click en "Nuevo Libro" en la barra de navegación
2. **Ver detalles**: Click en "Ver" en cualquier tarjeta de libro
3. **Editar libro**: Desde los detalles, click en "Editar"
4. **Cambiar estado**: Click en el botón de flecha en la tarjeta
5. **Buscar**: Usa la barra de búsqueda en el navbar
6. **Filtrar**: Usa los selectores de categoría y estado

## 🔧 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Iconografía
- **LocalStorage** - Persistencia de datos
- **Service Workers** - Funcionalidad offline

## 📱 Instalación como App

En navegadores compatibles (Chrome, Edge, etc.):
1. Abre la aplicación en el navegador
2. Busca el ícono de instalación en la barra de direcciones
3. Click en "Instalar"

## 👨‍💻 Autor

Proyecto desarrollado para demostrar el uso de PWA con React.

## 📄 Licencia

MIT License - Libre para usar y modificar.

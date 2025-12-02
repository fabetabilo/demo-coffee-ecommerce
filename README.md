<img src="public/preview/preview-1.png" alt="vistaprevia" width="100%" />

# Ecommerce Coffee Demo

Una plataforma web ecommerce para vender café, accesorios, cafeteras y productos relacionados a una tienda cafetería o tostador independiente.

## Objetivo

Demostrar una base funcional y reusable de una tienda online centrada en café, con enfoque mobile-first y componentes UI reutilizables (Navbar, Banner, Footer), lista para evolucionar a un proyecto real.

## Stack Tecnológico

- React (Vite) para frontend
- JavaScript + CSS puro (sin framework CSS)
- React Router para navegación
- Opcionalmente integrable con backend Java/Spring Boot en proyectos reales (futuro)

## Requisitos Previos

- Node.js 18+ (recomendado LTS). Verifica versión:

```powershell
node -v
npm -v
```

Descarga e instala desde: https://nodejs.org/

## Instalación y Ejecución

1) Instalar dependencias del proyecto:

```powershell
npm install
```

2) Instalar React Router (si no está ya incluido):

```powershell
npm install react-router-dom
```

3) Correr el servidor de desarrollo:

```powershell
npm run dev
```

Vite te mostrará la URL local (por defecto `http://localhost:5173`).

## Estructura del Proyecto (resumen)

- `src/assets/`: Archivos personalizados necesarios para la plataforma (Iconos, videos, imagenes, etc).
- `src/components/`: Componentes de la app (Navbar, Footer, Banner, etc).
- `src/css/`: Hojas de diseño de la plataforma.
- `src/pages/`: Páginas de la plataforma (Home, Tienda, etc.).
- `public/preview/preview-1.png`: Imagen de vista previa usada arriba.

## Notas

- El proyecto es una demo; la integración con backend (por ejemplo Java/Spring Boot) para catálogo, recomendaciones o checkout se puede añadir más adelante.
- Mantiene estilos mobile-first con media queries para desktop.


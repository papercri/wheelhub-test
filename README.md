# WheelHub Test - Vue 3 + TypeScript + Vite

Aplicación de gestión de usuarios con Vue 3, TypeScript, Vite y JSON Server.

## Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Docker Desktop (para ejecutar con Docker)

## Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/papercri/wheelhub-test.git
cd wheelhub-test
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el proyecto en modo desarrollo**


```bash

# Terminal 1: Ejecutar el servidor JSON

cd src/api
npx json-server --watch db.json --port 3000

# Terminal 2: Ejecutar el frontend

npm run dev
```



4. **Acceder a la aplicación**
- Frontend: http://localhost:5173
- API: http://localhost:3000

## Instalación con Docker

1. **Asegúrate de que Docker Desktop esté ejecutándose**

2. **Construir y ejecutar los contenedores**
```bash
docker-compose up --build
```

3. **Acceder a la aplicación**
- Frontend: http://localhost:5173
- API: http://localhost:3000

4. **Detener los contenedores**
```bash
# Detener (Ctrl+C) y luego:
docker-compose down
```

## Requisitos de la aplicación

- **Listado de usuarios**
  - Mostrar usuarios con: `id`, `nombre`, `email` y `estado`.
  - Indicar el número total de usuarios visibles.

- **Filtrado**
  - Filtrar por `nombre`, `email` y `estado` desde inputs y un select.
  - Los filtros se aplican **en tiempo real** sin recargar la página.
  - Se pueden combinar múltiples filtros.
  - Cada input tiene una **X para borrar su contenido**.

- **Paginación**
  - Mostrar máximo 10 usuarios por página.
  - Recordar los filtros aplicados al cambiar de página.
  - Indicar la página actual y total de páginas.

- **Creación de usuarios**
  - Botón “Crear usuario” visible en el listado, que navega a `/usuarios/nuevo`.
  - Formulario con campos: `nombre`, `email`, `estado`.
  - Validaciones en cliente:
    - Nombre mínimo 3 caracteres.
    - Email válido.
    - Mensajes de error junto a cada campo.
  - Validaciones en servidor con mensajes claros.
  - Botón “Guardar” y botón “Cancelar” que vuelve al listado manteniendo filtros y página.

- **Detalle de usuario**
  - Al hacer click en un usuario del listado, abrir la página de detalle.
  - Desde detalle, poder volver al listado manteniendo filtros y la página activa.

- **Navegación e interfaz**
  - Sidebar con sección “Usuarios” siempre visible y con el item activo marcado según la página (listado o detalle).
  - Header que muestra la sección actual.
  - El listado tiene botón de creación, inputs de filtros, items clicables y paginación.

---

## Comportamiento esperado

- **Filtros**: se aplican sin recargar la página, combinables, reseteables.
- **Paginación**: respeta filtros y recuerda la página seleccionada.
- **Creación**: formulario con validaciones claras, mensajes visibles, navegación entre listado y creación sin perder estado.
- **Detalle**: navegación hacia detalle y retorno al listado preservando filtros y página.
- **Sidebar y header**: reflejan la sección activa correctamente.

---

## Tecnologías

- **Vue 3** - Framework JavaScript progresivo
- **TypeScript** - Superset de JavaScript con tipos
- **Vite** - Build tool y servidor de desarrollo
- **Tailwind CSS** - Framework CSS utility-first
- **JSON Server** - API REST falsa para desarrollo
- **Docker** - Contenedorización de la aplicación


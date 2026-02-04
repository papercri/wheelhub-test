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
npx json-server --watch users.json --port 3000

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

## Estructura del Proyecto

```
wheelhub-test/
├── src/
│   ├── api/
│   │   ├── Dockerfile
│   │   └── db.json
│   ├── components/
│   │   ├── layout/
│   │   │   └── AppHeader.vue
│   │   └── MainList.vue
│   ├── types/
│   │   └── types.ts
│   ├── App.vue
│   └── main.ts
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## Tecnologías

- **Vue 3** - Framework JavaScript progresivo
- **TypeScript** - Superset de JavaScript con tipos
- **Vite** - Build tool y servidor de desarrollo
- **Tailwind CSS** - Framework CSS utility-first
- **JSON Server** - API REST falsa para desarrollo
- **Docker** - Contenedorización de la aplicación


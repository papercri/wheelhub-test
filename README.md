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

Opción A: Con servidor de desarrollo local
```bash

# Terminal 1: Ejecutar el servidor JSON
cd src/api
npx json-server --watch users.json --port 3000

# Terminal 2: Ejecutar el frontend
npm run dev
```

Opción B: Usar el script de desarrollo completo (si está configurado)
```bash
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

## Scripts Disponibles

```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción
npm run type-check   # Verificar tipos TypeScript
```

## Estructura del Proyecto

```
wheelhub-test/
├── src/
│   ├── api/
│   │   ├── Dockerfile
│   │   └── users.json
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

## 🛠️ Tecnologías

- **Vue 3** - Framework JavaScript progresivo
- **TypeScript** - Superset de JavaScript con tipos
- **Vite** - Build tool y servidor de desarrollo
- **Tailwind CSS** - Framework CSS utility-first
- **JSON Server** - API REST falsa para desarrollo
- **Docker** - Contenedorización de la aplicación

## 📝 Notas

- El archivo `users.json` contiene los datos de prueba
- La aplicación usa Tailwind CSS para los estilos
- TypeScript está configurado con modo estricto


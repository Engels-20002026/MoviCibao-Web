# API REST - MoviCibao

## 1. Descripción

API REST del proyecto MoviCibao, desarrollada con Node.js, Express y MySQL. Permite administrar rutas de transporte e incidencias mediante operaciones CRUD.

## 2. Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- MySQL2
- dotenv
- CORS

## 3. Instalación

1. Clonar el repositorio.
2. Entrar en la carpeta del backend:

```bash
cd backend
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` tomando como referencia `.env.example`.
5. Configurar los datos de conexiÃ³n a MySQL en `.env`.
6. Crear la base de datos `movicibao` y sus tablas.

## 4. Variables de entorno

| Variable | DescripciÃ³n |
|---|---|
| PORT | Puerto del servidor |
| DB_HOST | Servidor de MySQL |
| DB_USER | Usuario de MySQL |
| DB_PASSWORD | ContraseÃ±a de MySQL |
| DB_NAME | Nombre de la base de datos |
| DB_PORT | Puerto de MySQL |

## 5. Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Servidor local:

`http://localhost:3000`

## 6. Endpoints de rutas

| MÃ©todo | Endpoint | FunciÃ³n |
|---|---|---|
| GET | /api/rutas | Listar todas las rutas |
| GET | /api/rutas/:id | Consultar una ruta |
| POST | /api/rutas | Registrar una ruta |
| PATCH | /api/rutas/:id | Actualizar una ruta |
| DELETE | /api/rutas/:id | Eliminar una ruta |

### Ejemplo para registrar una ruta

```json
{
  "origen": "Santiago",
  "destino": "La Vega",
  "duracionEstimada": 45,
  "distanciaKm": 35.5,
  "estado": "normal"
}
```

Estados permitidos: `normal`, `congestionada`, `cerrada`.

## 7. Endpoints de incidencias

| MÃ©todo | Endpoint | FunciÃ³n |
|---|---|---|
| GET | /api/incidencias | Listar todas las incidencias |
| GET | /api/incidencias/:id | Consultar una incidencia |
| POST | /api/incidencias | Registrar una incidencia |
| PATCH | /api/incidencias/:id | Actualizar una incidencia |
| DELETE | /api/incidencias/:id | Eliminar una incidencia |

### Ejemplo para registrar una incidencia

```json
{
  "rutaId": 1,
  "tipo": "Congestionamiento",
  "descripcion": "TrÃ¡fico elevado en la vÃ­a",
  "gravedad": "alta",
  "estado": "activa"
}
```

Gravedades permitidas: `baja`, `media`, `alta`.

Estados permitidos: `activa`, `resuelta`.

## 8. Base de datos

La base de datos se llama `movicibao` y contiene dos tablas principales:

- `rutas`: almacena el origen, destino, duraciÃ³n estimada, distancia y estado de cada ruta.
- `incidencias`: almacena los eventos que afectan las rutas.

La tabla `incidencias` se relaciona con `rutas` mediante la clave forÃ¡nea `rutaId`.

## 9. CÃ³digos de respuesta HTTP

| CÃ³digo | Significado |
|---|---|
| 200 | OperaciÃ³n realizada correctamente |
| 201 | Registro creado correctamente |
| 400 | Datos invÃ¡lidos |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

## 10. Seguridad

El archivo `.env` contiene las credenciales locales de conexiÃ³n y no debe subirse a GitHub. El archivo `.env.example` proporciona valores de referencia para configurar el entorno.
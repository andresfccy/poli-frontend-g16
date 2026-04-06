# Poli Service Hub

Proyecto universitario "Plataforma de Servicios Digitales", desarrollado de forma incremental a lo largo de varias entregas. La aplicacion esta construida con `React + TypeScript + Tailwind CSS`.

---

## Historial de entregas

### Entrega 1 — Prototipo inicial (Semana 3)

**Objetivo:** Construir una maquetacion funcional que represente el aplicativo final y cubra los puntos principales del enunciado.

Funcionalidades entregadas:

- Home con header, footer, bienvenida, destacados, CTA y seccion informativa.
- Listado dinamico de servicios en cards desde datos locales (`src/data/services.ts`).
- Vista de detalle individual por servicio.
- Favoritos con persistencia en `localStorage`.
- Pagina de contacto con validaciones de campos obligatorios y formato de correo.
- Mini CRUD basico: crear y eliminar servicios.
- Navegacion con mas de 5 vistas usando React Router DOM.

---

### Entrega 2 — Prototipo funcional (Semana 5)

**Objetivo:** Evolucionar el prototipo hacia un sistema funcional con CRUD completo, capa de API simulada, accesibilidad mejorada y diseno responsive revisado.

Funcionalidades entregadas:

- **Edicion de servicios**: CRUD completo. El panel de Gestion ahora permite editar cualquier servicio existente. Al presionar "Editar", el formulario se pre-llena con los datos actuales; el boton de envio cambia entre "Crear servicio" y "Guardar cambios" segun el modo activo.
- **Capa de API simulada** (`src/services/api.ts`): modulo independiente con funciones async que encapsulan todas las operaciones de datos e introducen un retardo de 400 ms para representar latencia de red.
- **Estado de carga**: la interfaz deshabilita controles y muestra texto de progreso ("Creando...", "Guardando...") mientras se procesa una operacion.
- **Mejoras de accesibilidad**: enlace de salto "Saltar al contenido", `aria-expanded` y cierre con `Escape` en el menu movil, `aria-pressed` y `aria-label` descriptivo en botones de favorito, `role="alert"` en errores de formulario y `aria-live="polite"` en mensajes de exito.
- **Diseno responsive revisado**: todos los componentes adaptados para movil, tablet y escritorio.
- **Documentacion tecnica actualizada** en este README.

---

## Paginas incluidas

| Ruta | Pagina | Descripcion |
|---|---|---|
| `/` | Inicio | Hero, estadisticas, servicios destacados y bloques informativos |
| `/servicios` | Servicios | Catalogo completo con busqueda textual y filtro por categoria |
| `/servicios/:id` | Detalle | Informacion ampliada, beneficios, etiquetas y acciones |
| `/favoritos` | Favoritos | Servicios guardados, recuperados desde `localStorage` |
| `/contacto` | Contacto | Formulario con validacion de campos y formato de correo |
| `/gestion` | Gestion | Panel CRUD completo: crear, editar y eliminar servicios |

## Capa de API simulada

El modulo `src/services/api.ts` encapsula todas las operaciones de datos:

| Funcion | Simula |
|---|---|
| `apiGetServices()` | `GET /servicios` |
| `apiCreateService(input)` | `POST /servicios` |
| `apiUpdateService(id, input)` | `PUT /servicios/:id` |
| `apiDeleteService(id)` | `DELETE /servicios/:id` |
| `apiGetFavorites()` | `GET /favoritos` |
| `apiSaveFavorites(ids)` | `PUT /favoritos` |

## Tecnologias usadas

| Tecnologia | Proposito |
|---|---|
| React 18 | UI declarativa basada en componentes |
| TypeScript | Tipado estatico en toda la aplicacion |
| Vite | Bundler y servidor de desarrollo |
| Tailwind CSS | Estilos utilitarios y diseno responsive |
| React Router DOM v6 | Enrutamiento del lado del cliente |
| localStorage | Persistencia de datos sin backend |

## Estructura del proyecto

```text
src/
├── components/
│   ├── Header.tsx          # Navegacion sticky con menu movil y accesibilidad
│   ├── Footer.tsx          # Pie de pagina con informacion de contacto
│   ├── Layout.tsx          # Contenedor principal con punto de anclaje para skip link
│   ├── ServiceCard.tsx     # Tarjeta de servicio con toggle de favorito accesible
│   └── SectionHeading.tsx  # Encabezado reutilizable para secciones
├── context/
│   └── AppContext.tsx      # Estado global: servicios, favoritos, CRUD async
├── data/
│   └── services.ts         # Datos iniciales de los 6 servicios
├── pages/
│   ├── HomePage.tsx
│   ├── ServicesPage.tsx
│   ├── ServiceDetailPage.tsx
│   ├── FavoritesPage.tsx
│   ├── ContactPage.tsx
│   ├── AdminPage.tsx       # Panel CRUD completo con modo edicion
│   └── NotFoundPage.tsx
├── services/
│   └── api.ts              # Capa de API mock con operaciones async
└── types/
    └── service.ts          # Interfaces Service y ServiceFormInput
```

## Instrucciones de ejecucion

Requiere Node.js >= 18 y pnpm instalado.

```bash
pnpm install
pnpm dev
```

Para compilar para produccion:

```bash
pnpm build
```

## Proximos pasos

- Integracion con backend real (REST o GraphQL).
- Pruebas unitarias y de integracion.
- Autenticacion de usuarios.
- Ajustes visuales luego de validacion con el equipo docente.

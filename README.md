# Poli Service Hub

Prototipo web para la **Entrega 1** del proyecto universitario "Plataforma de Servicios Digitales". La aplicacion se construyo con una base ligera en `React + TypeScript + Tailwind CSS`, usando datos locales y `localStorage` para demostrar interaccion sin sobrecargar el proyecto.

## Objetivo de la entrega

Construir una maquetacion funcional que represente el aplicativo final y cubra los puntos principales del enunciado:

- Home con header, footer, bienvenida, destacados, CTA y seccion informativa.
- Listado dinamico de servicios en cards.
- Vista de detalle por servicio.
- Pagina de contacto con validaciones basicas.
- Gestion de favoritos usando `localStorage`.
- Mini CRUD basico para crear y eliminar servicios.

## Paginas incluidas

1. `Inicio`
   Presenta el valor del aplicativo, estadisticas visuales, servicios destacados y bloques informativos.
2. `Servicios`
   Muestra el catalogo completo con cards dinamicas, filtro por categoria y busqueda textual.
3. `Detalle del servicio`
   Presenta informacion completa, imagen, beneficios, etiquetas y acciones de favorito o contacto.
4. `Favoritos`
   Recupera desde `localStorage` los servicios guardados por el usuario.
5. `Contacto`
   Incluye formulario con campos obligatorios, validacion de correo y mensaje de confirmacion.
6. `Gestion`
   Permite crear nuevos servicios y eliminar registros existentes para evidenciar un mini CRUD.

## Funcionalidades documentadas para la entrega 1

- **Visualizacion de servicios**
  Cards con imagen, nombre, descripcion breve y boton `Ver mas`.
- **Detalle del servicio**
  Pagina individual con descripcion amplia, datos de apoyo y botones de interaccion.
- **Favoritos**
  Boton para guardar o quitar servicios. El estado queda persistido con `localStorage`.
- **Contacto**
  Formulario con validacion de campos obligatorios y formato de correo.
- **CRUD basico**
  Formulario para crear nuevos servicios y boton para eliminarlos.
- **Datos locales**
  Servicios iniciales definidos en un arreglo local dentro de `src/data/services.ts`.

## Tecnologias usadas

- `React`
- `TypeScript`
- `Vite`
- `Tailwind CSS`
- `React Router DOM`
- `localStorage`

## Estructura principal

```text
.
|-- public/images
|-- src/components
|-- src/context
|-- src/data
|-- src/pages
|-- src/types
|-- src/App.tsx
|-- src/main.tsx
`-- src/index.css
```

## Decisiones de diseno

- Se eligio una interfaz moderna con paleta calida (`cream`, `coral`, `teal`, `ink`) para evitar un look generico.
- La navegacion tiene mas de 5 vistas para cumplir el requerimiento del home y facilitar la demostracion.
- El estado global se centralizo en un contexto simple para mantener el prototipo ordenado.
- Las imagenes son SVG locales para evitar depender de recursos externos en la demostracion.

## Instrucciones de ejecucion

> En este entorno no habia `node`, `npm` ni `pnpm`, por eso el proyecto se dejo estructurado pero no fue posible instalar dependencias ni ejecutar la app aqui.

Cuando lo abras en una maquina con Node.js:

```bash
pnpm install
pnpm dev
```

Tambien puedes compilarlo con:

```bash
pnpm build
```

## Alcance actual y siguiente iteracion

### Cubierto en Entrega 1

- Maquetacion funcional del aplicativo.
- Navegacion principal.
- Interacciones basicas en frontend.
- Persistencia local de favoritos y servicios.
- Documentacion tecnica inicial en este `README.md`.

### Posibles mejoras para Entrega 2

- Edicion de servicios para completar CRUD.
- Integracion con backend o API mock.
- Mejoras de accesibilidad y pruebas.
- Ajustes visuales finos luego de validacion con el equipo docente.

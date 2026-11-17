# AGENTS.md

Guía para agentes de IA que trabajan en este repositorio. Léela antes de hacer cambios.

## Resumen del proyecto

- **Proyecto:** Plataforma digital informativa y de comunicación escolar de la
  Unidad Educativa "Juan Carlos Barrientos Pérez", San Julián – Santa Cruz – Bolivia.
- **Nombre:** `astro-bun-skeleton` (v0.1.3)
- **Licencia:** MIT
- **Tecnologías:** Astro 5.x, Bun (>=1.2.0), TypeScript estricto.
- **Idioma de la interfaz:** Español (`lang="es"`).
- **Sitio estático** (sin backend). Las sugerencias se envían por WhatsApp desde
  el navegador.

## Funcionalidades del proyecto

La plataforma informa, organiza reuniones y recibe sugerencias de la comunidad educativa:

- **Inicio (`/`):** presentación institucional, accesos rápidos, próximas reuniones
  y últimos comunicados.
- **Reuniones y citaciones (`/reuniones`):** listado de convocatorias con fecha,
  hora, lugar, motivo y público dirigido. Se separan en próximas y anteriores.
- **Comunicados (`/comunicados`):** avisos oficiales, comunicados e información
  administrativa con fecha, categoría, resumen y contenido completo.
- **Actividades y noticias (`/actividades`):** actividades, eventos y novedades de
  la comunidad educativa.
- **Sugerencias (`/sugerencias`):** formulario con nombre opcional, rol del
  participante y mensaje. Explica el proceso de revisión y las reglas de uso.
- **Contacto (`/contacto`):** dirección, atención institucional y canal de WhatsApp.
- La plataforma es un **apoyo** y no reemplaza los comunicados oficiales ni las
  reuniones presenciales. El contenido debe ser validado por la dirección.

## Criterios de diseño (alineados al stack)

- **Contenido estructurado:** los datos se definen en `src/content` (YAML) y se
  tipan con interfaces `I*` en `src/types/datatypes.d.ts`:
  - `institucion.yml` → `IInstitucion` (nombre, lema, dirección, atención, etc.).
  - `reuniones.yml` → `IReunion` (título, fecha ISO, hora, lugar, motivo, dirigidoA).
  - `comunicados.yml` → `IComunicado` (título, fecha ISO, categoría, resumen,
    contenido, `destacado` opcional).
  - `actividades.yml` → `IActividad` (título, fecha ISO, tipo, lugar opcional,
    descripción).
- **Fechas:** se guardan en formato ISO `YYYY-MM-DD` y se formatean con
  `Intl.DateTimeFormat("es-BO")` mediante los helpers de `src/types/utils.ts`
  (`formatFechaLarga`, `getDia`, `getMesCorto`, `esFechaFutura`). El estado de una
  reunión (próxima/anterior) se calcula con `esFechaFutura`, no se guarda en YAML.
- **Categorías de comunicados:** `aviso`, `comunicado`, `administrativo`
  (`ICategoriaComunicado`); se muestran como badges. Los destacados usan
  `destacado: true`.
- **Tipos de actividad:** `actividad` y `noticia` (`ITipoActividad`).
- **Información institucional:** centralizada en `institucion.yml` para evitar
  duplicar el nombre, lema o dirección en las páginas.
- **Diseño responsivo:** `Header` con navegación desplazable en móvil, tarjetas
  reutilizables (`ReunionCard`, `ComunicadoCard`, `ActividadCard`) y `Footer`
  institucional. Interfaz en español.
- **Sugerencias:** formulario en `src/pages/sugerencias.astro`; el script vive en
  `src/scripts/sugerencias.js` y se incluye desde `BaseLayout`. Construye un
  mensaje con rol, nombre (o "Anónimo") y mensaje, y abre
  `https://wa.me/<número>?text=<mensaje>`. El script usa un guard
  (`window.__sugerenciasInit`) para no duplicar listeners con el ClientRouter.
- **WhatsApp:** el número se configura en `WHATSAPP_NUMBER` (contexto
  `client`/`public`) en el `env.schema` de `astro.config.mjs`, se importa con
  `astro:env/client` y se expone al navegador como `window.__WHATSAPP_NUMBER__`
  desde `BaseLayout`. El nombre de la institución se expone como
  `window.__SCHOOL_NAME__`.
  - **Nunca** exponer secretos; el número de WhatsApp es público no sensible.
- **Privacidad:** el formulario solicita solo los datos necesarios; no publica
  sugerencias automáticamente; el contenido debe ser revisado por responsables
  autorizados. No se deben incluir datos personales de terceros ni mensajes
  ofensivos.
- **Contenido de ejemplo:** los registros actuales de reuniones, comunicados y
  actividades son de demostración. La institución debe revisarlos, reemplazarlos y
  validarlos antes de publicar el sitio.

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando               | Acción                                                    |
| :-------------------- | :-------------------------------------------------------- |
| `bun install`         | Instala las dependencias                                  |
| `bun run dev`         | Inicia el servidor de desarrollo en `localhost:4321`      |
| `bun run build`       | Construye la página web en la carpeta `./dist/`           |
| `bun run preview`     | Sirve el build localmente (uso tras `build`)              |
| `bun run host`        | Sirve el build exponiéndolo en la red (host)              |
| `bun run astro`       | Ejecuta la CLI de Astro (p. ej. `bun run astro --help`)   |
| `bunx astro check`    | Verifica tipos y errores del proyecto (no hay test/lint)  |

**Nota:** Siempre usar `bun` como gestor de paquetes y runner de scripts. No usar `npm`/`yarn`/`pnpm`.

## Stack y configuraciones

- **Astro 5** con `astro:transitions` (ClientRouter) y `astro:env` para variables de entorno.
- **TypeScript estricto** (`astro/tsconfigs/strict`).
- **YAML** como formato de contenido, procesado con `@rollup/plugin-yaml` (configurado en `astro.config.mjs`).
- **Sin linter ni framework de testing** configurado. Usar `bunx astro check` para validaciones.

## Estructura de carpetas

| Carpeta              | Propósito                                                                 |
| :------------------- | :------------------------------------------------------------------------ |
| `src/assets`         | Imágenes, fuentes, etc. que serán optimizadas por Astro                   |
| `src/components`     | Componentes reutilizables (`.astro`: Header, Footer y tarjetas)           |
| `src/content`        | Contenido estructurado en `*.yml` (institución, reuniones, comunicados…)  |
| `src/layouts`        | Estructura base (`BaseLayout.astro`)                                      |
| `src/pages`          | Páginas y rutas del sitio                                                 |
| `src/scripts`        | Scripts `*.js` / `*.ts` usados por páginas, layouts, etc.                 |
| `src/styles`         | Hojas de estilo `*.css` del proyecto                                      |
| `src/types`          | Tipos, interfaces y utilidades de datos (`utils.ts`)                      |
| `public`             | Archivos estáticos servidos tal cual (p. ej. `favicon.ico`)               |

## Alias de importación

Definidos en `tsconfig.json`. Usar estos alias en lugar de rutas relativas largas:

| Alias            | Ruta de destino    |
| :--------------- | :----------------- |
| `@layouts/*`     | `src/layouts/*`    |
| `@pages/*`       | `src/pages/*`      |
| `@components/*`  | `src/components/*` |
| `@datatypes/*`   | `src/types/*`      |
| `@content/*`     | `src/content/*`    |
| `@assets/*`      | `src/assets/*`     |
| `@src/*`         | `src/*`            |

Ejemplo:

```ts
import BaseLayout from "@layouts/BaseLayout.astro";
import type { IReunion } from "@datatypes/datatypes";
import reuniones from "@content/reuniones.yml";
```

## Convenciones de código

- **Indentación:** 2 espacios. Final de línea LF, UTF-8, nueva línea final (ver `.editorconfig`).
- **Naming de tipos:** las interfaces comienzan con `I` (p. ej. `IReunion`). Agruparlas en `src/types/datatypes.d.ts`.
- **Imports:** usar siempre los alias `@/*` definidos en tsconfig.
- **Componentes Astro:** declarar `interface Props` y desestructurar `Astro.props` con valores por defecto.
- **Estilos:** hojas de estilo globales se importan desde el layout; estilos específicos de componente van en bloques `<style>` dentro del `.astro`.
- **Contenido dinámico:** almacenar en `src/content` (YAML) y tipar sus estructuras en `src/types`.
- **Scripts de cliente:** colocarlos en `src/scripts` y referenciarlos con `<script src>`.
- **Interfaz UI:** en español (títulos, textos, metadatos).

## Variables de entorno

- Las variables se definen y tipan en el bloque `env.schema` de `astro.config.mjs` (`API_URL`, `PORT`, `API_SECRET`, `WHATSAPP_NUMBER`).
- Para desarrollo local, copiar `.env.development` a `.env`.
- Los contextos definen visibilidad: `client`/`public` se exponen al navegador (usar `astro:env/client`), `server`/`secret` solo en servidor (usar `astro:env/server`).

```ts
import { WHATSAPP_NUMBER } from "astro:env/client";
```

- **Nunca** exponer secretos en `public`/client ni incluirlos en commits.

## Notas de control de versiones

- `dist/`, `.astro/`, `node_modules/`, `.env`, `.env.production`, `docs/` están ignorados por git.
- No commitear archivos `.env` ni claves secretas.
- El lockfile oficial es `bun.lock`.

## Archivos y directorios a ignorar (no analizar)

El agente **no debe** leer ni analizar estos archivos/directorios. Son artefactos de
build, dependencias, secretos o configuración interna:

| Ruta                   | Motivo                                   |
| :--------------------- | :--------------------------------------- |
| `node_modules/`        | Dependencias instaladas                  |
| `dist/`                | Salida de build                          |
| `.astro/`              | Tipos generados por Astro                |
| `.env`                 | Variables de entorno / secretos          |
| `.env.development`     | Plantilla de entorno (contiene secretos) |
| `.env.production`      | Variables de producción                  |
| `docs/`                | Documentación ignorada por git           |
| `bun.lock`             | Lockfile generado                        |
| `.git/`                | Internos de control de versiones         |
| `.vscode/`             | Configuración del IDE                    |
| `.editorconfig`        | Configuración de editor                  |
| `.gitignore`           | Configuración de git                     |

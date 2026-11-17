# Plataforma Digital Informativa y de Comunicación Escolar

Sitio web de la **Unidad Educativa "Juan Carlos Barrientos Pérez"** (San Julián –
Santa Cruz – Bolivia), construido con Astro y Bun.

La plataforma permite:

- Consultar reuniones, citaciones y convocatorias.
- Leer comunicados administrativos, avisos y noticias.
- Conocer las actividades de la comunidad educativa.
- Enviar sugerencias y opiniones mediante WhatsApp.
- Consultar los datos de contacto institucional.

## Guía de instalación y ejecución

### 1. Requisitos

- [Bun](https://bun.sh/) >= 1.2.0

### 2. Configurar el entorno

- Crea una copia del archivo `.env.development` y renómbrala como `.env`.
- Actualiza `WHATSAPP_NUMBER` con el número que recibirá las sugerencias.

### 3. Instalar dependencias

```bash
bun install
```

### 4. Ejecutar el proyecto

```bash
bun run dev
```

Abre <http://localhost:4321> en el navegador.

## Contenido editable

| Archivo                          | Contenido                                      |
| :------------------------------- | :--------------------------------------------- |
| `src/content/institucion.yml`    | Nombre, lema, dirección y atención             |
| `src/content/reuniones.yml`      | Reuniones y citaciones                         |
| `src/content/comunicados.yml`    | Comunicados, avisos e información administrativa |
| `src/content/actividades.yml`    | Actividades y noticias                         |

Las fechas se escriben en formato `YYYY-MM-DD`.

> **Importante:** los registros incluidos son de ejemplo. La institución debe
> revisarlos, reemplazarlos y validarlos antes de publicar la plataforma.

## Estructura del proyecto

| Carpeta          | Descripción                                                    |
| :--------------- | :------------------------------------------------------------- |
| `src/assets`     | Imágenes y fuentes optimizadas por Astro                       |
| `src/components` | Header, Footer y tarjetas (reunión, comunicado, actividad)     |
| `src/content`    | Contenido estructurado en YAML                                 |
| `src/layouts`    | Estructura base de las páginas                                 |
| `src/pages`      | Páginas del sitio                                              |
| `src/scripts`    | Scripts del cliente (envío de sugerencias)                     |
| `src/styles`     | Estilos globales                                               |
| `src/types`      | Tipos, interfaces y utilidades                                 |

## Comandos

| Comando           | Acción                                            |
| :---------------- | :------------------------------------------------ |
| `bun install`     | Instala las dependencias                          |
| `bun run dev`     | Inicia el servidor local en `localhost:4321`      |
| `bun run build`   | Construye el sitio en `./dist/`                   |
| `bun run preview` | Sirve el build localmente                         |
| `bunx astro check`| Verifica tipos y errores del proyecto             |

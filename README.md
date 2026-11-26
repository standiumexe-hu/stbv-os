# STBV_OS — DUAL Edition ♡

Sitio estático fan-made. HTML, CSS y JavaScript sin paquetes ni compilación.

## Probar en tu computadora

Extrae el ZIP y abre `index.html` en el navegador. También puedes usar Live Server en VS Code o ejecutar `python -m http.server 8000` desde la carpeta y abrir `http://localhost:8000`. Los enlaces de compartir funcionarán para otras personas después de publicar el sitio (no compartas una dirección `file://` o localhost).

## Personalizar

- `data.js`: playlists, descripciones, enlaces, eventos, proyectos y texto de presentación. Los dos enlaces vacíos son intencionales; añade los tuyos. El botón de reproducción solo aparece para URLs válidas de Apple Music.
- `assets/covers/`: portadas SVG provisionales y editables. Coloca tus portadas reales aquí (PNG/JPG/SVG) y cambia la propiedad `cover` de cada playlist.
- `styles.css`: paleta, tipografías, dimensiones y diseño responsive.
- `app.js`: navegación, filtros, ventanas, compartir y reproductor.
- `index.html`: estructura general, encabezado y metadatos.

Para agregar una playlist, copia una entrada en `playlists` de `data.js`, cambia `id` por un valor único y completa los campos. La categoría se añade automáticamente a los filtros. Temas disponibles: `pink`, `blue`, `lime`.

## Publicar en GitHub Pages

1. Crea un repositorio, por ejemplo `stbv-os`, desde una cuenta con un alias de fan si prefieres separar identidades.
2. Sube **el contenido** de la carpeta `stbv-os` a la raíz del repositorio, no la carpeta contenedora.
3. Abre Settings > Pages > Build and deployment. Elige Deploy from a branch y selecciona `main` y `/(root)`. Guarda.
4. Cuando GitHub termine el despliegue, usa la URL mostrada en Settings > Pages. Normalmente será `https://TU-USUARIO.github.io/stbv-os/`.
5. Para cambiar contenido, edita `data.js` y haz commit. El sitio se actualizará con el nuevo despliegue.

## Privacidad y derechos

No se incluyen datos personales, analítica, ni scripts de terceros en la carga inicial. Apple Music se conecta cuando alguien abre un reproductor o enlace. El repositorio público y la web son visibles para otros: revisa archivos, nombre y correo de autor de commits (usa el correo noreply de GitHub si deseas). Usa material propio o autorizado; los SVG incluidos son provisionales. La web no es oficial.

No hay base de datos, cuentas de visitantes, noticias automáticas ni calendario sincronizado. Todo se mantiene editando `data.js`. Compartir usa la función nativa del dispositivo, el portapapeles o un cuadro de copia manual.

## V2.0 — Community Edition

Se añadieron Discography.exe, DUAL_STATS.exe, MemoryCard.exe, FanGallery.exe, DUAL_DICTIONARY y Guestbook.txt. The Archive incorpora buscador y un formulario de aportaciones. `community.js` contiene las funciones nuevas; no necesita dependencias externas para visualizar el sitio.

### Habilitar los formularios

GitHub Pages no procesa formularios ni guarda mensajes. Esta versión admite dos endpoints públicos de Formspree (https://formspree.io/). Crea una cuenta con un correo separado de tu identidad personal si lo deseas. Crea dos formularios (Archive y Guestbook), copia sus endpoints desde Integration y edita en `data.js`:

```js
forms: {
  archive: "https://formspree.io/f/TU_ID_ARCHIVE",
  guestbook: "https://formspree.io/f/TU_ID_GUESTBOOK"
},
```

Sustituye los marcadores por IDs reales. No incluyas credenciales, API keys ni correo personal en el repositorio. Los formularios permanecen deshabilitados hasta que se configure un endpoint válido. Publica el sitio y realiza un envío de prueba desde cada formulario; comprueba que aparece en el panel de Formspree. Consulta sus límites, privacidad y controles antispam. El honeypot es una medida básica, no una protección completa. El servicio externo procesa los datos que se envían, y su disponibilidad depende de su cuenta/configuración. No se solicita correo del visitante. No actives respuestas automáticas que revelen tu identidad personal.

### Moderación y publicación

1. Abre las aportaciones en el panel privado de Formspree.
2. Verifica el contenido, origen, duplicados y derechos antes de añadirlo. No abras archivos/enlaces sospechosos.
3. Actualiza `archive` o tu playlist real en Apple Music manualmente. El formulario no altera Apple Music.
4. Para Guestbook, publica únicamente textos con autorización de publicación y sin datos personales en `guestbook`. No publiques aportaciones ofensivas ni información sensible.
5. Haz commit de los cambios. Nunca subas el buzón privado o una exportación completa al repositorio.

### Nuevos catálogos en data.js

- `discography`: title, kind, description, date (YYYY-MM-DD, opcional), url. Usa kind para Álbum, Versión, Canción, etc.
- `stats`: date (ISO 8601 con zona horaria), metric (Votos o Reproducciones, por ejemplo), series, value (número), source (URL). Los registros son manuales y no se obtienen automáticamente. Las tarjetas muestran la última medición por serie (pueden corresponder a momentos distintos); compara solo cifras equivalentes. No se incluyen números de ejemplo visibles.
- `memories`: date, title, description, url.
- `gallery`: title, category, image (ruta local), description, downloadable (true si permites descarga). Sustituye las portadas provisionales por material propio o autorizado.
- `dictionary`: term, meaning, source.
- `guestbook`: alias, date, message. Solo contenido aprobado.

La discografía inicial contiene dos títulos conocidos, sin inventar fechas ni información sobre versiones. Los módulos sin datos muestran un estado vacío, no contenido ficticio. La sección de votación y streaming no se sincroniza con plataformas ni realiza votos o reproducciones.

Documentación de formularios: https://help.formspree.io/articles/building-your-form/building-an-html-form/

## V3.0 — BRAVOVERSE expansion

Se conservan los módulos, playlists y formularios de V2. El sitio ahora tiene 18 aplicaciones. El menú de aplicaciones se agrupa y se puede desplegar en móvil. `extras.js` contiene los seis módulos nuevos.

- `patchnotes`: version, title, changes (lista de textos), date opcional. Agrega las nuevas canciones al historial al publicarlas.
- `lostMedia`: id único, title, description, status (Buscando / En revisión / Encontrado), url opcional. El botón de pista abre un formulario de Archive con título precargado; no necesita un tercer endpoint. El formulario genérico permite enviar pistas aunque aún no exista una búsqueda publicada.
- `credits`: alias, contribution, date, consent (true únicamente cuando existe autorización verificable). El formulario de aportaciones incluye ahora una casilla opcional para permitir créditos. Nunca publiques información privada del buzón.
- `members`: id, name, country, accent, image (ruta local opcional), bio, url. Los datos iniciales de origen se basan en la nota de Universal Music enlazada desde Meet_STBV. No se incluyen fotografías ajenas ni biografías no verificadas.
- `DUAL_GAMES`: memorama de nombres (cinco parejas) y trivia de países, con puntuación y reinicio; no recopilan datos ni necesitan cuenta. Los juegos se reinician al cambiar de sección.
- `toolkit`: title, description, file (ruta local), type. Incluye cuatro archivos descargables, también en `assets/toolkit/DUAL_TOOLKIT.zip`. Si editas los archivos, vuelve a crear ese ZIP para que coincida con las descargas individuales.

Para migrar una V2 que ya hayas personalizado, conserva tus datos y endpoints de `data.js`, incorpora las nuevas propiedades y copia los archivos de V3. No sobrescribas tus portadas reales. Los contenidos y créditos siguen siendo manuales y el envío real requiere configurar Formspree. Publica solo contenido autorizado. El historial inicial describe cambios del código, no fechas de publicación del sitio.

## V3.1 — DUAL Arcade Update

Se mantienen las 18 aplicaciones; DUAL_GAMES ahora contiene cuatro juegos. SongGuess tiene cinco intentos, pistas originales progresivas, normalización de mayúsculas/acentos/puntuación, alias y racha local. El banco inicial de siete títulos se basa en Apple Music (`songGameSource`); modifica `songGame` en `data.js`, con cinco pistas por entrada. Las respuestas están en el cliente, no es un concurso verificable. El modo de audio es opcional: coloca un fragmento autorizado en `assets/audio/` y define `audio: "assets/audio/archivo.mp3"`. El reproductor pausa después de dos segundos y al salir/minimizar. No se incluyen grabaciones ni letras de canciones.

BRAVO_CATCH utiliza requestAnimationFrame, posiciones lógicas y colisiones rectangulares. Tres vidas; nota +10, micrófono +20, lightstick +30. Flechas/A/D, botones mantenidos o arrastre táctil. Pausa al minimizar, perder foco o cambiar de pestaña; al salir de la sección termina la sesión. El récord y la racha se guardan en localStorage cuando está disponible, no se comparten entre dispositivos. Personaliza `arcade.playerImage` y `arcade.objects` en data.js. El personaje inicial es una cesta SVG original.

Si ya personalizaste v3.0, copia `games.js`, `extras.js`, `app.js`, `index.html`, `styles.css` y `assets/games/`, y fusiona las propiedades `songGame`, `songGameSource`, `arcade` y la entrada nueva de `patchnotes` en tu `data.js`. Conserva tus portadas, enlaces y formularios.

## v3.2 — Choose your BRAVO

Los diez JPEG proporcionados se conservan sin modificación en `assets/games/sprites/`. Las nueve hojas de personajes miden 1536 × 768 y contienen 4 columnas × 2 filas de 384 × 384. CSS selecciona cada celda; la carrera usa 12 fps y el reposo 4 fps. Al moverse a la izquierda, se invierte horizontalmente. Se usa fondo claro y mezcla multiply para integrar los fondos blancos, sin crear PNG transparentes. El personaje de rizos no tiene hoja idle; se mantiene el primer cuadro de carrera hasta que se agregue una hoja `curly-idle.jpg` y se configure `idle` en `data.js`.

Los nombres de los personajes son etiquetas provisionales de vestuario; sustituir `name` por el nombre deseado tras verificar el orden. La lámina de objetos se usa directamente como atlas CSS; los recortes son aproximados y conservan el fondo morado. Los objetos normales tienen los puntos de la lámina y los especiales aparecen con probabilidad del 12% por aparición. Las vidas se limitan a cinco; los bonus no restan vidas si se pierden. La selección y el récord se guardan localmente. El personaje puede cambiarse antes de empezar o al acabar una partida; durante una pausa, usar Reiniciar para elegir otro. Los efectos de doble puntuación y ralentización usan tiempo efectivo de juego, no tiempo de pausa.

// Edita este archivo para actualizar el contenido. No requiere compilación.
// Usa id únicos, sin espacios. Deja url: "" para ocultar los botones no disponibles.
window.STBV_DATA = {
  playlists: [
    { id: "archive", name: "STBV_ARCHIVE.exe", category: "Archivo", theme: "pink", cover: "assets/covers/archive.svg", description: "Un archivo sonoro: canciones, covers, escenarios, sesiones y recuerdos. From pre-debut to infinity ♡", url: "", note: "ARCHIVE MODE" },
    { id: "stadium", name: "STANdium.exe", category: "Streaming", theme: "blue", cover: "assets/covers/stadium.svg", description: "Una playlist para acompañar el streaming de Santos Bravos. NOW PLAYING: ORIGAMI ♡", url: "", note: "STREAM MODE" },
    { id: "global", name: "ORIGAMI.exe — GLOBAL MIX", category: "Streaming", theme: "lime", cover: "assets/covers/global.svg", description: "Origami en una mezcla de géneros, sonidos y canciones para descubrir.", url: "https://music.apple.com/mx/playlist/origami-exe/pl.u-55D6XGKF6NooLp2", note: "GLOBAL MIX" }
  ],
  // Configura dos formularios en Formspree. No pongas contraseñas ni API keys aquí.
  forms: { archive: "", guestbook: "" },
  discography: [
    { title: "ORIGAMI", kind: "Canción", description: "", date: "", url: "" },
    { title: "KAWASAKI", kind: "Canción", description: "", date: "", url: "" }
  ],
  stats: [
    // { date: "2026-11-25T09:00:00-06:00", metric: "Votos", series: "KAWASAKI", value: 12345, source: "https://..." },
    // Para streaming, usa metric: "Reproducciones" y la serie correspondiente.
  ],
  memories: [
    // { date: "2026-01-01", title: "Un recuerdo", description: "Contexto del evento", url: "" }
  ],
  gallery: [
    { title: "Archive cover", category: "Portadas", image: "assets/covers/archive.svg", description: "Diseño provisional", downloadable: true },
    { title: "STANdium cover", category: "Portadas", image: "assets/covers/stadium.svg", description: "Diseño provisional", downloadable: true },
    { title: "GLOBAL MIX cover", category: "Portadas", image: "assets/covers/global.svg", description: "Diseño provisional", downloadable: true }
  ],
  dictionary: [
    // { term: "Una palabra", meaning: "Qué significa en el fandom", source: "https://..." }
  ],
  guestbook: [
    // Publica aquí solo mensajes aprobados que tengan permiso de publicación.
    // { alias: "DUAL", date: "2026-11-25", message: "Mensaje aprobado" }
  ],
  archive: [
    { title: "Pre-debut", description: "Presentaciones y recuerdos de antes del debut.", url: "" },
    { title: "Covers & sessions", description: "Covers vocales, sesiones y escenarios favoritos.", url: "" },
    { title: "Dance & performances", description: "Coreografías, dance covers y presentaciones.", url: "" }
  ],
  stream: [
    { title: "Playlists de streaming", description: "Explora las listas de la sección Playlists y elige la que más te guste.", section: "playlists" },
    { title: "Guías y recursos", description: "Espacio reservado para tus próximas guías de streaming.", url: "" }
  ],
  events: [
    // Ejemplo (descomenta y reemplaza con un evento confirmado):
    // { date: "2027-01-01", title: "Nombre del evento", description: "Ciudad / recinto", url: "https://..." }
  ],
  projects: [
    { title: "Playlist covers", description: "Portadas y diseños para el universo STBV_OS.", section: "playlists" },
    { title: "Wallpapers & fan art", description: "Próximamente: espacio para compartir mis diseños.", url: "" }
  ],
  // El historial registra versiones del código; añade la fecha real de publicación si lo deseas.
  patchnotes: [
    { version: "3.2", title: "Choose your BRAVO", changes: ["Cinco personajes seleccionables, animaciones idle/run y doce objetos ilustrados.", "Bonus, vidas extra y efectos temporales."] },
    { version: "3.1", title: "DUAL Arcade Update", changes: ["SongGuess: cinco intentos, pistas progresivas y fragmentos de audio opcionales.", "BRAVO_CATCH: arcade de objetos, tres vidas y récord local; controles de teclado y táctiles."] },
    { version: "3.0", title: "BRAVOVERSE expansion", changes: ["Nuevos módulos: PatchNotes, LostMedia, Credits, Meet_STBV, DUAL_GAMES y DUAL_TOOLKIT.", "Memorama y trivia interactivos; plantillas descargables.", "Aportaciones con permiso opcional de crédito; navegación agrupada."] },
    { version: "2.0", title: "Community Edition", changes: ["Seis módulos de comunidad y formularios para The Archive y Guestbook."] },
    { version: "1.0", title: "DUAL Edition", changes: ["Primera interfaz de escritorio retro, playlists y enlaces para compartir."] }
  ],
  lostMedia: [
    // { id: "unique-id", title: "Presentación buscada", description: "Fecha o contexto confirmado", status: "Buscando", url: "" }
  ],
  credits: [
    // Solo después de verificar el permiso: { alias: "DUAL", contribution: "Aportación aprobada", date: "2026-11-25", consent: true }
  ],
  members: [
    { id: "alejandro", name: "Alejandro", country: "Perú", accent: "#e6b6bd", image: "", bio: "", url: "" },
    { id: "drew", name: "Drew", country: "Estados Unidos / México", accent: "#bac8ed", image: "", bio: "", url: "" },
    { id: "gabi", name: "Gabi", country: "Puerto Rico", accent: "#e6d1a5", image: "", bio: "", url: "" },
    { id: "kaue", name: "Kauê", country: "Brasil", accent: "#c8dfa9", image: "", bio: "", url: "" },
    { id: "kenneth", name: "Kenneth", country: "México", accent: "#d9c2ec", image: "", bio: "", url: "" }
  ],
  memberSource: "https://www.universalmusic.com.br/2026/03/13/santos-bravos-da-hybe-latin-america-lanca-seu-ep-de-estreia-dual/",
  introductionUrl: "https://www.youtube.com/watch?v=Y5E-QBg5qzM",
  toolkit: [
    { title: "Registro de votaciones", description: "Plantilla CSV para registrar cifras, fechas y fuentes.", file: "assets/toolkit/votaciones.csv", type: "CSV" },
    { title: "Inventario de The Archive", description: "Plantilla para catalogar canciones, covers y enlaces.", file: "assets/toolkit/archive.csv", type: "CSV" },
    { title: "Ficha de contenido perdido", description: "Organiza pistas y fuentes de manera verificable.", file: "assets/toolkit/lost-media.txt", type: "TXT" },
    { title: "Playlist cover template", description: "Portada cuadrada retro editable; sin fotografías ajenas.", file: "assets/toolkit/cover-template.svg", type: "SVG" }
  ],
  // Pistas originales; audio opcional: fragmento autorizado en assets/audio/.
  songGame: [
    { title: "ORIGAMI", clues: ["Su título hace referencia a un arte japonés.", "Se puede practicar con una hoja de papel.", "Tiene una versión en colaboración con &TEAM.", "Empieza con O.", "Tiene siete letras."], audio: "" },
    { title: "KAWASAKI", clues: ["El título también es un apellido japonés.", "Comparte nombre con una marca de motocicletas.", "Tiene un remix con &TEAM.", "Empieza con K.", "Tiene ocho letras."], audio: "" },
    { title: "0%", aliases: ["cero por ciento", "zero percent", "0 percent", "0 por ciento"], clues: ["Su título no es una palabra convencional.", "Incluye un símbolo matemático.", "El símbolo se usa para proporciones.", "Se lanzó como sencillo en 2025.", "La cantidad indicada es ninguna."], audio: "" },
    { title: "WOW", clues: ["Su título es una expresión de sorpresa.", "Se escribe igual de izquierda a derecha que al revés.", "Tiene un video musical.", "Empieza con W.", "Tiene tres letras, dos de ellas iguales."], audio: "" },
    { title: "MHM", clues: ["Su título recuerda un sonido de asentimiento.", "No tiene vocales escritas.", "Cuenta con un visualizer.", "Empieza con M.", "Tiene tres letras y termina con M."], audio: "" },
    { title: "Ooh Laka Laka La", clues: ["El título parece un canto rítmico.", "Está formado por cuatro palabras.", "Dos palabras consecutivas se repiten.", "Empieza con Ooh.", "Termina con La."], audio: "" },
    { title: "Ella es el Hechizo", aliases: ["Ella es el Hechizo (De Hechizo: Bienvenidos a Hexe)"], clues: ["Su título está en español.", "Se relaciona con la magia.", "Tiene cuatro palabras.", "Empieza con Ella.", "La última palabra es sinónimo de encantamiento."], audio: "" }
  ],
  songGameSource: "https://music.apple.com/us/album/dual-ep/1882089352",
  arcade: {
    "lives": 3,
    "characters": [
      {
        "id": "red",
        "name": "Chaqueta roja",
        "run": "assets/games/sprites/red-run.jpg",
        "idle": "assets/games/sprites/red-idle.jpg"
      },
      {
        "id": "blue",
        "name": "Chaqueta azul",
        "run": "assets/games/sprites/blue-run.jpg",
        "idle": "assets/games/sprites/blue-idle.jpg"
      },
      {
        "id": "plaid",
        "name": "Cuadros azules",
        "run": "assets/games/sprites/plaid-run.jpg",
        "idle": "assets/games/sprites/plaid-idle.jpg"
      },
      {
        "id": "blond",
        "name": "Guante rojo",
        "run": "assets/games/sprites/blond-run.jpg",
        "idle": "assets/games/sprites/blond-idle.jpg"
      },
      {
        "id": "curly",
        "name": "Rizos",
        "run": "assets/games/sprites/curly-run.jpg",
        "idle": ""
      }
    ],
    "objectSheet": "assets/games/sprites/objects.jpg",
    "objects": [
      {
        "name": "Nota musical",
        "icon": "♫",
        "points": 10,
        "rect": [
          278,
          78,
          144,
          144
        ]
      },
      {
        "name": "Micrófono",
        "icon": "🎤",
        "points": 20,
        "rect": [
          418,
          78,
          144,
          144
        ]
      },
      {
        "name": "Lightstick",
        "icon": "🪄",
        "points": 30,
        "rect": [
          588,
          78,
          144,
          144
        ]
      },
      {
        "name": "Vinilo",
        "icon": "◉",
        "points": 15,
        "rect": [
          744,
          78,
          144,
          144
        ]
      },
      {
        "name": "Audífonos",
        "icon": "🎧",
        "points": 15,
        "rect": [
          903,
          78,
          144,
          144
        ]
      },
      {
        "name": "Cassette",
        "icon": "▣",
        "points": 15,
        "rect": [
          1063,
          78,
          144,
          144
        ]
      },
      {
        "name": "Origami",
        "icon": "◇",
        "points": 25,
        "rect": [
          1220,
          78,
          144,
          144
        ]
      },
      {
        "name": "Logo SB",
        "icon": "★",
        "points": 30,
        "rect": [
          1373,
          78,
          144,
          144
        ]
      },
      {
        "name": "Vida extra",
        "icon": "♥",
        "points": 0,
        "effect": "life",
        "rect": [
          1038,
          321,
          110,
          94
        ]
      },
      {
        "name": "Puntos ×2",
        "icon": "★",
        "points": 0,
        "effect": "double",
        "rect": [
          1159,
          321,
          110,
          94
        ]
      },
      {
        "name": "Ralentiza",
        "icon": "⌛",
        "points": 0,
        "effect": "slow",
        "rect": [
          1282,
          321,
          110,
          94
        ]
      },
      {
        "name": "Bonus",
        "icon": "◆",
        "points": 50,
        "effect": "bonus",
        "rect": [
          1414,
          321,
          110,
          94
        ]
      }
    ]
  },
  about: { title: "Hola, DUAL ♡", description: "STBV_OS — A little corner of the BRAVOVERSE. Built by a DUAL. Made for DUALS. From pre-debut to infinity. ♡ Un espacio fan-made para compartir música, recuerdos y creatividad.", socialUrl: "", socialLabel: "Mi cuenta de fan en X" }
};

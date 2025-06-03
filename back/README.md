# 🎧 Trivia Musical – Backend API

Este módulo contiene el backend de la aplicación **Trivia Musical**, desarrollado como parte del Congreso Nacional de Tendencias Computacionales (2025). Expone una API RESTful encargada de gestionar las partidas, almacenar los datos de usuario y consumir la API externa de Deezer para construir preguntas dinámicas.

---

## 🔌 Endpoints Disponibles

### 🎮 Iniciar Partida

`POST /trivia/game/start`

**Body:**

```json
{
  "playlistId": "ID_PLAYLIST" // Number (ID de la playlist)
}
```

**Respuesta:**

```json
{
  "sessionId": "ID_PARTIDA", //String (ID de la sesión)
  "questions": [
    {
      "trackId": "ID_CANCION", //Number (ID de la canción)
      "previewUrl": "URL_AUDIO", // String (Preview de la canción)
      "options": [
        {
        "id": "OPCION1", //Number (ID de la canción)
        "text": "Canción 1 - Artista 1" // String (Nombre y artista de la canción)
        },
        {
        "id": "OPCION2", //Number (ID de la canción)
        "text": "Canción 2 - Artista 2" // String (Nombre y artista de la canción)
        },
        ...
      ]
    }
  ]
}
```

### 📩 Enviar Respuestas

`POST /trivia/game/answer`

**Body:**

```json
{
  "sessionId": "ID_PARTIDA", //String (ID de la sesión)
  "answers": [
    {
      "questionId": "ID_PREGUNTA", //Number (ID de la canción correcta)
      "selectedOptionId": "ID_OPCION" //Number (ID de la canción de la opción seleccionada)
    }
  ]
}
```

**Respuesta:**

```json
{
  "success": true, // Booleano (true o false)
  "data": {
    "isComplete": false, // Booleano (true o false)
    "currentScore": "CURRENT_SCORE", //Number  (Puntaje actual)
    "correctAnswers": "CORRECT_ASNWERS", //Number (Preguntas correctas)
    "answeredQuestions": "ANSWERED_QUESTIONS", //Number (Preguntas respondidas)
    "totalQuestions": "TOTAL_QUESTIONS" //Number  (Número total de preguntas)
  }
}
```

### 📩 Enviar Respuestas

`GET /trivia/game/resume`

**Respuesta:**

```json
{
  "success": true, // Booleano (true o false)
  "data": {
    "sessionId": "ID_PARTIDA", //String (ID de la sesión)
    "playlistId": "ID_PLAYLIST", // Number (ID de la playlist)
    "totalQuestions": "TOTAL_QUESTIONS", //Number  (Número total de preguntas)
    "questions": [
        {
        "trackId": "ID_CANCION", //Number (ID de la canción)
        "previewUrl": "URL_AUDIO", // String (Preview de la canción)
        "options": [
            {
            "id": "OPCION1", //Number (ID de la canción)
            "text": "Canción 1 - Artista 1" // String (Nombre y artista de la canción)
            },
            {
            "id": "OPCION2", //Number (ID de la canción)
            "text": "Canción 2 - Artista 2" // String (Nombre y artista de la canción)
            },
            ...
        ]
        }
  ]
  }
}
```

## ⚙️ Configuración de Entorno

Crear un archivo `.env` en la raíz de `/front` con el siguiente contenido:

```env
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_PRIVATE_KEY_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_CLIENT_ID=
FIREBASE_ADMIN_AUTH_URI=
FIREBASE_ADMIN_TOKEN_URI=
FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_ADMIN_CLIENT_X509_CERT_URL=
```

### ▶️ Ejecución en Desarrollo

```bash
npm install
npm run dev

```

### 📁 Estructura del Proyecto

```text
/back
├── config/        # Configuración de Firebase
├── controllers/   # Lógica de endpoints
├── middlewares/   # Autenticación y manejo de errores
├── routes/        # Definición de rutas
├── schemas/       # Validaciones con Zod
└── services/
```

### 🧰 Tecnologías y Paquetes

- Express: Framework para servidor HTTP.
- Firebase Admin SDK: Autenticación y persistencia.
- Zod: Validación de estructuras de datos.

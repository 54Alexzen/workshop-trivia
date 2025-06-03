# 🎧 Trivia Musical – Backend API

Este módulo contiene el backend de la aplicación **Trivia Musical**, desarrollado como parte del Congreso Nacional de Tendencias Computacionales (2025). Expone una API RESTful encargada de gestionar las partidas, almacenar los datos de usuario y consumir la API externa de Deezer para construir preguntas dinámicas.

## 🔌 Endpoints Disponibles

A continuación se describen los endpoints que expone la API del backend. Estos permiten iniciar partidas, registrar respuestas de los usuarios, y reanudar sesiones previas.

### 🎮 Iniciar Partida

`POST /trivia/game/start`

**Body:**

```json
{
  "playlistId": 123456
}
```

**Tipos de datos:**

| Campo      | Tipo   | Descripción                |
| ---------- | ------ | -------------------------- |
| playlistId | Number | ID numérico de la playlist |

**Respuesta:**

```json
{
  "sessionId": "abc123",
  "questions": [
    {
      "trackId": 456789,
      "previewUrl": "https://audio.com/preview.mp3",
      "options": [
        {
          "id": 1,
          "text": "Canción 1 - Artista 1"
        },
        {
          "id": 2,
          "text": "Canción 2 - Artista 2"
        }
      ]
    }
  ]
}
```

**Tipos de datos:**

| Campo           | Tipo   | Descripción                               |
| --------------- | ------ | ----------------------------------------- |
| sessionId       | String | ID de la sesión generada                  |
| trackId         | Number | ID de la canción                          |
| previewUrl      | String | URL del fragmento de audio                |
| id (en options) | Number | ID numérico de la canción en las opciones |
| text            | String | Nombre y artista de la canción            |

### 📩 Enviar Respuestas

`POST /trivia/game/answer`

**Body:**

```json
{
  "sessionId": "abc123",
  "answers": [
    {
      "questionId": 456789,
      "selectedOptionId": 1
    }
  ]
}
```

**Tipos de datos:**

| Campo            | Tipo   | Descripción                          |
| ---------------- | ------ | ------------------------------------ |
| sessionId        | String | ID de la sesión                      |
| questionId       | Number | ID de la pregunta (track) respondida |
| selectedOptionId | Number | ID de la opción seleccionada         |

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "isComplete": false,
    "currentScore": 600,
    "correctAnswers": 3,
    "answeredQuestions": 4,
    "totalQuestions": 10
  }
}
```

**Tipos de datos:**

| Campo             | Tipo    | Descripción                        |
| ----------------- | ------- | ---------------------------------- |
| success           | Boolean | Indica si la operación fue exitosa |
| isComplete        | Boolean | Indica si la trivia fue completada |
| currentScore      | Number  | Puntaje actual del usuario         |
| correctAnswers    | Number  | Número de respuestas correctas     |
| answeredQuestions | Number  | Total de preguntas respondidas     |
| totalQuestions    | Number  | Número total de preguntas          |

### 📩 Enviar Respuestas

`GET /trivia/game/resume`

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "sessionId": "abc123",
    "playlistId": 123456,
    "totalQuestions": 10,
    "questions": [
      {
        "trackId": 789012,
        "previewUrl": "https://audio.com/preview2.mp3",
        "options": [
          {
            "id": 3,
            "text": "Canción 3 - Artista 3"
          },
          {
            "id": 4,
            "text": "Canción 4 - Artista 4"
          }
        ]
      }
    ]
  }
}
```

**Tipos de datos:**

| Campo           | Tipo   | Descripción                    |
| --------------- | ------ | ------------------------------ |
| sessionId       | String | ID de la sesión                |
| playlistId      | Number | ID numérico de la playlist     |
| totalQuestions  | Number | Número total de preguntas      |
| trackId         | Number | ID de la canción               |
| previewUrl      | String | Enlace de preview del audio    |
| id (en options) | Number | ID de la canción en la opción  |
| text            | String | Nombre y artista de la canción |

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

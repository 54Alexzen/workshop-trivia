# 🎵 Trivia Musical – Frontend

Este módulo representa la interfaz de usuario del sistema **Trivia Musical**, diseñada para interactuar con Firebase Authentication y permitir el inicio de sesión del usuario. Una vez autenticado, el frontend obtiene el token de acceso que puede ser usado para autenticar peticiones al backend.

---

## 👨‍💻 Funcionalidad Actual

- Botón de login/logout conectado con Firebase Auth.
- Visualización de datos del usuario autenticado.
- Preparado para extender con lógica de juego y consumo de la API backend.

## ⚙️ Configuración de Entorno

Crear un archivo `.env` en la raíz de `/front` con el siguiente contenido:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 1. Ejecución en Desarrollo

```bash
npm install
npm run dev

```

### 2. Estructura del Proyecto

```text
/front
├── src/
│   ├── config/
│   │   ├── environments.ts
│   │   └── firebase.ts
│   └── App.tsx
│   └── index.css
│   └── main.tsx
├── public/
└── package.json
```

### 3. 🧰 Tecnologías y Paquetes

- React (con Vite): SPA moderna.
- Firebase JS SDK: Autenticación.
- Tailwind CSS V4
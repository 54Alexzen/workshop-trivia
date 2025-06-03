# 🎵 Trivia Musical

**Congreso Nacional de Tendencias Computacionales (2025)**

Proyecto desarrollado para el **Congreso Nacional de Tendencias Computacionales 2025**, orientado en el desarrollo web Y móvil, arquitectura cliente-servidor, y consumo de APIs externas. La aplicación consiste en una trivia musical interactiva que permite a los usuarios adivinar canciones basadas en previews obtenidos desde **Deezer**, registrar sus resultados y con toda la infraestructura autenticada y persistida vía **Firebase**.

## 🎯 Propósito General

Este proyecto busca demostrar cómo construir un sistema completo de trivia musical que combine:

- Backend con arquitectura RESTful y validación robusta.
- Frontend para obtner token de autenticación.
- Integración eficiente con servicios externos (Deezer) y plataformas en la nube (Firebase).
- Técnicas modernas de almacenamiento en caché y autenticación segura.

## 🧩 Estructura del Proyecto

```text
/workshop-trivia
├── /front    # Interfaz de usuario (cliente web)
└── /back     # API RESTful y servicios backend
```

## 🚀 Características Técnicas

### 🔁 Integración externa

- Consumo de la API pública de **Deezer** para obtener previews de canciones por playlist.
- Datos musicales cacheados en **Firebase Firestore** para evitar peticiones redundantes.

### 🔐 Seguridad

- Autenticación y autorización mediante **Firebase Auth**.
- Restricción a una sola partida activa por usuario.
- Sesiones de juego con expiración automática.

### 🧠 Validación

- Validación robusta de datos usando **Zod**.
- Gestión de errores controlada tanto en frontend como backend.

### 🎮 Funcionalidad

- Juego de trivia basado en múltiples opciones.
- Vista previa de canciones.
- Cálculo de puntaje e historial de usuario.

## 🛠 Instalación y Ejecución

### Clona el repositorio

```bash
git clone https://github.com/54Alexzen/workshop-trivia.git
cd workshop-trivia
```

## 👨🏻‍💻Author
- [@54Alexzen](https://github.com/54Alexzen)
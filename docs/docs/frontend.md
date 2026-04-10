---
sidebar_position: 4
---

# Frontend (Interfaz Web)

El Frontend está ubicado en la carpeta `frontend/`. Utiliza **React** para la interactividad, **Tailwind CSS** para un diseño moderno y responsivo, y **Vite** como empaquetador ultrarrápido.

## Pantallas (Componentes)

La carpeta `src/components/` contiene las pantallas principales que ve el usuario:

**`Login.jsx` / `Register.jsx`**: Formularios de acceso. Al autenticarse con éxito, guardan un token temporal en el navegador (`localStorage`) para mantener la sesión abierta.
**`App.jsx`**: Es el enrutador principal. Incluye una lógica de **"Ruta Protegida"** que expulsa a la pantalla de Login a cualquier visitante que intente entrar sin estar registrado.
**`Dashboard.jsx`**: El panel de control principal, donde se muestra un resumen general.
**`Devices.jsx`**: Permite al usuario dar de alta sus tablas/dispositivos mediante su ID para empezar a rastrearlos.
**`Missions.jsx`**: La interfaz donde el usuario crea las reglas espaciales (Geofence) indicando los límites geográficos permitidos para un dispositivo.

## Comunicación con la API
El archivo **`api.js`** encapsula la lógica para hablar con el Backend. Se encarga de adjuntar automáticamente el token de seguridad en cada petición (GET, POST, PUT, DELETE) para que el servidor Node.js reconozca qué usuario está realizando la acción.
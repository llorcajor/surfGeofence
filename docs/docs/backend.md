---
sidebar_position: 3
---

# Backend y Lógica de Servidor

El Backend se encuentra en la carpeta `backend/` y es el encargado de procesar la lógica de negocio y la seguridad. 

## Archivos Principales

**`index.js`**: Es el punto de entrada. Aquí se arranca el servidor web, se conecta a la base de datos MongoDB y se establece la conexión MQTT para escuchar a los dispositivos físicos.
**`middleware/auth.js`**: Protege las rutas. Antes de permitir que alguien vea o modifique un dispositivo, este archivo verifica que el usuario envíe un **Token JWT** válido (demostrando que ha iniciado sesión).

## Modelos (Base de Datos)
En la carpeta `models/` definimos la estructura de la información:
**`User.js`**: Almacena a los usuarios y sus contraseñas (encriptadas con la librería `bcrypt`).
**`Device.js`**: Representa los rastreadores físicos. Guarda su identificador único, estado y última ubicación.
**`Mission.js`**: Define las áreas geográficas ("Geofences"). Establece los límites virtuales de dónde puede navegar la tabla de surf.

## Rutas (API REST)
La carpeta `routes/` agrupa las funciones disponibles para el Frontend:
**`/auth`**: Iniciar sesión y registrar cuentas.
**`/devices`**: Ver, añadir o eliminar dispositivos asociados a una cuenta.
**`/missions`**: Configurar, modificar o eliminar las misiones/zonas seguras.
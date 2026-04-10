---
sidebar_position: 2
---

# Arquitectura del Sistema

El sistema **SurfGeofence** está construido sobre una arquitectura moderna, separando claramente la interfaz gráfica de la lógica del servidor.

## Esquema General

1. **Frontend (React + Vite):** Es la cara visible de la aplicación. Los usuarios interactúan aquí para ver sus dispositivos, crear misiones y revisar alertas en el mapa.
2. **Backend (Node.js + Express):** Es el cerebro central. Procesa las peticiones HTTP del Frontend, gestiona la autenticación y coordina los datos.
3. **Broker MQTT (Mosquitto):** Es el "cartero" de los mensajes IoT. Los dispositivos físicos (por ejemplo, módulos GPS) publican sus coordenadas en este broker mediante un protocolo ultraligero.
4. **Base de Datos (MongoDB):** Almacena de forma persistente los usuarios, los dispositivos registrados y las áreas geográficas (misiones).

### Flujo de Datos
- **Usuario ↔ Frontend:** Comunicación visual a través del navegador.
- **Frontend ↔ Backend:** Intercambio de datos JSON a través de una API REST.
- **Backend ↔ MongoDB:** Consultas directas mediante el ODM Mongoose.
- **Dispositivo IoT → Mosquitto → Backend:** El dispositivo envía su GPS a Mosquitto; el Backend está *suscrito* a Mosquitto, recibe la ubicación en tiempo real y evalúa si ha salido de la zona segura.
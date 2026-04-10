---
sidebar_position: 5
---

# Despliegue con Docker

Para garantizar que **SurfGeofence** funcione exactamente igual en cualquier ordenador (ya sea en desarrollo o en un servidor de producción), utilizamos **Docker**.

## Orquestación (`docker-compose.yml`)

El archivo `docker-compose.yml` define y conecta automáticamente cuatro contenedores o "servicios":

1. **mongodb:** Descarga una imagen oficial de MongoDB para levantar la base de datos de forma limpia.
2. **mosquitto:** Levanta el broker MQTT (Eclipse Mosquitto) usando la configuración de `mosquitto/config/mosquitto.conf`.
3. **backend:** Lee el `Dockerfile` de la carpeta backend, instala las librerías de Node y arranca la API. Se conecta internamente a MongoDB y a Mosquitto.
4. **frontend:** Levanta el entorno de React para servir la web en tu navegador.

## ¿Cómo iniciar la plataforma?

Gracias a esta configuración, no necesitas instalar Node ni MongoDB en tu ordenador físico. Simplemente abre una terminal en la raíz del proyecto y ejecuta:

```bash
docker-compose up --build
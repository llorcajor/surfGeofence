import express from "express";
import mongoose from "mongoose";
import mqtt from "mqtt";
import cors from "cors"; // NUEVO
import authRoutes from "./routes/auth.js"; // NUEVO
import deviceRoutes from "./routes/devices.js"; // <--- AÑADIR ESTO
import missionRoutes from "./routes/missions.js";

const app = express();
const port = 3000;

// --- MIDDLEWARES ---
app.use(cors()); // NUEVO: Permite conexión desde React
app.use(express.json()); // NUEVO: Permite leer datos JSON del login

// 1. Conectar a MongoDB
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/surf_geofence";
mongoose
  .connect(mongoUri)
  .then(() => console.log("🟢 Conectado a MongoDB con éxito"))
  .catch((err) => console.error("🔴 Error conectando a MongoDB:", err));

// 2. Conectar a Mosquitto MQTT (Tu código actual)
const mqttBroker = process.env.MQTT_BROKER || "mqtt://localhost:1883";
const mqttClient = mqtt.connect(mqttBroker);

mqttClient.on("connect", () => {
  console.log("🔵 Conectado a Mosquitto MQTT");
  mqttClient.subscribe("surf/test");
});

mqttClient.on("message", (topic, message) => {
  console.log(`📩 Nuevo mensaje en [${topic}]: ${message.toString()}`);
});

// 3. RUTAS
app.use("/api/auth", authRoutes); // NUEVO: Activa el Login y Registro
app.use("/api/devices", deviceRoutes); // <--- AÑADIR ESTO: Ahora responde en /api/devices
app.use("/api/missions", missionRoutes);

app.get("/", (req, res) => {
  res.send("¡Backend de Surf Geofence funcionando al 100%!");
});

// Arrancar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor backend escuchando en el puerto ${port}`);
});

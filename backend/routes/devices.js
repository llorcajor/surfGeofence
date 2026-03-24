import express from "express";
import Device from "../models/Device.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREAR DISPOSITIVO (Ruta Protegida)
/*
router.post("/", verifyToken, async (req, res) => {
  try {
    const { serialNumber, name, model } = req.body;

    // Verificar si el número de serie ya existe (es único)
    const existingDevice = await Device.findOne({ serialNumber });
    if (existingDevice)
      return res.status(400).json({ error: "El número de serie ya existe" });

    const newDevice = new Device({
      serialNumber,
      name,
      model,
      owner: req.userId, // El ID viene del middleware verifyToken
    });

    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el dispositivo" });
  }
});
*/

// En routes/devices.js
router.post("/", verifyToken, async (req, res) => {
  try {
    const { serialNumber, name, model } = req.body;
    console.log("Datos recibidos:", {
      serialNumber,
      name,
      model,
      owner: req.userId,
    });

    const newDevice = new Device({
      serialNumber,
      name,
      model,
      owner: req.userId,
    });

    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    console.error("ERROR EN EL BACKEND:", error.message); // <--- ESTO APARECERÁ EN TU TERMINAL DOCKER
    res.status(500).json({ error: error.message });
  }
});
// OBTENER MIS DISPOSITIVOS
router.get("/", verifyToken, async (req, res) => {
  try {
    const devices = await Device.find({ owner: req.userId });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener dispositivos" });
  }
});

export default router;

import express from "express";
import Mission from "../models/Mission.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREAR MISIÓN
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, deviceIds } = req.body; // deviceIds debe ser un array de IDs

    const newMission = new Mission({
      name,
      devices: deviceIds,
      owner: req.userId,
    });

    await newMission.save();
    res.status(201).json(newMission);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la misión" });
  }
});

// OBTENER MIS MISIONES
router.get("/", verifyToken, async (req, res) => {
  try {
    // .populate('devices') sirve para que en lugar de solo ver IDs,
    // MongoDB nos traiga toda la info del dispositivo
    const missions = await Mission.find({ owner: req.userId }).populate(
      "devices",
    );
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener misiones" });
  }
});

export default router;

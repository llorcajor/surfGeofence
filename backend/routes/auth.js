import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar al usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "El correo no está registrado" });
    }

    // 2. Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // 3. Crear el Token (el "carnet de identidad" digital)
    // Cambia 'TU_FIRMA_SECRETA' por una palabra difícil de adivinar
    const token = jwt.sign({ id: user._id }, "TU_FIRMA_SECRETA", {
      expiresIn: "24h",
    });

    res.json({
      message: "¡Login exitoso!",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor al intentar loguear" });
  }
});

export default router;

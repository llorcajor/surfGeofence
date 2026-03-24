import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, "TU_FIRMA_SECRETA");
    req.userId = decoded.id; // Guardamos el ID del usuario en la petición
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};

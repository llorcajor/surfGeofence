import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

// --- COMPONENTE DE PROTECCIÓN ---
// Si no hay token en localStorage, redirige al login automáticamente
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta Protegida: El Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta para capturar errores 404 (Opcional) */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center font-bold">
              404 - Página no encontrada
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from "react";
import axios from "axios";
import { Mail, Lock, UserPlus, Zap } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
      );
      setStatus({ type: "success", msg: res.data.message });
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.error || "Error al registrar",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Panel Izquierdo: Formulario */}
      <div className="flex flex-col justify-center flex-1 px-8 py-12 lg:w-1/2">
        <div className="w-full max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-green-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">DevSync</span>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Empieza a construir tu próximo gran proyecto hoy mismo.
          </p>

          <form onSubmit={handleRegister} className="mt-10 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                className="block w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                required
                className="block w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {status.msg && (
              <p
                className={`text-sm font-medium ${status.type === "success" ? "text-green-600" : "text-red-600"}`}
              >
                {status.msg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              REGISTRARSE
            </button>
          </form>
        </div>
      </div>

      {/* Panel Derecho: Visual */}
      <div className="hidden lg:flex lg:flex-1 bg-green-600 items-center justify-center p-12 text-white">
        <div className="max-w-md text-center">
          <UserPlus className="w-20 h-20 mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl font-bold">Únete a la comunidad</h1>
          <p className="mt-4 text-lg text-green-100">
            Crea una cuenta para guardar tus configuraciones y acceder desde
            cualquier lugar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

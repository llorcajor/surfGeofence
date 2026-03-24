import { useEffect, useState } from "react";
import api from "../api";
import Devices from "./Devices"; // Lo crearemos ahora
import Missions from "./Missions"; // Lo crearemos ahora
import { Tablet, Rocket, Loader2, Cpu } from "lucide-react";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [missions, setMissions] = useState([]);
  const [view, setView] = useState("devices");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [devRes, missRes] = await Promise.all([
        api.get("/devices"),
        api.get("/missions"),
      ]);
      setDevices(devRes.data);
      setMissions(missRes.data);
    } catch (err) {
      console.error("Error cargando datos", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10 text-blue-600 font-bold text-2xl">
          <Cpu className="w-8 h-8" />
          <span>SurfGeo</span>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => setView("devices")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${view === "devices" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Tablet size={20} /> Dispositivos
          </button>
          <button
            onClick={() => setView("missions")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${view === "missions" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Rocket size={20} /> Misiones
          </button>
        </nav>
      </aside>

      {/* --- CONTENIDO DINÁMICO --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 capitalize">
            {view === "devices"
              ? "Gestión de Dispositivos"
              : "Panel de Misiones"}
          </h1>
        </header>

        {view === "devices" ? (
          <Devices devices={devices} onRefresh={fetchData} />
        ) : (
          <Missions
            devices={devices}
            missions={missions}
            onRefresh={fetchData}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;

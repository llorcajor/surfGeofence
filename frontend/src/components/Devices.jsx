import { useState } from "react";
import api from "../api";
import { Plus, Tablet } from "lucide-react";

const Devices = ({ devices, onRefresh }) => {
  const [newDevice, setNewDevice] = useState({
    serialNumber: "",
    name: "",
    model: "",
  });

  const handleCreateDevice = async (e) => {
    e.preventDefault();
    try {
      await api.post("/devices", newDevice);
      setNewDevice({ serialNumber: "", name: "", model: "" });
      onRefresh(); // Llamamos a la función del padre para actualizar la lista
      alert("¡Dispositivo vinculado!");
    } catch (err) {
      alert(err.response?.data?.error || "Error al crear");
    }
  };

  return (
    <div className="space-y-10">
      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Registrar Equipo
        </h2>
        <form
          onSubmit={handleCreateDevice}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <input
            required
            className="border p-2.5 rounded-xl"
            placeholder="S/N"
            value={newDevice.serialNumber}
            onChange={(e) =>
              setNewDevice({ ...newDevice, serialNumber: e.target.value })
            }
          />
          <input
            required
            className="border p-2.5 rounded-xl"
            placeholder="Nombre"
            value={newDevice.name}
            onChange={(e) =>
              setNewDevice({ ...newDevice, name: e.target.value })
            }
          />
          <input
            required
            className="border p-2.5 rounded-xl"
            placeholder="Modelo"
            value={newDevice.model}
            onChange={(e) =>
              setNewDevice({ ...newDevice, model: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2.5 rounded-xl font-bold flex justify-center items-center gap-2"
          >
            <Plus size={20} />
            Añadir
          </button>
        </form>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((dev) => (
          <div
            key={dev._id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group"
          >
            <div className="flex justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                <Tablet size={24} />
              </div>
              <span className="text-[10px] text-gray-400 font-black uppercase">
                {dev.serialNumber}
              </span>
            </div>
            <h3 className="text-xl font-bold">{dev.name}</h3>
            <p className="text-sm text-gray-500">{dev.model}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;

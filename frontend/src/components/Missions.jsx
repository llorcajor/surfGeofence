import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  useMapEvents,
  Marker,
} from "react-leaflet";
import api from "../api";
import { Rocket, Trash2 } from "lucide-react";
import L from "leaflet";

const MapClickHandler = ({ onAddPoint }) => {
  useMapEvents({ click: (e) => onAddPoint([e.latlng.lat, e.latlng.lng]) });
  return null;
};

const Missions = ({ devices, onRefresh }) => {
  const [missionName, setMissionName] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [points, setPoints] = useState([]);

  const handleSave = async () => {
    if (points.length < 3) return alert("Dibuja un área en el mapa");
    try {
      await api.post("/missions", {
        name: missionName,
        deviceIds: selectedDevices,
        geofence: { type: "Polygon", coordinates: points },
      });
      setPoints([]);
      setMissionName("");
      onRefresh();
      alert("Misión guardada");
    } catch (err) {
      alert("Error al guardar");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-125">
      <div className="w-full lg:w-80 bg-white p-6 rounded-2xl border flex flex-col gap-4 overflow-y-auto">
        <h2 className="font-bold flex items-center gap-2">
          <Rocket size={20} /> Nueva Misión
        </h2>
        <input
          className="border p-2 rounded-lg"
          placeholder="Nombre..."
          value={missionName}
          onChange={(e) => setMissionName(e.target.value)}
        />
        <div className="flex-1 overflow-y-auto">
          <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
            Asignar Equipos
          </p>
          {devices.map((dev) => (
            <label
              key={dev._id}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <input
                type="checkbox"
                onChange={(e) =>
                  e.target.checked
                    ? setSelectedDevices([...selectedDevices, dev._id])
                    : setSelectedDevices(
                        selectedDevices.filter((id) => id !== dev._id),
                      )
                }
              />
              <span className="text-sm">{dev.name}</span>
            </label>
          ))}
        </div>
        <button
          onClick={() => setPoints([])}
          className="text-red-500 text-xs font-bold"
        >
          LIMPIAR PUNTOS
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700"
        >
          GUARDAR
        </button>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden border">
        <MapContainer
          center={[40.4167, -3.7033]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler onAddPoint={(p) => setPoints([...points, p])} />
          {points.length > 0 && (
            <Polygon positions={points} pathOptions={{ color: "blue" }} />
          )}
          {points.map((p, i) => (
            <Marker key={i} position={p} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Missions;

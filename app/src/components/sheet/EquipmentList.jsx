import React from 'react';

const SheetEquipment = ({ equipment, handleEquipmentChange }) => {
  const equipmentKeys = Object.keys(equipment);

  // Função auxiliar para converter booleano para "Sim"/"Não"
  const booleanToString = (value) => value ? "Sim" : "Não";

  return (
    <div className="bg-slate-950 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Equipamentos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {equipmentKeys.map((key) => (
          <div key={key} className="bg-slate-900 p-4 rounded-lg">
            <h4 className="text-xl font-bold mb-3 text-white">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h4>
            <div className="space-y-4">
              {Object.keys(equipment[key]).map((subKey) => (
                <div key={subKey}>
                  <label htmlFor={`${key}-${subKey}`} className="block text-sm font-semibold mb-1 text-teal-400">
                    {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                  </label>
                  {subKey === 'inaptidao' ? (
                    <select
                      id={`${key}-${subKey}`}
                      value={booleanToString(equipment[key][subKey])}
                      onChange={(e) => handleEquipmentChange(key, subKey, e.target.value === "Sim")}
                      className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      id={`${key}-${subKey}`}
                      value={equipment[key][subKey]}
                      onChange={(e) => handleEquipmentChange(key, subKey, e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SheetEquipment;
import React from 'react';

const SheetParameters = ({ parameters, handleParameterChange }) => {
  return (
    <div className="bg-slate-950 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Parâmetros</h3>
      <div className="grid grid-cols-2 gap-4 text-teal-400">
        {Object.keys(parameters).map((key) => (
          <label key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            <input
              type="number"
              value={parameters[key] ?? 0}
              onChange={(e) => handleParameterChange(key, e.target.value)}
              className="mt-1 p-1 rounded bg-slate-700 text-white"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default SheetParameters;
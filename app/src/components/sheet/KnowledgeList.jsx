import React from 'react';

const SheetKnowledge = ({ knowledge, handleKnowledgeChange }) => {
  const knowledgeKeys = Object.keys(knowledge);

  return (
    <div className="bg-slate-950 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Conhecimentos</h3>
      <div className="grid grid-cols-2 gap-4 text-teal-400" >
        {knowledgeKeys.map((key, index) => (
          <label key={key} className={index === knowledgeKeys.length - 1 ? "col-span-2" : ""}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            {index === knowledgeKeys.length - 1 ? (
              <input
                type="text"
                value={knowledge[key] ?? ""}
                onChange={(e) => handleKnowledgeChange(key, e.target.value)}
                className="mt-1 p-1 rounded bg-slate-700 text-white w-full"
              />
            ) : (
              <input
                type="number"
                value={knowledge[key] ?? 0}
                onChange={(e) => handleKnowledgeChange(key, Number(e.target.value))}
                className="mt-1 p-1 rounded bg-slate-700 text-white"
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SheetKnowledge;
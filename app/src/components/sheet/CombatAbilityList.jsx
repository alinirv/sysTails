import React, { useState } from 'react';

const CombatPathSkills = ({ skills, handleSkillChange, handleAddSkill, handleDeleteSkill }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    nome: '',
    custoPE: '',
    acao: '',
    tipo: '',
    duracao: '',
    descricao: ''
  });
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewSkill({
      nome: '',
      custoPE: '',
      acao: '',
      tipo: '',
      duracao: '',
      descricao: ''
    });
  };
  // lida com a mudança de um campo em um novo objeto de habilidade
  const handleNewSkillChange = (field, value) => {
    setNewSkill((prevSkill) => ({ ...prevSkill, [field]: value }));
  };
  //adicionar uma nova habilidade
  const addSkill = () => {
    handleAddSkill(newSkill);
    closeModal();
  };

  return (
    <div className="bg-slate-950 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Habilidades de Caminho de Combate</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="bg-slate-900 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xl font-bold text-white">{skill.nome}</h4>
              <button
                onClick={() => handleDeleteSkill(index)}
                className="text-red-500 hover:text-red-400 transition duration-200"
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['custoPE', 'acao', 'tipo', 'duracao'].map((field) => (
                <div key={field}>
                  <label htmlFor={`${field}${index}`} className="block text-sm font-semibold mb-1 text-teal-400">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={`${field}${index}`}
                    value={skill[field] || ''}
                    onChange={(e) => handleSkillChange(index, field, e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor={`descricao${index}`} className="block text-sm font-semibold mb-1 text-teal-400">
                Descrição
              </label>
              <textarea
                id={`descricao${index}`}
                value={skill.descricao || ''}
                onChange={(e) => handleSkillChange(index, 'descricao', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                rows="3"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={openModal}
        className="mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
      >
        Adicionar Nova Habilidade
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-950 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-teal-500">Nova Habilidade</h3>
            {['nome', 'custoPE', 'acao', 'tipo', 'duracao', 'descricao'].map((field) => (
              <div key={field} className="mb-4">
                <label htmlFor={`new-${field}`} className="block text-sm font-semibold mb-1 text-teal-400">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === 'descricao' ? (
                  <textarea
                    id={`new-${field}`}
                    value={newSkill[field]}
                    onChange={(e) => handleNewSkillChange(field, e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                    rows="3"
                  />
                ) : (
                  <input
                    type="text"
                    id={`new-${field}`}
                    value={newSkill[field]}
                    onChange={(e) => handleNewSkillChange(field, e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end mt-6">
              <button
                onClick={addSkill}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Adicionar
              </button>
              <button
                onClick={closeModal}
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombatPathSkills;
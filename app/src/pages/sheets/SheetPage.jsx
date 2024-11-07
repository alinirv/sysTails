import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Navibar from '../../components/header/Navibar';
import Footer from '../../components/footer/Footer';
import SheetParameters from '../../components/sheet/ParameterList';
import SheetKnowledge from '../../components/sheet/KnowledgeList';
import SheetEquipment from '../../components/sheet/EquipmentList';
import SheetInventory from '../../components/sheet/InventoryList';
import CombatPathSkills from '../../components/sheet/CombatAbilityList';

function SheetPage() {
  const [sheet, setSheet] = useState(null);
  const [temporaryLife, setTemporaryLife] = useState(0);
  const [temporaryEnergy, setTemporaryEnergy] = useState(0);
  const { idParam } = useParams();

  useEffect(() => {
    const fetchSheet = async () => {
      try {
        const { data } = await api.get(`/sheet/find/${idParam}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(data);
        setSheet(data);
      } catch (error) {
        console.error('Erro ao carregar ficha:', error);
      }
    };

    fetchSheet();
  }, [idParam]);

  // calcula os pontos de vida e energia com base em parâmetros fornecidos
  const calculatePoints = (pda, vigor, pointsLife, pointsEnergy) => {
    const lifePoints = pointsLife + 3 + vigor;
    const energyPoints = pointsEnergy + 1;
    return { lifePoints, energyPoints };
  };
  // trata a mudança de um parâmetro, atualizando o estado da ficha
  const handleParameterChange = (param, value) => {
    setSheet((prevSheet) => {
      const newParameters = {
        ...prevSheet.parameters,
        [param]: Number(value),
      };

      const { lifePoints, energyPoints } = calculatePoints(
        prevSheet.pda,
        param === 'vigor' ? Number(value) : prevSheet.parameters.vigor,
        param === 'pointsLifeMax' ? Number(value) : prevSheet.pointsLifeMax,
        param === 'pointsEnergy' ? Number(value) : prevSheet.pointsEnergy,

      );

      return {
        ...prevSheet,
        parameters: newParameters,
        pointsLifeMax: lifePoints,
        pointsEnergy: energyPoints,
      };
    });

  };
  // trata a mudança de um conhecimento, atualizando o estado da ficha
  const handleKnowledgeChange = (key, value) => {
    setSheet((prevSheet) => ({
      ...prevSheet,
      knowledge: {
        ...prevSheet.knowledge,
        [key]: value,
      },
    }));
  };
  // trata a mudança de um equipamento, atualizando o estado da ficha
  const handleEquipmentChange = (type, field, value) => {
    setSheet((prevSheet) => ({
      ...prevSheet,
      equipment: {
        ...prevSheet.equipment,
        [type]: {
          ...prevSheet.equipment[type],
          [field]: value,
        },
      },
    }));
  };
  // trata a mudança dp inventario, atualizando o estado da ficha
  const handleInventoryChange = (field, value) => {
    setSheet(prevSheet => ({
      ...prevSheet,
      inventory: {
        ...prevSheet.inventory,
        [field]: value
      }
    }));
  };
  // adiciona  uma nova habilidade de combate
  const handleAddSkill = async (newSkill) => {
    try {
      setSheet(prevSheet => ({
        ...prevSheet,
        skill: [...prevSheet.skill, newSkill]
      }));

      // Atualizar no backend
      // await api.put(`/sheet/update/${idParam}`, {
      //   skill: [...sheet.skill, newSkill]
      // }, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // });
    } catch (error) {
      console.error('Erro ao adicionar habilidade:', error);
    }
  };
  // trata a mudança de habilidade de combate, atualizando o estado da ficha
  const handleSkillChange = (index, field, value) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };
      return updatedSkills;
    });
  };
  // trata a mudança do PDA, atualizando os pontos máximo de vida e energia
  const handlePdaChange = (value) => {
    const newPda = Number(value);
    // Verifica se o novo PDA é maior ou igual ao atual
    setSheet((prevSheet) => {
      if (newPda >= prevSheet.pda) {
        const { lifePoints, energyPoints } = calculatePoints(newPda, prevSheet.parameters.vigor, prevSheet.pointsLifeMax, prevSheet.pointsEnergy);

        return {
          ...prevSheet,
          pda: newPda,
          pointsLifeMax: lifePoints,
          pointsEnergy: energyPoints,
        };
      }
      // Se o novo PDA for menor, não faz nada
      return prevSheet;
    });
  };
  // atualiza os pontos de vida
  const handleLifePointsChange = (value, type) => {
    const numValue = Number(value);
    if (type === 'Atual') {
      setSheet(prevSheet => ({
        ...prevSheet,
        pointsLife: Math.min(Math.max(0, numValue), prevSheet.pointsLifeMax)
      }));
    } else if (type === 'Temporários') {
      setTemporaryLife(Math.max(0, numValue));
    }
  };
  //atualiza os pontos de energia
  const handleEnergyPointsChange = (value, type) => {
    const numValue = Number(value);
    if (type === 'Atual') {
      setSheet(prevSheet => ({
        ...prevSheet,
        pointsEnergy: Math.min(Math.max(0, numValue), prevSheet.pointsEnergy)
      }));
    } else if (type === 'Temporários') {
      setTemporaryEnergy(Math.max(0, numValue));
    }
  };
  // deleta uma habilidade de combate
  const handleDeleteSkill = (index) => {
    setSheet(prevSheet => ({
      ...prevSheet,
      skill: prevSheet.skill.filter((_, i) => i !== index)
    }));
  };

  if (!sheet) return <div>Carregando...</div>;

  return (
    <div>
      <Navibar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700 py-10">
        <div className="bg-slate-950 text-white max-w-screen-lg w-full items-center px-4 py-6 rounded-lg">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {['Jogador', 'Personagem', 'Legado', 'PDA'].map((label) => (
              <div key={label} className="bg-slate-900 p-4 rounded-lg">
                <h4 className="text-xl font-bold mb-2 text-teal-400">{label}</h4>
                {label === 'PDA' ? (
                  <input
                    type='number'
                    className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                    value={sheet.pda}
                    onChange={(e) => handlePdaChange(e.target.value)}
                  />
                ) : (
                  <input
                    type='text'
                    className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                    value={
                      label === 'Jogador' ? sheet.player :
                        label === 'Personagem' ? sheet.character.nome :
                          sheet.character.legado
                    }
                    readOnly

                  />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Pontos de Vida */}
            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-xl font-bold mb-4 text-white">Pontos de Vida</h4>
              <div className="grid grid-cols-3 gap-4">
                {['Máximo', 'Atual', 'Temporários'].map((label) => (
                  <div key={label} className="space-y-1">
                    <label className="block text-sm font-semibold text-teal-400">
                      {label}
                    </label>
                    <input
                      type="number"
                      className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                      value={
                        label === 'Máximo' ? sheet.pointsLifeMax :
                          label === 'Atual' ? sheet.pointsLife :
                            temporaryLife
                      }
                      onChange={(e) => handleLifePointsChange(e.target.value, label)}
                      readOnly={label === 'Máximo'}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Pontos de Energia */}
            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-xl font-bold mb-4 text-white">Pontos de Energia</h4>
              <div className="grid grid-cols-3 gap-4">
                {['Máximo ', 'Atual', 'Temporários'].map((label) => (
                  <div key={label} className="space-y-1">
                    <label className="block text-sm font-semibold text-teal-400">
                      {label}
                    </label>
                    <input
                      type="number"
                      className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                      value={
                        label === 'Máximo' ? sheet.pointsEnergy :
                          label === 'Atual' ? sheet.pointsEnergy :
                            temporaryEnergy
                      }
                      onChange={(e) => handleEnergyPointsChange(e.target.value, label)}
                      readOnly={label === 'Máximo'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Movimento/Bloqueio e Habilidades de Legado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-xl font-bold mb-4 text-white">Movimentação e Bloqueio</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <label class="block text-sm font-semibold text-teal-400">Movimento</label>
                  <input
                    type='number'
                    className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                    value={sheet.movement}
                  />
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <label class="block text-sm font-semibold text-teal-400">Bloqueio</label>
                  <input
                    type='number'
                    className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                    value={sheet.block}
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-xl font-bold mb-4 text-white">Habilidades de Legado</h4>
              <div className="space-y-2">
                {sheet.character.habilidadesLegado.map((habilidade, index) => (
                  <div key={index} className="bg-slate-800 p-2 rounded text-sm font-semibold mb-1 text-teal-400">
                    {habilidade}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Conhecimento e  Parâmetros*/}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800 p-4 rounded-lg">
              <SheetKnowledge knowledge={sheet.knowledge} handleKnowledgeChange={handleKnowledgeChange}
              />
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <SheetParameters parameters={sheet.parameters} handleParameterChange={handleParameterChange}
              />
            </div>
          </div>
          {/* Equipamento */}
          <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <SheetEquipment equipment={sheet.equipment} handleEquipmentChange={handleEquipmentChange} />
          </div>
          {/* Inventário */}
          <div className="bg-slate-800 p-6 rounded-lg mb-6" >
            <SheetInventory inventory={sheet.inventory} handleInventoryChange={handleInventoryChange} />
          </div>
          {/*Habilidades de Caminho de Combate */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <CombatPathSkills
              skills={sheet.skill}
              handleSkillChange={handleSkillChange}
              handleAddSkill={handleAddSkill}
              handleDeleteSkill={handleDeleteSkill}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

}

export default SheetPage;

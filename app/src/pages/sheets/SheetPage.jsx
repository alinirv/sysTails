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
  const [saveTimeout, setSaveTimeout] = useState(null);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [temporaryLife, setTemporaryLife] = useState(0);
  const [temporaryEnergy, setTemporaryEnergy] = useState(0);
  const { idParam } = useParams();

  useEffect(() => {
    const fetchSheet = async () => {
      try {
        const { data } = await api.get(`/sheet/find/${idParam}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSheet(data);
      } catch (error) {
        console.error('Erro ao carregar ficha:', error);
      }
    };

    fetchSheet();
  }, [idParam]);

  const updateSheet = async (data) => {
    console.log(sheet.id)
    try {
      await api.put(`/sheet/update/${sheet.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      throw error;
    }
  };

  const autoSave = (updatedSheet) => {
    if (saveTimeout) clearTimeout(saveTimeout);

    setSaveStatus('saving');
    const timeout = setTimeout(async () => {
      try {
        await updateSheet(updatedSheet);
        setSaveStatus('saved');
      } catch (error) {
        setSaveStatus('error');
        console.error('Erro ao salvar:', error);
      }
    }, 2000);

    setSaveTimeout(timeout);
  };

  const calculatePoints = (pda, vigor, pointsLifeMax, pointsEnergyMax) => {
    const lifePoints = pointsLifeMax + 3 + vigor;
    const energyPoints = pointsEnergyMax + 1;
    return { lifePoints, energyPoints };
  };

  const handleParameterChange = (param, value) => {
    setSheet((prevSheet) => {
      const newSheet = {
        ...prevSheet,
        parameters: {
          ...prevSheet.parameters,
          [param]: Number(value),
        }
      };

      const { lifePoints, energyPoints } = calculatePoints(
        newSheet.pda,
        param === 'vigor' ? Number(value) : newSheet.parameters.vigor,
        param === 'pointsLifeMax' ? Number(value) : newSheet.pointsLifeMax,
        param === 'pointsEnergy' ? Number(value) : newSheet.pointsEnergy,
      );

      const finalSheet = {
        ...newSheet,
        pointsLifeMax: lifePoints,
        pointsEnergy: energyPoints,
      };

      autoSave(finalSheet);
      return finalSheet;
    });
  };

  const handleKnowledgeChange = (key, value) => {
    setSheet((prevSheet) => {
      const newSheet = {
        ...prevSheet,
        knowledge: {
          ...prevSheet.knowledge,
          [key]: value,
        },
      };
      autoSave(newSheet);
      return newSheet;
    });
  };

  const handleEquipmentChange = (type, field, value) => {
    setSheet((prevSheet) => {
      const newSheet = {
        ...prevSheet,
        equipment: {
          ...prevSheet.equipment,
          [type]: {
            ...prevSheet.equipment[type],
            [field]: value,
          },
        },
      };
      autoSave(newSheet);
      return newSheet;
    });
  };

  const handleInventoryChange = (field, value) => {
    setSheet(prevSheet => {
      const newSheet = {
        ...prevSheet,
        inventory: {
          ...prevSheet.inventory,
          [field]: value
        }
      };
      autoSave(newSheet);
      return newSheet;
    });
  };

  const handleAddSkill = async (newSkill) => {
    setSheet(prevSheet => {
      const newSheet = {
        ...prevSheet,
        skill: [...prevSheet.skill, newSkill]
      };
      autoSave(newSheet);
      return newSheet;
    });
  };

  const handleSkillChange = (index, field, value) => {
    setSheet(prevSheet => {
      const updatedSkills = [...prevSheet.skill];
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };
      const newSheet = {
        ...prevSheet,
        skill: updatedSkills
      };
      autoSave(newSheet);
      return newSheet;
    });
  };

  const handlePdaChange = (value) => {
    const newPda = Number(value);
    setSheet((prevSheet) => {
      if (newPda >= prevSheet.pda) {
        const { lifePoints, energyPoints } = calculatePoints(
          newPda,
          prevSheet.parameters.vigor,
          prevSheet.pointsLifeMax,
          prevSheet.pointsEnergyMax
        );

        const newSheet = {
          ...prevSheet,
          pda: newPda,
          pointsLifeMax: lifePoints,
          pointsEnergyMax: energyPoints,
        };
        autoSave(newSheet);
        return newSheet;
      }
      return prevSheet;
    });
  };

  const handleLifePointsChange = (value, type) => {
    const numValue = Number(value);
    if (type === 'Atual') {
      setSheet(prevSheet => {
        const newSheet = {
          ...prevSheet,
          pointsLife: Math.min(Math.max(0, numValue), prevSheet.pointsLifeMax)
        };
        autoSave(newSheet);
        return newSheet;
      });
    } else if (type === 'Temporários') {
      setTemporaryLife(Math.max(0, numValue));
    }
  };

  const handleEnergyPointsChange = (value, type) => {
    const numValue = Number(value);
    if (type === 'Atual') {
      setSheet(prevSheet => {
        const newSheet = {
          ...prevSheet,
          pointsEnergy: Math.min(Math.max(0, numValue), prevSheet.pointsEnergyMax)
        };
        autoSave(newSheet);
        return newSheet;
      });
    } else if (type === 'Temporários') {
      setTemporaryEnergy(Math.max(0, numValue));
    }
  };

  const handleDeleteSkill = (index) => {
    setSheet(prevSheet => {
      const newSheet = {
        ...prevSheet,
        skill: prevSheet.skill.filter((_, i) => i !== index)
      };
      autoSave(newSheet);
      return newSheet;
    });
  };

  const renderSaveStatus = () => {
    return (
      <div className="fixed bottom-4 right-4 p-2 rounded-lg">
        {saveStatus === 'saving' && (
          <span className="text-yellow-500">Salvando...</span>
        )}
        {saveStatus === 'saved' && (
          <span className="text-green-500">Todas as alterações salvas</span>
        )}
        {saveStatus === 'error' && (
          <span className="text-red-500">Erro ao salvar</span>
        )}
      </div>
    );
  };

  if (!sheet) return <div>Carregando...</div>;

  return (
    <div>
      <Navibar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700 py-10">
        <div className="bg-slate-950 text-white max-w-screen-lg w-full items-center px-4 py-6 rounded-lg">
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
            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-xl font-bold mb-4 text-white">Pontos de Energia</h4>
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
                        label === 'Máximo' ? sheet.pointsEnergyMax :
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 p-4 rounded-lg">
              <h4 className="text-xl font-bold mb-4 text-white">Movimentação e Bloqueio</h4>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-teal-400">Movimento</label>
                  <input
                    type='number'
                    className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                    value={sheet.movement}
                  />
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <label className="block text-sm font-semibold text-teal-400">Bloqueio</label>
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
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800 p-4 rounded-lg">
              <SheetKnowledge knowledge={sheet.knowledge} handleKnowledgeChange={handleKnowledgeChange} />
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <SheetParameters parameters={sheet.parameters} handleParameterChange={handleParameterChange} />
            </div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <SheetEquipment equipment={sheet.equipment} handleEquipmentChange={handleEquipmentChange} />
          </div>
          <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <SheetInventory inventory={sheet.inventory} handleInventoryChange={handleInventoryChange} />
          </div>
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
      {renderSaveStatus()}
      <Footer />
    </div>
  );
}

export default SheetPage;
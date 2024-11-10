import React, { useState } from 'react';
import StepNavigation from './StepNavigation';

const StepFive = ({ handleNext, handlePrevious, currentStep, totalSteps, handleDataUpdate }) => {
    const [characterName, setCharacterName] = useState('');
    //itens fixo cedido ao usuario
    const itens = ['1x Conjunto de Roupas', "3x Rações de Viagem", "1x Bolsa", "1x Saco de Dormir", "1x Cantil"];
    //auxilia na formatação do campo
    const step5 ={
        nome: characterName,
        itens: itens
    }

    return (
        <div className="w-full">
            <h3 className="text-center text-2xl font-bold mb-4">Ajustes Finais</h3>
            <div className="mb-4">
                <label className="block mb-4" htmlFor="characterName">Qual o nome do seu Aventureiro?:</label>
                <input
                    type="text"
                    id="characterName"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                    placeholder="Digite o nome do seu personagem"
                    required
                />
            </div>
            <div className="space-y-2 ">
                <h3 className="text-2xl mb-4 text-teal-500">Itens iniciais</h3>
                <p className="mb-6 ">Ah! Antes que a gente esqueça, pegue esses recursos iniciais, vai fazer toda a diferença:</p><br />
                {itens.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-800 p-2 rounded">
                        <span>{item}</span>

                    </div>
                ))}
            </div>
            <StepNavigation
                handleNext={characterName ? handleNext : null} 
                handlePrevious={handlePrevious}
                currentStep={currentStep}
                totalSteps={totalSteps}
                handleDataUpdate={handleDataUpdate}
                data={step5}
            />
            
        </div>
    );

}
export default StepFive;
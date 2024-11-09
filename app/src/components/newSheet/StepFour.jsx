import { useState } from "react";
import StepNavigation from './StepNavigation';

function StepFour({ handleNext, handlePrevious, currentStep, totalSteps }) {
    const [totalPoints, setTotalPoints] = useState(7);
    const initialKnowledge = {
        carisma: 0,
        conhecimentoMistico: 0,
        exploracao: 0,
        furtividade: 0,
        historia: 0,
        intimidacao: 0,
        intuicao: 0,
        medicina: 0,
        percepcao: 0,
        performance: 0,
        religiao: 0,
        sobrevivencia: 0,
        tecnologia: 0,
        vontade: 0
    };
    const [knowledge, setKnowledge] = useState(initialKnowledge);


    // Função para aumentar os pontos em um conhecimento
    const increaseParameter = (param) => {
        if (totalPoints > 0 && knowledge[param] < 2) {
            setKnowledge((prev) => ({ ...prev, [param]: prev[param] + 1 }));
            setTotalPoints(totalPoints - 1);
        }
    };

    // Função para diminuir os pontos em um conhecimento
    const decreaseParameter = (param) => {
        if (knowledge[param] > 0) {
            setKnowledge((prev) => ({ ...prev, [param]: prev[param] - 1 }));
            setTotalPoints(totalPoints + 1);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Conhecimentos</h2>
            <div className="text-center mb-6 w-81">
                <p>Os Conhecimentos expressam os saberes e experiências de um
                    personagem, desde estudos acadêmicos até práticas cotidianas,
                    geralmente utilizadas em situações fora de combate.</p><br />
                <strong className="mb-4 text-teal-500">Você tem {totalPoints} pontos restantes para distribuir.</strong>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-800 p-6 rounded-lg mb-2 m-2">
                {Object.keys(knowledge).map((param) => (
                    <div key={param} className="flex items-center justify-between bg-slate-900 p-4 rounded-lg">
                        <span>{param.charAt(0).toUpperCase() + param.slice(1)}: {knowledge[param]}</span>
                        <div>
                            <button onClick={() => increaseParameter(param)} className="text-teal-600 hover:bg-teal-500  font-bold py-1 px-2 rounded mr-2">+</button>
                            <button onClick={() => decreaseParameter(param)} className="text-red-500 hover:bg-red-400  font-bold py-1 px-2 rounded mr-2">-</button>
                        </div>
                    </div>
                ))}
            </div>
            <StepNavigation
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                currentStep={currentStep}
                totalSteps={totalSteps}
            />

        </div>
    );
}

export default StepFour;
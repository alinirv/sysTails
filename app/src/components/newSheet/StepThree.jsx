import { useState } from "react";
import StepNavigation from '../../components/newSheet/StepNavigation';

function StepThree({ handleNext, handlePrevious, currentStep, totalSteps }) {
    const [totalPoints, setTotalPoints] = useState(7);
    const initialParameters = {
        agilidade: 0,
        brutalidade: 0,
        canalizacao: 0,
        destreza: 0,
        espirito: 0,
        precisao: 0,
        vigor: 0,
        arcanismo: 0,
    };
    const [parameters, setParameters] = useState(initialParameters);


    // Função para aumentar os pontos em um parâmetro
    const increaseParameter = (param) => {
        if (totalPoints > 0 && parameters[param] < 2) {
            setParameters((prev) => ({ ...prev, [param]: prev[param] + 1 }));
            setTotalPoints(totalPoints - 1);
        }
    };

    // Função para diminuir os pontos em um parâmetro
    const decreaseParameter = (param) => {
        if (parameters[param] > 0) {
            setParameters((prev) => ({ ...prev, [param]: prev[param] - 1 }));
            setTotalPoints(totalPoints + 1);
        }
    };

    return (
        <div className="max-w-screen-lgw-full max-w-screen-l">
            <h2 className="text-xl font-bold mb-4 text-center">Parâmetro</h2>
            <div className="text-center mb-6 w-81">
                <p>Destruir uma porta com o seu machado, mirar em um alvo com o
                    seu arco, canalizar energia mística sobre um objeto mágico,<br/> ter
                    um corpo e mente resistentes a efeitos místicos, por exemplo,,<br />
                    utilizam os seus Parâmetros como base em testes, além de serem
                    potencializadores para certas habilidades de
                    Caminhos de Combate.</p><br />
                <strong className="mb-4">Você tem {totalPoints} pontos restantes para distribuir.</strong>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-800 p-6 rounded-lg mb-2 m-2">
                {Object.keys(parameters).map((param) => (
                    <div key={param} className="flex items-center justify-between bg-slate-900 p-4 rounded-lg">
                        <span>{param.charAt(0).toUpperCase() + param.slice(1)}: {parameters[param]}</span>
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

export default StepThree;
import { useState } from "react";
import combatPaths from '../utils/combatPaths';
import StepNavigation from '../../components/newSheet/StepNavigation';

function StepTwo({ handleNext, handlePrevious, currentStep, totalSteps }) {
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleSkillChange = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            if (selectedSkills.length < 2) {
                setSelectedSkills([...selectedSkills, skill]);
            } else {
                setSelectedSkills([skill]);
            }
        }
    };

    return (
        <div className="max-w-screen-lg w-full mx-auto p-6 bg-slate-950 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-teal-400">Expressão de Combate</h2>
            <div className="text-center mb-6">
                <p className="text-gray-300">Como você luta? Você é um combatente marcial? Um conjurador? Um especialista?</p>
                <p className="text-gray-300">Pense como você quer se expressar dentro de combate</p><br />
                <strong className="mt-4 block text-teal-500">Escolha duas Habilidades de Caminhos. Você pode escolher Habilidades de Caminhos diferentes.</strong>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-800 p-6 rounded-lg mb-4">
                {Object.entries(combatPaths).map(([pathName, abilities]) => (
                    <div key={pathName} className="mb-4 p-6 bg-slate-900 rounded-lg">
                        <h3 className="text-lg font-bold text-slate-200 text-center mb-4">{pathName}</h3>
                        {Object.entries(abilities).map(([type, skills]) => (
                            <div key={type} className="mb-2">
                                <h4 className="text-teal-600 font-semibold">{type}</h4>
                                <div className="flex flex-col">
                                    {skills.map(skill => (
                                        <div
                                            key={skill}
                                            className={`flex items-center p-2 cursor-pointer rounded-lg hover:bg-teal-600 transition duration-200 ${selectedSkills.includes(skill) ? 'bg-teal-700' : 'bg-slate-900'}`}
                                            onClick={() => handleSkillChange(skill)}
                                        >
                                            <ion-icon name={selectedSkills.includes(skill) ? "checkmark-outlin" : "circle-outlin"} className="text-teal-500 mr-2"></ion-icon>
                                            <span className={`font-normal ${selectedSkills.includes(skill) ? 'font-bold text-teal-200' : 'text-blue-gray-400'}`}>
                                                {skill}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
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

export default StepTwo;
import { useState } from "react";
import { Radio, Typography } from "@material-tailwind/react";
import combatPaths from '../utils/combatPaths';
import StepNavigation from '../../components/newSheet/StepNavigation';

function StepTwo({ handleNext, handlePrevious, currentStep, totalSteps }) {
    const [selectedSkills, setSelectedSkills] = useState([]);


    const handleSkillChange = (skill) => {
        if (selectedSkills.includes(skill)) {
            // Remove the skill if it's already selected
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            // If the skill is not selected, check if we can add it
            if (selectedSkills.length < 2) {
                setSelectedSkills([...selectedSkills, skill]);
            } else {
                // If already selected two skills, replace the first one
                setSelectedSkills([skill]);
            }
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-center">Expressão de Combate</h2>
            <div className="text-center mb-6">
                <p>Como você luta? Você é um combatente marcial? Um conjurador? Um especialista?</p>
                <p>Pense como você quer se expressar dentro de combate</p><br />
                <strong>Escolha duas Habilidades de Caminhos. Você pode escolher Habilidades de Caminhos diferentes.</strong>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-800 p-6 rounded-lg mb-2 m-2">
                {Object.entries(combatPaths).map(([pathName, abilities]) => (
                    <div key={pathName} className="mb-4 p-10">
                        <h3 className="text-lg font-bold text-teal-400 mb-4">{pathName}</h3>
                        {Object.entries(abilities).map(([type, skills]) => (
                            <div key={type} className="mb-2">
                                <h4 className="text-md font-semibold text-blue-gray-300">{type}</h4>
                                <div className="flex flex-col">
                                    {skills.map(skill => (
                                        <Radio
                                            key={skill}
                                            name={skill}
                                            ripple={false}
                                            className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                                            label={
                                                <Typography
                                                    className={`font-normal  ${selectedSkills.includes(skill) ? 'font-bold text-teal-200' : 'text-blue-gray-400'}`}
                                                >
                                                    {skill}
                                                </Typography>
                                            }
                                            onChange={() => handleSkillChange(skill)}
                                            checked={selectedSkills.includes(skill)}
                                        />
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
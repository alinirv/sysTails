import React, { useState } from 'react';
import { Progress } from "@material-tailwind/react";
import Navibar from '../../components/header/Navibar';
import Footer from '../../components/footer/Footer';
import StepOne from '../../components/newSheet/stepOne';
import StepTwo from '../../components/newSheet/stepTwo';

const CreateSheet = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };


    return (
        <div>
            <Navibar />
            <div className="flex flex-col min-h-screen items-center p-4 bg-gradient-to-b from-slate-900 to-teal-700 py-10">
                
                    <h3 className="text-2xl text-center font-bold mb-4 text-teal-400">Novo Aventureiro</h3>
                    
                        {/* Barra de Progresso */}
                        <div className="w-full max-w-screen-lg mb-8">
                            <div className="relative pt-1">
                                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-slate-950">
                                    <div
                                        style={{ width: `${(currentStep - 1) * 25}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center  bg-teal-600 transition-all duration-300"
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-950 text-white p-6 rounded-lg mt-4">
                            {currentStep === 1 && <div><StepOne /></div>}
                            {currentStep === 2 && <div><StepTwo />2</div>}
                            {currentStep === 3 && <div>Conteúdo da Etapa 3</div>}
                            {currentStep === 4 && <div>Conteúdo da Etapa 4</div>}
                            {currentStep === 5 && <div>Conteúdo da Etapa 5</div>}
                            {currentStep === 6 && <div>Conteúdo da Etapa 6</div>}
                        </div>
                 

     
            </div>
            <Footer />
        </div>
    );
}
export default CreateSheet;
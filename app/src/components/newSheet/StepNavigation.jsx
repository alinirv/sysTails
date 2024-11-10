import React from 'react';

const StepNavigation = ({ handleNext, handlePrevious, currentStep, totalSteps, handleDataUpdate, data }) => {

    const handleUpdate = () => {
        // Atualiza os dados no componente pai
        handleDataUpdate(data);
        // Avança para a próxima etapa
        handleNext();
    }
    return (
        <div className="flex justify-between mt-6">
            <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Voltar
            </button>
            <button
                onClick={handleUpdate}
                disabled={currentStep === totalSteps}
                className={`bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded ${currentStep === totalSteps ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Avançar
            </button>
        </div>
    );
};

export default StepNavigation;
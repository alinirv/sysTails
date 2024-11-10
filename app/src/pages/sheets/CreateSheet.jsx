import React, { useState } from 'react';
import Navibar from '../../components/header/Navibar';
import Footer from '../../components/footer/Footer';
import StepOne from '../../components/newSheet/stepOne';
import StepTwo from '../../components/newSheet/stepTwo';
import StepThree from '../../components/newSheet/StepThree';
import StepFour from '../../components/newSheet/StepFour';
import StepFive from '../../components/newSheet/stepFive';
import ConfirmationStep from '../../components/newSheet/ConfirmationStep';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateSheet = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;
    const [sheetData, setSheetData] = useState({});
    const navigate = useNavigate();

    //controla etapa posterior
    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };
    // controla etapa anterior
    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    // Atualiza os dados da ficha
    const handleDataUpdate = (data) => {
        setSheetData((prevData) => ({ ...prevData, ...data }));
    };

    //Função para Formatar os Dados para salvar
    function formatSheetData(data) {
        return {
            pda: 1,
            character: {
                name: data.nome,
                legacy: data.legacy
            },
            equipment: [],
            parameters: data.parameters,
            combat: {},
            knowledge: data.knowledge,
            inventory: {
                itens: data.itens,
                mp: 120,
                mo: 0,
                mi: 0
            },
            skill: data.skill,
            pointsLife: 33,
            pointsEnergy: 5
        };
    }
    // salva os dados no backend
    const handleSave = async () => {

        const formattedData = formatSheetData(sheetData);
        try {
            const { data } = await api.post('/sheet', formattedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (data) {
                navigate(`/sheetPage/${data.id}`)
            } else {
                alert('Erro ao criar ficha.');
            }
        } catch (error) {
            console.error('Erro ao salvar ficha:', error);
            alert('Erro ao criar ficha.');
        }
        console.log('Dados salvos:');
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

                <div className="bg-slate-950 text-white p-6 rounded-lg mt-4 w-full max-w-screen-lg ">
                    {currentStep === 1 && <div><StepOne
                        handleNext={handleNext}
                        handleDataUpdate={handleDataUpdate} /></div>}
                    {currentStep === 2 && <div><StepTwo
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        handleDataUpdate={handleDataUpdate} /></div>}
                    {currentStep === 3 && <div><StepThree
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        handleDataUpdate={handleDataUpdate} /></div>}
                    {currentStep === 4 && <div><StepFour
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        handleDataUpdate={handleDataUpdate} /></div>}
                    {currentStep === 5 && <div><StepFive
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        handleDataUpdate={handleDataUpdate} /></div>}
                    {currentStep === 6 && <div><ConfirmationStep
                        sheetData={sheetData}
                        handleSave={handleSave}
                        handlePrevious={handlePrevious} /></div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateSheet;
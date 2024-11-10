import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, } from "@material-tailwind/react";
import legados from '../utils/legancyMap'

const StepOne = ({ handleNext, handleDataUpdate }) => {
    const [selectedLegacy, setSelectedLegacy] = useState('');
    
    // Atualiza os dados da ficha
    const handleSelectLegacy = (legacy) => {
        setSelectedLegacy(legacy);
        handleDataUpdate({ legacy });
        handleNext()
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-bold mb-4 text-center">Legado</h1>
            <div className="text-center mb-6">
                <strong className="text-teal-500">Quem é você? Escolha um dos povos do mundo de Auroria.</strong><br />
                <p>Cada Legado possui uma origem, sociedade e tradições únicas.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-800 p-6 rounded-lg mb-6">
                {legados.map((legado, index) => (
                    <Card key={index} className="mt-6 w-full bg-slate-900 flex flex-co">
                        <CardHeader className="h-24 flex items-center justify-center bg-slate-950 text-teal-400 ">
                            <Typography variant="h4">{legado.nome}</Typography>
                        </CardHeader>
                        <CardBody className="flex-grow">
                            {legado.habilidades.map((habilidade, index) => (
                                <Typography key={index} className="mt-2 text-slate-200">
                                    <strong className="text-teal-500">{habilidade.nome}:</strong> {habilidade.descricao}
                                </Typography>
                            ))}
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button onClick={() => handleSelectLegacy(legado.nome)} className='mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded'>Selecionar</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
export default StepOne;
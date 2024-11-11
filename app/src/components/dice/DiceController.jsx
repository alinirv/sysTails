import React, { useState } from 'react';
import api from '../../services/api';
import d12Icon from '../../assets/d12.svg';

const DiceRoller = () => {
    const [modifiers, setModifiers] = useState(0);
    const [result, setResult] = useState(null);
    const [resultModified, setResultModified] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const rollDice = async () => {
        try {
            const { data } = await api.get('/roll', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setResult(data.result); // Armazenando o resultado do dado
            setResultModified(null); // Resetando o resultado modificado
            setShowModal(true); // Mostrar o modal
        } catch (error) {
            console.error('Erro ao rolar dado:', error);
        }
    };

    const rollDiceWithModifier = async () => {
        try {
            const { data } = await api.get(`/roll/modified/${modifiers}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setResultModified(data); // Armazenando o resultado modificado
            setShowModal(true); // Mostrar o modal
        } catch (error) {
            console.error('Erro ao rolar dado com modificador:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setResult(null);
        setResultModified(null);
    };

    return (
        <div className="bg-slate-950 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-6">
            {/* Entrada para o modificador */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <input
                    type="number"
                    value={modifiers}
                    onChange={(e) => setModifiers(e.target.value)}
                    placeholder="Modificador"
                    className="bg-slate-800 text-white border border-slate-700 rounded py-2 px-3 focus:outline-none focus:border-teal-500"
                />
            </div>

            {/* Botão para rolar o dado */}
            <div className="flex justify-center items-center mb-6">
                <button onClick={modifiers > 0 ? rollDiceWithModifier : rollDice} className="focus:outline-none">
                    <img src={d12Icon} alt="Rolar Dado" className="w-16 h-16 hover:scale-105 transition-transform" />
                </button>
            </div>

            {/* Modal para exibir o resultado */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-slate-900 p-6 rounded-lg shadow-lg text-center w-80">
                        <h2 className="text-2xl text-teal-400 font-bold mb-4">Resultado da Rolagem</h2>
                        {result !== null && (
                            <p className="text-white mb-4">🎲 Resultado: <span className="text-teal-400 font-bold">{result}</span></p>
                        )}
                        {resultModified !== null && (
                            <>
                                <p className="text-white">🎲 Resultado: <span className="text-teal-400 font-bold">{resultModified.result}</span></p>
                                <p className="text-white mt-2">🎲 Resultado com Modificador: <span className="text-teal-400 font-bold">{resultModified.resultModified}</span></p>
                            </>
                        )}
                        <button
                            onClick={closeModal}
                            className="mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiceRoller;

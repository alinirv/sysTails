import React from 'react';
import StepNavigation from '../../components/newSheet/StepNavigation';

function ConfirmationStep({ sheetData,handlePrevious, handleSave  }) {
    const { nome, legacy, skill, parameters, knowledge, itens } = sheetData;
// Função para filtrar parâmetros e conhecimentos com valor diferente de zero
const filteredParameters = Object.entries(parameters).filter(([_, value]) => value !== 0);
const filteredKnowledge = Object.entries(knowledge).filter(([_, value]) => value !== 0);

return (
    <div className="max-w-screen-lg w-full mx-auto p-8 bg-slate-950 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Confirme as informações</h2>

        {/* Formulário de visualização */}
        <form className="space-y-6">
            {/* Nome do Personagem */}
            <div>
                <label className="block text-gray-300 font-bold mb-2">Nome do Aventureiro</label>
                <input
                    type="text"
                    value={nome}
                    readOnly
                    className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-700"
                />
            </div>

            {/* Legado */}
            <div>
                <label className="block text-gray-300 font-bold mb-2">Legado</label>
                <input
                    type="text"
                    value={legacy}
                    readOnly
                    className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-700"
                />
            </div>

            {/* Habilidades Selecionadas */}
            <div>
                <label className="block text-gray-300 font-bold mb-2">Habilidades Selecionadas</label>
                {skill.map((s, index) => (
                    <div key={index} className="mb-4">
                        <input
                            type="text"
                            value={s.nome}
                            readOnly
                            className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-700"
                        />
                    </div>
                ))}
            </div>

            {/* Parâmetros (Exibe apenas os que têm valor diferente de zero) */}
            {filteredParameters.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-teal-400 mb-4">Parâmetros</h3>
                    {filteredParameters.map(([key, value]) => (
                        <div key={key} className="mb-4">
                            <label className="block text-gray-300 mb-1">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                type="number"
                                value={value}
                                readOnly
                                className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-700"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Conhecimentos (Exibe apenas os que têm valor diferente de zero) */}
            {filteredKnowledge.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-teal-400 mb-4">Conhecimentos</h3>
                    {filteredKnowledge.map(([key, value]) => (
                        <div key={key} className="mb-4">
                            <label className="block text-gray-300 mb-1">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                type="number"
                                value={value}
                                readOnly
                                className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-700"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Itens do Inventário */}
            <div>
                <label className="block text-gray-300 font-bold mb-2">Inventário</label>
                {itens.map((item, index) => (
                    <div key={index} className="mb-4">
                        <input
                            type="text"
                            value={item}
                            readOnly
                            className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-700"
                        />
                    </div>
                ))}
            </div>
        </form>

        {/* Botões de navegação */}
        <div className="flex justify-between mt-8">
            <button
                onClick={handlePrevious}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
            >
                Voltar
            </button>
            <button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-500 text-white py-3 px-6 rounded"
            >
                Confirmar e Salvar
            </button>
        </div>
    </div>
);
}

export default ConfirmationStep;

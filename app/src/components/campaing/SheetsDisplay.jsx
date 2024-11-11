import React from 'react';

const SheetDisplay = ({ sheet }) => {
    if (!sheet) return <div>Carregando...</div>;

    return (
        <div className="bg-slate-950 text-white max-w-screen-lg w-full items-center px-4 py-10 rounded-lg">
            {/*Informações da jogador*/}
            <div className="grid grid-cols-4 md:grid-cols-4 gap-6 mb-6">
                {['Jogador', 'Personagem', 'Legado', 'PDA'].map((label) => (
                    <div key={label} className="bg-slate-900 p-4 rounded-lg">
                        <h4 className="text-xl font-bold mb-2 text-teal-400">{label}</h4>
                        <input
                            type='text'
                            className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                            value={
                                label === 'PDA' ? sheet.pda :
                                    label === 'Jogador' ? sheet.player :
                                        label === 'Personagem' ? sheet.character.nome :
                                            sheet.character.legado
                            }
                            readOnly
                        />
                    </div>
                ))}
            </div>
            {/*Pontos de vida e energia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-white">Pontos de Vida</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {['Máximo', 'Atual', 'Temporários'].map((label) => (
                            <div key={label} className="space-y-1">
                                <label className="block text-sm font-semibold text-teal-400">
                                    {label}
                                </label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                                    value={
                                        label === 'Máximo' ? sheet.pointsLifeMax :
                                            label === 'Atual' ? sheet.pointsLife :
                                                0
                                    }
                                    readOnly
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-white">Pontos de Energia</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {['Máximo', 'Atual', 'Temporários'].map((label) => (
                            <div key={label} className="space-y-1">
                                <label className="block text-sm font-semibold text-teal-400">
                                    {label}
                                </label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white text-center focus:outline-none focus:border-teal-500"
                                    value={
                                        label === 'Máximo' ? sheet.pointsEnergyMax :
                                            label === 'Atual' ? sheet.pointsEnergy :
                                                0 // Aqui você pode adicionar lógica para temporários se necessário
                                    }
                                    readOnly
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/*Parametros */}
            <div className="bg-slate-900 mb-6 text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Parâmetros</h3>
                <div className="grid grid-cols-4 gap-4 text-teal-400">
                    {Object.keys(sheet.parameters).map((key) => (
                        <label key={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                            <input
                                type="number"
                                value={sheet.parameters[key] ?? 0}
                                className="mt-1 p-1 rounded bg-slate-700 text-white"
                                readOnly
                            />
                        </label>
                    ))}
                </div>
            </div>
            {/*Conhecimentos*/}
            <div className="bg-slate-900 p-4 rounded-lg mb-6">
                <h4 className="text-xl font-bold mb-4 text-white">Conhecimento</h4>
                <div className="grid grid-cols-4 gap-4 text-teal-400">
                    {Object.keys(sheet.knowledge).map((key, index) => (
                        <label key={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                            <input
                                value={sheet.knowledge?.[key] ?? ""}
                                className="mt-1 p-1 rounded bg-slate-700 text-white w-full"
                                readOnly
                            />
                        </label>
                    ))}
                </div>

            </div>
            {/*Equipamentos */}
            <div className="bg-slate-900 p-4 rounded-lg mb-6">
                <h4 className="text-xl font-bold mb-4 text-white">Equipamentos</h4>
                <div className="grid grid-cols-1 md:grid-cols-1 ">
                    {Object.keys(sheet.equipment).map((key) => (
                        <div key={key} className="bg-slate-900 p-4 rounded-lg">
                            {/* Título do Equipamento */}
                            <h4 className="text-xl font-bold mb-3 text-white">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </h4>
                            <div className="grid grid-cols-4 gap-4">
                                {Object.keys(sheet.equipment?.[key] || {}).map((subKey) => (
                                    <div key={subKey}>
                                        <label htmlFor={`${key}-${subKey}`} className="block text-sm font-semibold mb-1 text-teal-400">
                                            {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                                        </label>
                                        <input
                                            value={sheet.equipment[key]?.[subKey] || ''}
                                            className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                                            readOnly
                                        />

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Habilidades de Combate*/}
            <div className="bg-slate-900 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <h4 className="text-xl font-bold  text-white">Habilidades de Combate</h4>
                    {sheet.skill?.map((skill, index) => (
                        <div key={index} className="bg-slate-900 p-2 rounded-lg">
                            {/* Nome da Habilidade */}
                            <h4 className="text-xl p-3 font-bold text-white">{skill.nome}</h4>
                            {/* Campos de Detalhes da Habilidade */}
                            <div className="grid grid-cols-4 gap-4">
                                {['custoPE', 'acao', 'tipo', 'duracao'].map((field) => (
                                    <div key={field}>
                                        <label htmlFor={`${field}${index}`} className="block text-sm font-semibold mb-1 text-teal-400">
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </label>
                                        <input
                                            type="text"
                                            value={skill[field] || ''}
                                            className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                                            readOnly
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Campo de Descrição */}
                            <div className="mt-4">
                                <label htmlFor={`descricao${index}`} className="block text-sm font-semibold mb-1 text-teal-400">
                                    Descrição
                                </label>
                                <textarea
                                    value={skill.descricao || ''}
                                    className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                                    rows="2"
                                    readOnly
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <Inventario */}
            <div className="bg-slate-900 p-4 rounded-lg mb-6">
                <h4 className="text-xl font-bold mb-4 text-white">Inventário</h4>
                <div className="grid grid-cols-1 md:grid-cols-1 ">
                    {/* Seção de Itens */}
                    <div className="md:col-span-2 bg-slate-900 p-4 rounded-lg">
                        <h4 className="text-xl font-bold mb-4 text-teal-400">Itens</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {sheet.inventory.itens.map((item, index) => (
                                <div key={index} className="flex items-center justify-between bg-slate-800 p-2 rounded">
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Seção de Moedas */}
                    <div className="bg-slate-900 p-4 rounded-lg">
                        <h4 className="text-xl font-bold mb-4 text-teal-400">Moedas</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                            {['mp', 'mo', 'mi'].map((key) => (
                                <div key={key} className="space-y-1">
                                    <label htmlFor={key} className="block text-sm font-semibold text-teal-400">
                                        {key.toUpperCase()}
                                    </label>
                                    <input
                                        type="number"
                                        id={key}
                                        value={sheet.inventory[key] || 0}
                                        className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                                        readOnly
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>



    );
};

export default SheetDisplay;
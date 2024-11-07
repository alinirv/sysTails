import React, { useState } from 'react';

const SheetInventory = ({ inventory, handleInventoryChange }) => {
    const [newItem, setNewItem] = useState('');
    // realiza a adição de novo item
    const handleAddItem = (e) => {
        e.preventDefault(); 
        if (newItem.trim() !== '') {
            const updatedItems = [...inventory.itens, newItem.trim()];
            handleInventoryChange('itens', updatedItems);
            setNewItem(''); // Limpa o campo após adicionar o item
        }
    };
    //  realiza a remoção de item
    const handleRemoveItem = (itemToRemove) => {
        const updatedItems = inventory.itens.filter(item => item !== itemToRemove);
        handleInventoryChange('itens', updatedItems);
    };
    //  realiza a edição de item
    const handleCurrencyChange = (currency, value) => {
        handleInventoryChange(currency, parseInt(value) || 0);
    };

    const currencies = [
        { key: 'mp', label: 'Moedas de Prata' },
        { key: 'mo', label: 'Moedas de Ouro' },
        { key: 'mi', label: 'Moedas Imperiais' }
    ];

    return (
        <div className="bg-slate-950 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-teal-500">Inventário</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Seção de Itens */}
                <div className="md:col-span-2 bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-teal-400">Itens</h4>
                    <div className="mb-4">
                        <form onSubmit={handleAddItem} className="flex gap-2">
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                placeholder="Adicionar novo item..."
                                className="flex-1 bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                            />
                            <button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded transition duration-200"
                            >
                                Adicionar
                            </button>
                        </form>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {inventory.itens.map((item, index) => (
                            <div key={index} className="flex items-center justify-between bg-slate-800 p-2 rounded">
                                <span>{item}</span>
                                <button
                                    onClick={() => handleRemoveItem(item)}
                                    className="text-red-500 hover:text-red-400 transition duration-200"
                                >
                                    <ion-icon name="trash-outline"></ion-icon>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seção de Moedas */}
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-teal-400">Moedas</h4>
                    <div className="space-y-4">
                        {currencies.map(({ key, label }) => (
                            <div key={key} className="space-y-1">
                                <label htmlFor={key} className="block text-sm font-semibold text-teal-400">
                                    {label}
                                </label>
                                <input
                                    id={key}
                                    type="number"
                                    min="0"
                                    value={inventory[key]}
                                    onChange={(e) => handleCurrencyChange(key, e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SheetInventory;
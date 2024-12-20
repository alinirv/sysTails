import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const SheetsDashboard = () => {
    const [sheets, setSheets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSheets();
    }, [isLoading]);

    async function fetchSheets() {
        if (!isLoading) return;
        try {
            const response = await api.get('/sheet/findAll', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setSheets(response.data);
        } catch (err) {
            console.error('Erro ao excluir campanha:', err);
        } finally {
            setIsLoading(true);
        }
    };

    const handleDeleteSheet = async (sheetId) => {
        if (window.confirm('Tem certeza que deseja excluir esta ficha?')) {
            try {
                const {data} = await api.delete('/sheet/delete/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
                    data: { sheetId } 
                });
                // Atualiza o estado removendo a ficha excluída
                setSheets(sheets.filter(sheet => sheet.id !== sheetId));
                alert(data);
            } catch (err) {
                console.error('Erro ao excluir ficha:', err);
                alert('Erro ao excluir a ficha. Tente novamente.');
            }
        }
    };
    

    return (
        <div >
            <h1 className="text-3xl font-bold text-white mb-6">Aventureiros</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sheets.map((sheet) => (
                    <div key={sheet.id} className="bg-slate-900 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-2">{sheet.character.nome}</h2>
                        <p className="text-teal-500 mb-4">PDA: {sheet.pda}</p>
                        <div className="flex justify-between items-center">
                            <Link to={`/sheet-page/${sheet.id}`} className="text-teal-500 hover:text-teal-600">
                                Abrir
                            </Link>
                            <button
                                onClick={() => handleDeleteSheet(sheet.id)}
                                className="text-red-500 hover:text-red-400 transition duration-200"
                            >
                                <ion-icon name="trash-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default SheetsDashboard;
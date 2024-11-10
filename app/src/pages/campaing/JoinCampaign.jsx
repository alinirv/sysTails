import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Navibar from '../../components/header/Navibar';
import Footer from '../../components/footer/Footer';

const JoinCampaign = () => {
    const [campaignToken, setCampaignToken] = useState('');
    const [selectedSheetId, setSelectedSheetId] = useState('');
    const [sheets, setSheets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSheets = async () => {
            try {
                const response = await api.get('/sheet/findAll', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setSheets(response.data);
            } catch (error) {
                console.error('Erro ao buscar fichas:', error);
                alert('Erro ao buscar fichas. Tente novamente.');
            }
        };

        fetchSheets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/campaing/joinCampaign', {
                campaignToken,
                sheetId: selectedSheetId, // Enviar ID da ficha
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.data) {
                alert('Ficha adicionada à campanha com sucesso!');
                navigate('/dashboard'); // Redireciona para o painel após o ingresso
            }
        } catch (error) {
            console.error('Erro ao ingressar na campanha:', error);
            alert('Erro ao ingressar na campanha. Verifique o token da campanha e a ficha selecionada.');
        }
    };

    return (
        <div>
            <Navibar />
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700 py-10">
                <div className="bg-slate-950 text-white max-w-screen-lg w-full items-center px-4 py-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Ingressar em uma Campanha</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Token da Campanha</label>
                        <input
                            type="text"
                            value={campaignToken}
                            onChange={(e) => setCampaignToken(e.target.value)}
                            required
                            className="w-full p-2 bg-slate-800 text-white border border-slate-700 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Selecione sua Ficha</label>
                        <select
                            value={selectedSheetId}
                            onChange={(e) => setSelectedSheetId(e.target.value)}
                            required
                            className="w-full p-2 bg-slate-800 text-white border border-slate-700 rounded"
                        >
                            <option value="">Selecione uma ficha</option>
                            {sheets.map(sheet => (
                                <option key={sheet.id} value={sheet.id}>{sheet.character.nome}</option>
                            ))}
                        </select>
                    </div>
                        
                        <div className="flex justify-center space-x-6 mb-10">
                            <button
                                onClick={() => navigate('/dashboard')} 
                                className="mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Voltar
                            </button>
                            <button
                                type="submit"
                                className="mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Ingressar na Campanha
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JoinCampaign;
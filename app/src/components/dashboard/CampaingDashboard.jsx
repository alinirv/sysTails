import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const CampaingDashboard = () => {
    const [campaing, setcampaing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchcampaing();
    }, [isLoading]);

    async function fetchcampaing() {
        if (!isLoading) return;
        try {
            const response = await api.get('/campaing/find', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setcampaing(response.data);
        } catch (err) {
            alert(err.response?.data || 'Erro desconhecido');
        } finally {
            setIsLoading(true);
        }
    };

    const handleDeletecampaing = async (campaingName, campaingToken) => {
        if (window.confirm(`Tem certeza que deseja excluir a campanha "${campaingName}"?`)) {
            try {
                await api.delete(`/campaing/delete/${campaingToken}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setcampaing(campaing.filter(campaing => campaing.name !== campaingName));
            } catch (err) {
                setError('Falha ao excluir a campanha. Por favor, tente novamente.');
                console.error('Erro ao excluir campanha:', err);
            }
        }
    };

    return (
        <div className=" text-white max-w-screen-lg w-full px-4 py-6 rounded-lg">
            <h1 className="text-3xl font-bold text-white mb-6">Campanhas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaing.map((campaing) => (
                    <div key={campaing.id} className="bg-slate-950 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-white mb-2">{campaing.name}</h2>
                        <p className="text-teal-500 mb-4">Status: {campaing.status}</p>
                        <p className="text-teal-500 mb-4">Token: {campaing.token}</p>
                        <div className="flex justify-between items-center">
                            <Link to={'/'} className="text-teal-500 hover:text-teal-600">
                                Ver Detalhes
                            </Link>
                            <button
                                onClick={() => handleDeletecampaing(campaing.name,campaing.token)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CampaingDashboard;
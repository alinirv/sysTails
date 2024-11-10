import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Navibar from '../../components/header/Navibar';
import Footer from '../../components/footer/Footer';

const CreateCampaign = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [masterName, setMasterName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/campaing', {
                name,
                description,
                masterName,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.data) {
                alert('Campanha criada com sucesso!');
                navigate('/dashboard'); // Redireciona para o painel após a criação
            }
        } catch (error) {
            console.error('Erro ao criar campanha:', error);
            alert('Erro ao criar campanha. Tente novamente.');
        }
    };

    return (
        <div>
            <Navibar />
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700 py-10">
                <div className="bg-slate-950 text-white max-w-screen-lg w-full items-center px-4 py-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-center">Criar Nova Campanha</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-6 px-4">
                            <label className="block mb-1 text-teal-500">Qual o nome dessa nova aventura?</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-2 bg-slate-800 text-white border border-slate-700 rounded"
                            />
                        </div>
                        <div className="mb-6 px-4">
                            <label className="block mb-1 text-teal-500">Nos conte um pouco sobre essa aventura</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="w-full p-2 bg-slate-800 text-white border border-slate-700 rounded"
                            />
                        </div>
                        <div className="mb-6 px-4">
                            <label className="block mb-1 text-teal-500">Qual o seu nome Mestre?</label>
                            <input
                                type="text"
                                value={masterName}
                                onChange={(e) => setMasterName(e.target.value)}
                                required
                                className="w-full p-2 bg-slate-800 text-white border border-slate-700 rounded"
                            />
                        </div >
                        <div className="mb-6 px-4">
                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 rounded"
                            >
                                Criar Campanha
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateCampaign;
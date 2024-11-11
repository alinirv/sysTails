import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import SheetDisplay from '../../components/campaing/SheetsDisplay';
import Navibar from '../../components/header/Navibar';
import Footer from '../../components/footer/Footer';


const CampaignDetail = () => {
    const { token } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [sheetslist, setSheetsList] = useState([]);
    const [sheets, setSheets] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Função para buscar campanha
    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await api.get(`/campaing/find/${token}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setCampaign(response.data);
                setSheetsList(response.data.sheets);
            } catch (error) {
                console.error('Erro ao buscar detalhes da campanha:', error);
                alert('Erro ao buscar detalhes da campanha.');
            }
        };

        fetchCampaign();
    }, [token]);

    // Função para abrir o modal com a ficha atualizada
    const openModal = async (sheet) => {

        try {
            const { data } = await api.get(`/sheet/find/${sheet.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setSelectedSheet(data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Erro ao carregar ficha:', error);
        }      
    };

    // Função para fechar o modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSheet(null);
    };

    if (!campaign) return <div>Carregando...</div>;

    return (
        <div>
            <Navibar />
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700 py-10">
                <div className="bg-slate-950 text-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4 text-center text-teal-400">{campaign.name}</h2>
                    <p className="mb-4 text-gray-300 text-center">{campaign.description}</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 ">
                        <p className="mb-4"><span className="font-semibold text-teal-400">Mestre:</span> {campaign.masterName}</p>
                        <p className="mb-4"><span className="font-semibold text-teal-400">Status:</span> {campaign.status}</p>
                        <div className="flex justify-center items-center gap-4 mb-10">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded transition duration-200 text-sm"
                            >
                                Voltar
                            </button>
                            <button
                                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded transition duration-200 text-sm"
                            >
                                Fechar campanha
                            </button>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mt-6 text-teal-400">Fichas</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {sheetslist.length === 0 ? (
                            <p>Não há fichas associadas a esta campanha.</p>
                        ) : (
                            sheetslist.map((item) => {
                                const { sheet } = item;
                                if (!sheet) return null;
                                return (
                                    <Card key={sheet.id} className="mt-6 w-64 h-64 bg-slate-900 shadow-lg rounded-lg overflow-hidden flex flex-col">
                                        <CardHeader className="h-24 flex items-center justify-center bg-slate-050 text-teal-400">
                                            <Typography variant="h5" className="text-lg">{sheet.character.nome}</Typography>
                                        </CardHeader>
                                        <CardBody className="flex-grow p-2">

                                            <div className="grid grid-cols-2 gap-4">
                                                {['Jogador', 'PDA'].map((label) => (
                                                    <div key={label}>
                                                        <label htmlFor={`${label}`} className="block text-sm font-semibold mb-1 text-teal-400">
                                                            {label.charAt(0).toUpperCase() + label.slice(1)}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={
                                                                label === 'PDA' ? sheet.pda : sheet.player

                                                            }
                                                            readOnly
                                                            className="bg-slate-800 border border-slate-700 rounded w-full py-2 px-3 text-white focus:outline-none focus:border-teal-500"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </CardBody>
                                        <CardFooter className="flex justify-center pt-2">
                                            <Button
                                                onClick={() => openModal(sheet)}
                                                className='bg-teal-600 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded transition duration-200 text-sm'
                                            >
                                                Selecionar
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })
                        )}
                    </div>
                </div>
                {/* Modal para exibir a ficha usando o componente SheetDisplay */}
                {isModalOpen && (
                    <div className="bg-slate-950 text-white max-w-screen-lg w-full mt-8 items-center px-4 py-6 rounded-lg">
                        <div className="bg-slate-950 p-6 rounded-lg shadow-lg ">
                            <div className="flex justify-end mt-6 lg:grid-cols-2 gap-4 mb-10">
                                <button // onClick={() => openModal(sheet)}
                                    className='bg-teal-600 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded transition duration-200 text-sm'>
                                    Remover
                                </button>

                                <button
                                    onClick={closeModal}
                                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded transition duration-200 text-sm"
                                >
                                    Fechar
                                </button>
                            </div>
                            <SheetDisplay sheet={selectedSheet} />
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CampaignDetail;

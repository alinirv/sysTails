import React from 'react';
import { Link } from 'react-router-dom';
import Navibar from '../../components/header/Navibar';
import SheetsDashboard from '../../components/dashboard/SheetsDashboard';
import Footer from '../../components/footer/Footer';
import CampaingDashboard from '../../components/dashboard/CampaingDashboard';

function UserDashboard() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-teal-700">
            <Navibar />
            <header className="bg-slate-950 shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Painel do Aventureiro</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-slate-950 mt-8 mb-8 pb-6 rounded-2xl">
                    <div className="flex justify-center space-x-6 mb-10">
                        <Link to="/createSheet" className="mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded">
                            Criar Nova Ficha
                        </Link>
                        <Link to="/createCampaing" className="mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded">
                            Criar Nova Campanha
                        </Link>
                        <Link to="/create-sheet" className="mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded">
                            Ingressar em uma Campanha
                        </Link>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg mb-6">
                        <div className="bg-slate-950 text-white p-6 rounded-lg shadow-lg">
                            <div className="mb-6">
                                <SheetsDashboard />
                            </div>
                            <div className="mb-6">
                                <CampaingDashboard />
                            </div>

                        </div>

                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UserDashboard;

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
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{/* Your content */}
                    <div className="flex justify-center space-x-6 mb-10">
                        <Link to="/create-sheet" className="bg-slate-950 text-teal-500 py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300 inline-block">
                            Criar Nova Ficha
                        </Link>
                        <Link to="/create-sheet" className="bg-slate-950 text-teal-500 py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300 inline-block">
                            Criar Nova Campanha
                        </Link>
                        <Link to="/create-sheet" className="bg-slate-950 text-teal-500 py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300 inline-block">
                            Ingressar em uma Campanha
                        </Link>
                    </div>
                    <div >
                        <SheetsDashboard />
                    </div>
                    <div >
                        <CampaingDashboard />
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UserDashboard;

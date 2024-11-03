import React from 'react';
import Navibar from '../../components/header/Navibar';

function UserDashboard() {

    return (
        <div className="min-h-screen bg-gray-100">
            <Navibar />

            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-teal-700 mb-6">Painel do Usuário</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <p>Itens do Usuário</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

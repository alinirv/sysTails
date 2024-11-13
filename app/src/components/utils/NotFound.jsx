import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navibar from '../../components/header/Navibar';

const NotFound = () => {
    return (
        <div>
            <Navibar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700">
                <h1 className="text-6xl text-white font-bold">404</h1>
                <h2 className="text-2xl text-white">Página Não Encontrada</h2>
                <p className="mt-4 text-gray-300">
                    Desculpe, a página que você está procurando não existe.
                </p>
                <Link to="/" className="mt-6 bg-teal-600 text-white font-bold py-2 px-4 rounded">
                    Voltar para a Página Inicial
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;
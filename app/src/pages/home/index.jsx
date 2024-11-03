import React from 'react';
import { useNavigate } from 'react-router-dom';
import imagem from '../../assets/10091.png'
import Footer from '../../components/footer/Footer';
import Navibar from '../../components/header/Navibar';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        localStorage.getItem('token')? navigate('/dashboard'): navigate('/login')
    };

    return (
        <div>
            <Navibar/>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700 py-10">

                <div className="bg-slate-950 text-white max-w-screen-lg w-full px-4 py-6 rounded-lg items-center" >
                    <div className="px-10">
                        <img className="mx-auto rounded-lg shadow-lg p-8" src={imagem} alt="Logo do jogo Gaia" />
                    </div>

                    <p className="text-lg mb-4">
                        Gaia: O Prelúdio é um projeto nacional de RPG de alta fantasia medieval, trazendo um sistema moderno e simplificado, que oferece uma experiência de jogo fluída, onde cada personagem é único e a palavra-chave é liberdade.
                    </p>
                    <p className="text-lg mb-4">
                        Com um sistema híbrido de criação de personagens, regras e um combate simplificado, Gaia: O Prelúdio tem o objetivo de ser um sistema acessível para toda a comunidade, tanto para aqueles que procuram uma aventura mais simples e rápida, como para aqueles que procuram uma jornada épica e repleta de escolhas.
                    </p>
                    <p className="text-lg mb-4">
                        Sendo aqui que entra o Tails! Como seu melhor companheiro, ele está aqui para você desfrutar desse sistema em poucos cliques, com rápidas criações de personagens, seleções de poderes e magias, além de um gerenciamento geral para mestres e jogadores.
                    </p>
                    <div className="flex justify-center py-5">
                        <button onClick={handleLoginRedirect} className="w-3/6 bg-teal-600 text-slate-950 font-semibold py-2 rounded-md hover:none">
                            Comece Agora
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>

    );
};

export default Home;
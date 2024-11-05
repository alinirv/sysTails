import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import imagem from '../../assets/002211.png';

const Navibar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div>
            <nav
                className="relative flex w-full items-center justify-between bg-slate-900 py-2 shadow-lg dark:bg-slate-900 lg:py-4"
                data-twe-navbar-ref
            >
                <div className="flex w-full items-center justify-between px-3">
                    <div>
                        <Link to="/" className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0">
                            <img
                                className="me-8"
                                src={imagem}
                                style={{ height: '32px' }}
                                alt="Logo Tails"
                                loading="lazy"
                            />
                        </Link>
                    </div>

                    <div className="flex-grow flex justify-center items-center">
                        <ul className="list-style-none flex space-x-6">
                        <li data-twe-nav-item-ref>
                                <Link
                                    to="/dashboard"
                                    className="text-white transition duration-200 hover:text-teal-500 focus:text-teal-500"
                                    aria-current="page"
                                    data-twe-nav-link-ref
                                >
                                    Painel
                                </Link>
                            </li>
                            <li data-twe-nav-item-ref>
                                <Link
                                    to="/sobre"
                                    className="text-white transition duration-200 hover:text-teal-500 focus:text-teal-500"
                                    aria-current="page"
                                    data-twe-nav-link-ref
                                >
                                    Sobre
                                </Link>
                            </li>
                            <li data-twe-nav-item-ref>
                                <a
                                    href="https://www.catarse.me/users/1892319"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white transition duration-200 hover:text-teal-500 focus:text-teal-500"
                                    aria-current="page"
                                    data-twe-nav-link-ref
                                >
                                    Gaia: O Prelúdio
                                </a>
                            </li>
                            
                        </ul>
                    </div>

                    <div className="flex items-center">
                        <button
                            type="button"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            className="me-3 inline-block rounded px-3 py-2 text-xs font-medium uppercase leading-normal text-white hover:text-teal-400 focus:text-teal-500"
                            onClick={isLoggedIn ? handleLogout : handleLoginRedirect}
                        >
                            {isLoggedIn ? 'Sair' : 'Entrar'}
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navibar;

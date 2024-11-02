import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import imagem from '../../assets/002211.png';

const Navibar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div>
            <nav
                className="relative flex w-full items-center justify-between bg-slate-900 py-2 shadow-lg dark:bg-slate-900 lg:py-4"
                data-twe-navbar-ref
            >
                <div className="flex w-full items-center justify-between px-3">
                    <div>
                        <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="#">
                            <img
                                className="me-8"
                                src={imagem}
                                style={{ height: '32px' }} // Aumente a altura da logo
                                alt="TE Logo"
                                loading="lazy"
                            />
                        </a>
                    </div>

                    <div className="flex-grow flex justify-center items-center">
                        <ul className="list-style-none flex space-x-6">
                            {isLoggedIn ? (
                                <>
                                    <li data-twe-nav-item-ref>
                                        <Link
                                            to="/campanhas"
                                            className="text-teal-300 transition duration-200 hover:text-teal-500 focus:text-teal-500"
                                            aria-current="page"
                                            data-twe-nav-link-ref
                                        >
                                            Campanhas
                                        </Link>
                                    </li>
                                    <li data-twe-nav-item-ref>
                                        <Link
                                            to="/fichas"
                                            className="text-teal-300 transition duration-200 hover:text-teal-500 focus:text-teal-500"
                                            aria-current="page"
                                            data-twe-nav-link-ref
                                        >
                                            Fichas
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li data-twe-nav-item-ref>
                                        <Link
                                            to="/"
                                            className="text-teal-300 transition duration-200 hover:text-teal-500 focus:text-teal-500"
                                            aria-current="page"
                                            data-twe-nav-link-ref
                                        >
                                            Sobre
                                        </Link>
                                    </li>
                                    <li data-twe-nav-item-ref>
                                        <a
                                            src="https://www.catarse.me/users/1892319"
                                            className="text-teal-300 transition duration-200 hover:text-teal-500 focus:text-teal-500"
                                            aria-current="page"
                                            data-twe-nav-link-ref
                                        >
                                            Gaia
                                        </a>
                                    </li>
                                    <li data-twe-nav-item-ref>
                                        <Link
                                            to="/campanhas"
                                            className="text-teal-300 transition duration-200 hover:text-teal-500 focus:text-teal-500"
                                            aria-current="page"
                                            data-twe-nav-link-ref
                                        >
                                            Patente
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="flex items-center">
                        <button
                            type="button"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            className="me-3 inline-block rounded px-3 py-2 text-xs font-medium uppercase leading-normal text-teal-300 hover:text-teal-400 focus:text-teal-500"
                            onClick={isLoggedIn ? onLogout : handleLoginRedirect}
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

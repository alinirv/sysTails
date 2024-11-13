import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navibar from '../../components/header/Navibar';
import api from '../../services/api';

function RequestPassword() {
    const emailRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const {data} = await api.post('/request-reset', { email: emailRef.current.value });
            //para efeito de teste retirar na produção
            console.log(data)
            alert('Instruções de recuperação de senha enviadas para o seu e-mail.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data || 'Erro desconhecido');
        }
    }

    return (
        <div>
            <Navibar />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700">
                <div className="bg-slate-950 rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">Recuperar Senha</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            ref={emailRef}
                            placeholder="Email"
                            type="email"
                            required
                            className="w-full p-3 border border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:none bg-transparent text-white"
                        />
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-slate-950 font-semibold py-2 rounded-md hover:none transition duration-200"
                        >
                            Enviar Instruções
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">
                        Lembrou a senha?{' '}
                        <Link to='/login' className="text-white hover:underline">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RequestPassword;
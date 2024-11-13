import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navibar from '../../components/header/Navibar';
import api from '../../services/api';



function ResetPassword() {
    const { token } = useParams();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            await api.post('/reset-password', {
                token,
                password: passwordRef.current.value,
            });
            alert('Senha redefinida com sucesso! Você pode fazer login agora.');
            navigate('/login'); // Redireciona para a página de login após redefinir a senha
        } catch (err) {
            alert(err.response?.data || 'Erro ao redefinir a senha.');
        }
    }

    return (
        <div>
            <Navibar />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700">
                <div className="bg-slate-950 rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">Definir Nova Senha</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            ref={passwordRef}
                            placeholder="Nova Senha"
                            type="password"
                            required
                            className="w-full p-3 border border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:none bg-transparent text-white"
                        />
                        <input
                            ref={confirmPasswordRef}
                            placeholder="Confirmar Nova Senha"
                            type="password"
                            required
                            className="w-full p-3 border border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:none bg-transparent text-white"
                        />
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-slate-950 font-semibold py-2 rounded-md hover:none transition duration-200"
                        >
                            Redefinir Senha
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">
                        <Link to='/' className="text-white hover:underline">
                            Voltar
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ResetPassword;
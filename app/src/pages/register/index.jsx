import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

function Register() {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-teal-700">
                <div className="bg-slate-950 rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">Cadastro</h2>
                    <form className="space-y-4">
                        <input
                            placeholder="Nome de usuário"
                            type="text"
                            className="w-full p-3 border border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:none bg-transparent"
                        />
                        <input
                            placeholder="Email"
                            type="email"
                            className="w-full p-3 border border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:none bg-transparent"
                        />
                        <input
                            placeholder="Senha"
                            type="password"
                            className="w-full p-3 border border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:none bg-transparent"
                        />
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-slate-950 font-semibold py-2 rounded-md hover:none transition duration-200"
                        >
                            Increva-se
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">
                        Já possui uma conta?{' '}
                        <Link to='/login' className="text-white hover:underline">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Register;
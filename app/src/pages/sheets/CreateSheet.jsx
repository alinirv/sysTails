
import Navibar from '../../components/header/Navibar';
import Footer from '../../components/footer/Footer';

const CreateSheet = () => {

    return (
        <div>
            <Navibar />
            <div className="flex flex-col min-h-screen items-center p-4 bg-gradient-to-b from-slate-900 to-teal-700 py-10">
                <div className="bg-slate-950 text-white max-w-screen-lg w-full items-center px-4 py-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">Novo Aventureiro</h3>

                </div>
            </div>
            <Footer />
        </div>
    );
}
export default CreateSheet;
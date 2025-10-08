import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';

const RequestSentPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto text-center bg-brand-gray p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
        <CheckCircleIcon className="w-16 h-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2 font-montserrat">Solicitação Enviada!</h1>
      <p className="text-gray-300 mb-8">Seu pedido foi enviado ao profissional. Você será notificado assim que ele aceitar o serviço e poderá prosseguir com o pagamento.</p>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          to="/dashboard"
          className="w-full max-w-xs bg-brand-red text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors"
        >
          Acompanhar no Painel
        </Link>
        <Link
          to="/"
          className="font-semibold text-gray-300 hover:text-white transition-colors"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default RequestSentPage;

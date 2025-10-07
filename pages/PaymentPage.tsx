import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findBookingById, confirmPayment } from '../services/api';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { LockClosedIcon } from '../components/icons/LockClosedIcon';

const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('card');
  const [processing, setProcessing] = useState(false);

  const booking = useMemo(() => findBookingById(bookingId!), [bookingId]);

  if (!booking) {
    return <div className="text-center p-10">Agendamento não encontrado.</div>;
  }

  const handlePayment = () => {
    setProcessing(true);
    // Simula a chamada a uma API de pagamento
    setTimeout(() => {
      confirmPayment(booking.id);
      setProcessing(false);
      navigate(`/confirmacao/${booking.id}`);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto bg-brand-gray p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-2 font-montserrat">Pagamento</h1>
      <p className="text-gray-400 mb-6">Finalize seu agendamento de forma segura.</p>
      
      <div className="bg-brand-dark p-4 rounded-lg mb-6 flex justify-between items-center">
        <span className="text-gray-300">Total a pagar</span>
        <span className="text-3xl font-bold text-brand-red">R$ {booking.totalValue.toFixed(2)}</span>
      </div>

      {/* Seleção de Método */}
      <div className="flex justify-center mb-6">
        <div className="bg-brand-light-gray rounded-lg p-1 flex">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${paymentMethod === 'card' ? 'bg-brand-red text-white' : 'text-gray-400'}`}
          >
            Cartão de Crédito
          </button>
          <button
            onClick={() => setPaymentMethod('pix')}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${paymentMethod === 'pix' ? 'bg-brand-red text-white' : 'text-gray-400'}`}
          >
            PIX
          </button>
        </div>
      </div>

      {/* Formulário do Cartão */}
      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="cardNumber">Número do Cartão</label>
            <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white" />
          </div>
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="cardName">Nome no Cartão</label>
            <input type="text" id="cardName" placeholder="Nome Completo" className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="cardExpiry">Validade</label>
              <input type="text" id="cardExpiry" placeholder="MM/AA" className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white" />
            </div>
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="cardCVC">CVC</label>
              <input type="text" id="cardCVC" placeholder="123" className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white" />
            </div>
          </div>
        </div>
      )}
      
      {/* Informações do PIX */}
      {paymentMethod === 'pix' && (
        <div className="text-center bg-brand-light-gray p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Pague com PIX</h3>
            <div className="flex justify-center mb-4">
                {/* Em um app real, aqui viria uma imagem de QRCode */}
                <div className="w-40 h-40 bg-white rounded-md flex items-center justify-center font-mono text-black">
                    [QRCode]
                </div>
            </div>
            <p className="text-gray-400">Escaneie o código com o app do seu banco.</p>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={processing}
        className="w-full mt-8 bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-500"
      >
        {processing ? (
          <>
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            Processando...
          </>
        ) : (
          <>
            <LockClosedIcon className="w-5 h-5" />
            {`Pagar R$ ${booking.totalValue.toFixed(2)}`}
          </>
        )}
      </button>
      <Link to={`/agendar/${booking.worker.id}/${booking.service.id}`} className="block text-center mt-4 text-gray-400 hover:text-white">
        &larr; Voltar
      </Link>
    </div>
  );
};

export default PaymentPage;
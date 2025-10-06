
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Vini Soluções Ágeis. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

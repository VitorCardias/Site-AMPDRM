import { useState } from 'react';
import logo from "../../assets/logos/logo_verde.svg"

import { 
    Menu, X, 
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Benefícios', href: '#beneficios' },
    { name: 'Documentos', href: '#documentos' },
    { name: 'Parceiros', href: '#parceiros' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <img src={logo} className='w-28'/>

        {/* Links do Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="text-gray-700 hover:text-primary-green transition duration-300"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contato" 
            className="bg-primary-green text-white py-2 px-5 rounded-full hover:bg-opacity-90 transition duration-300 shadow-sm"
          >
            Seja um Associado
          </a>
        </div>

        {/* Botão do Menu Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-primary-green" /> : <Menu className="w-6 h-6 text-primary-green" />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-primary-green transition duration-300"
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contato" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-primary-green text-white py-2 px-5 rounded-full text-center hover:bg-opacity-90 transition duration-300 shadow-sm"
            >
              Seja um Associado
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
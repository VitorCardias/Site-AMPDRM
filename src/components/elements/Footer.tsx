import logo from "../../assets/logos/logo_branca.png"

import { 
    Phone, Mail, MapPin 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-primary-green text-white pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Sobre */}
          <div className="flex flex-col gap-5 md:col-span-2 items-center justify-center">
            <img src={logo} className="w-48"/>
            <p className="text-gray-300 max-w-md">
              Associação de Moradores e Proprietários do Distrito Recanto Maestro.
              Promovendo a integração e zelando pela qualidade de vida desde 2011.
            </p>
          </div>
          
          {/* Coluna 2: Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Links Rápidos</h5>
            <ul className="space-y-2">
              <li><a href="#sobre" className="text-gray-300 hover:text-white">Sobre Nós</a></li>
              <li><a href="#beneficios" className="text-gray-300 hover:text-white">Benefícios</a></li>
              <li><a href="#documentos" className="text-gray-300 hover:text-white">Documentos</a></li>
              <li><a href="#parceiros" className="text-gray-300 hover:text-white">Parceiros</a></li>
            </ul>
          </div>
          
          {/* Coluna 3: Contato */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contato</h5>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Distrito Recanto Maestro, São João do Polêsine - RS</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span className="text-gray-300"> <a href="mailto:amrm@recantomaestro.com.br"> amrm@recantomaestro.com.br</a></span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span className="text-gray-300"><a href="https://wa.me/555596803636" target="_blank" rel="noopener noreferrer">(55) 9680-3636</a></span>
              </li>
            </ul>
          </div>

        </div>
        <div className="border-t border-white/20 pt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AMPRM. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
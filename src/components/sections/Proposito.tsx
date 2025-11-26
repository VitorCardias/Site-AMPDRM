import { 
    Target, Eye, Heart, 
} from 'lucide-react';

export const Proposito: React.FC = () => {
  return (
    <section id="proposito" className="py-20 md:py-20 bg-light-bg">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-green mb-16">
          O que nos Guia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Missão */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-left transform hover:-translate-y-2 transition-transform duration-300">
            <Target className="w-12 h-12 text-accent-gold mb-4" />
            <h3 className="text-2xl font-bold text-primary-green mb-3">Missão</h3>
            <p className="text-gray-600">
              Contribuir para a manutenção da limpeza, da ordem da vigilância e da autossustentabilidade, 
              zelando pela tranquilidade e bem-estar do Distrito Recanto Maestro (SJP).
            </p>
          </div>
          
          {/* Visão */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-left transform hover:-translate-y-2 transition-transform duration-300">
            <Eye className="w-12 h-12 text-accent-gold mb-4" />
            <h3 className="text-2xl font-bold text-primary-green mb-3">Visão</h3>
            <p className="text-gray-600">
              Ser um local de referência em termos de harmonia, tranquilidade 
              voltadas ao bem comum dos proprietários e moradores.
            </p>
          </div>
          
          {/* Valores */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-left transform hover:-translate-y-2 transition-transform duration-300">
            <Heart className="w-12 h-12 text-accent-gold mb-4" />
            <h3 className="text-2xl font-bold text-primary-green mb-3">Valores</h3>
            <p className="text-gray-600">
              Promover um estilo de vida em harmonia com a natureza, pautado 
              pela responsabilidade com o bem público e pelo respeito aos valores humanistas.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};
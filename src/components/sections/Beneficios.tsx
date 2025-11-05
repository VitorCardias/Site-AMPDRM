import { 
    Shield, Leaf, Droplet, 
} from 'lucide-react';

export const Beneficios: React.FC = () => {
  const beneficios = [
    {
      icon: Shield,
      title: 'Segurança e Vigilância',
      description: 'Manutenção de contrato com a Cindapa, garantindo vigilância constante nas ruas de acesso e residências para a sua tranquilidade.',
    },
    {
      icon: Leaf,
      title: 'Manutenção de Vias',
      description: 'Cuidado contínuo com as vias públicas, realizando roçadas, podas e mantendo o visual do local limpo e harmonioso.',
    },
    {
      icon: Droplet,
      title: 'Qualidade da Água',
      description: 'Gestão e manutenção dos poços e caixas de abastecimento, com higienização e desinfecção semestral para garantir água potável.',
    },
  ];

  return (
    <section id="beneficios" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-green mb-4">
            Benefícios para Associados
          </h2>
          <p className="text-lg text-gray-600">
            Nosso trabalho diário se reflete diretamente na qualidade de vida, 
            segurança e infraestrutura do Recanto Maestro.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {beneficios.map((item) => (
            <div key={item.title} className="p-8 rounded-lg shadow-md border-t-4 border-accent-gold">
              <item.icon className="w-12 h-12 text-primary-green mb-5" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
import {  
    FileText, Download, 
} from 'lucide-react';

export const Documentos: React.FC = () => {
  const documentos = [
    { name: 'Estatuto Social (Atualizado 2024)', href: '#' },
    { name: 'Ata da Última Assembleia', href: '#' },
    { name: 'Regulamento Interno', href: '#' },
  ];

  return (
    <section id="documentos" className="py-20 md:py-28 bg-light-bg">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Coluna de Texto */}
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-green mb-4">
              Transparência e Acesso
            </h2>
            <p className="text-lg text-gray-600">
              Acesse os principais documentos da associação. A transparência 
              é um pilar fundamental da nossa gestão.
            </p>
          </div>
          
          {/* Coluna dos Documentos */}
          <div className="space-y-4">
            {documentos.map((doc) => (
              <a 
                key={doc.name}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="w-6 h-6 text-accent-gold" />
                  <span className="text-lg text-gray-700 font-medium">{doc.name}</span>
                </div>
                <Download className="w-6 h-6 text-gray-400 group-hover:text-primary-green transition duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
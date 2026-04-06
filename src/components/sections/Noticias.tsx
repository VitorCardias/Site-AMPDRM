import { Titulo } from "../shared/Titulo";
import { Calendar } from 'lucide-react';

interface NoticiaCardProps {
  titulo: string;
  resumo: string;
  conteudo: string;
  data: string;
}

const NoticiaCard = ({ titulo, resumo, conteudo, data }: NoticiaCardProps) => {

  const phoneNumber = "555596803636"; // Substituir pelo número real no formato internacional
  const message = "Olá! Gostaria de mais informações."; // Mensagem padrão
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


  return (
    <div className="bg-white rounded-lg shadow-md border-t-4 border-accent-gold p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3 text-accent-gold">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-semibold">{data}</span>
      </div>
      
      <h3 className="text-xl font-bold text-primary-green mb-3 line-clamp-2">
        {titulo}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
        {resumo}
      </p>
      
      <div className="text-gray-700 text-sm space-y-2 mb-4 flex-grow">
        {conteudo}
      </div>
      
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <button className="text-accent-gold font-semibold hover:text-primary-green transition-colors duration-200">
            Saiba mais →
        </button>
      </a>
    </div>
  );
};

export const Noticias: React.FC = () => {
  const noticias: NoticiaCardProps[] = [
    {
      titulo: "Eleições AMPRM: Prazo para registro de chapas termina em 7 de abril",
      resumo: "Associados interessados em concorrer à Diretoria e ao Conselho Fiscal devem enviar requerimento por e-mail.",
      conteudo: `Prazo máximo: 07 de abril de 2026 (terça-feira)
      
Enviar para: amrm@recantomaestro.com.br

Destinatário: Sr. Almir Francisco Foletto (Presidente da Diretoria)

⏳ Atenção ao prazo! Não deixe para a última hora. Certifique-se de enviar a documentação dentro do prazo limite.`,
      data: "Abril 2026"
    },
    {
      titulo: "AMPRM convoca associados para Assembleia Geral Ordinária em 11 de abril",
      resumo: "Encontro definirá a nova Diretoria para o biênio 2026–2028 e a aprovação das contas do último ano.",
      conteudo: `📅 Data: 11 de abril de 2026 (segunda-feira)

📍 Local: Sala 4, AMF1 – Faculdade Antônio Meneghetti

⏰ Horário: 07h00 (1ª chamada) ou 07h30 (2ª chamada)

⚠️ Só podem votar associados adimplentes. Pode enviar representante com procuração.`,
      data: "Abril 2026"
    }
  ];

  return (
    <section id="noticias" className="py-20 md:py-28 bg-light-bg">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent-gold font-semibold">Fique por dentro</span>
          <Titulo className="text-3xl md:text-4xl font-bold mb-4 mt-2">
            Últimas Notícias
          </Titulo>
          <p className="text-lg text-gray-600">
            Acompanhe os principais eventos e informações da Associação de Moradores e Proprietários do Recanto Maestro.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {noticias.map((noticia) => (
            <NoticiaCard key={noticia.titulo} {...noticia} />
          ))}
        </div>
      </div>
    </section>
  );
};

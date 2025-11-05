import { Titulo } from "../shared/Titulo";

export const Sobre: React.FC = () => {
  return (
    <section id="sobre" className="py-5 md:py-5 bg-white w-full items-center justify-center">
      <div className="container mx-auto px-6 grid lg:grid-cols-1 gap-12 items-center">
        {/* Coluna do Texto */}
        <div className="text-gray-700 lg:w-5xl m-auto">
          <span className="text-accent-gold font-semibold">Nossa História</span>
          <Titulo className="text-3xl md:text-4xl font-bold mb-6 mt-2">
            Zelando pela comunidade desde 2011.
          </Titulo>
          <p className="mb-4 text-justify">
            Fundada em 2011, a Associação (originalmente AMRM) nasceu para promover a
            integração, qualidade de vida e bem-estar dos moradores, alicerçada nos
            pilares da segurança, cultura, organização e boa convivialidade. Ao longo dos anos, assumimos responsabilidades cruciais como o fornecimento
            e manutenção da água potável, a conservação das vias públicas e a
            garantia de tranquilidade através da vigilância contratada. Em 2024, atualizamos nosso estatuto e nos tornamos a 
            <strong> Associação de Moradores e Proprietários do Distrito Recanto Maestro (AMPRM)</strong>,
            reafirmando nosso compromisso com todos os membros da comunidade.
          </p>
        </div>
      </div>
    </section>
  );
};
import { Titulo } from "../shared/Titulo";
import imagem from "../../assets/hero.svg"
import { InitialCard } from "../cards/initialCard";
import arte from "../../assets/icons/arte.svg"
import natureza from "../../assets/icons/natureza.svg"
import organizacao from "../../assets/icons/organizacao.svg"
import seguranca from "../../assets/icons/seguranca.svg"

export const Hero = () => {
    return(
        // * MUDANÇA: Adicionado padding responsivo (px-6 py-16)
         <section className="flex w-full px-6 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row w-full max-w-6xl m-auto gap-12 lg:gap-16 items-center">
                <div className="flex flex-col items-center lg:items-start justify-center gap-8 w-full lg:w-1/2">
                    <Titulo className="text-center lg:text-left">Unindo pessoas, natureza e qualidade de vida</Titulo>
                    <p className="max-w-lg text-center lg:text-justify">A Associação de Moradores e Proprietários do Distrito Recanto Maestro trabalha para que você e sua família desfrutem de um lugar diferenciado,
                    bonito e com qualidade de vida. Nossa equipe é composta por moradores que almejam o melhor para nossa comunidade. 
                    Aqui, queremos unir num só espaço consciência coletiva, natureza e sustentabilidade.
                    </p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none justify-center">
                        <InitialCard imagem={organizacao}>Organização e Limpeza</InitialCard>
                        <InitialCard imagem={seguranca}>Segurança</InitialCard>
                        <InitialCard imagem={natureza}>Natureza</InitialCard>
                        <InitialCard imagem={arte}>Arte</InitialCard>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full lg:w-1/2">
                    <img src={imagem} alt="imagem apresentação" className="w-full h-auto rounded-lg shadow-lg"/>
                </div>
            </div>
        </section>
    );
}
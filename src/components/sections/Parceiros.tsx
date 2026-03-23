import type React from "react";
import { Container } from "../shared/Container";

// Configure seus logos aqui - apenas substitua os caminhos das imagens
const parceiros = [
  {
    id: 1,
    nome: "Associação Ontoarte",
    logo: "./AssociacaoOntoarte.svg",
  },
  {
    id: 2,
    nome: "DiPaolo ",
    logo: "./DiPaolo.svg",
  },
  {
    id: 3,
    nome: "Forma",
    logo: "./Forma.svg",
  },
  {
    id: 4,
    nome: "Orquestra Jovem",
    logo: "./OrquestraJovem.svg",
  },
  {
    id: 5,
    nome: "Termas Romanas",
    logo: "./TermasRomanas.svg",
  },
  {
    id: 6,
    nome: "Glauber",
    logo: "./Glauber.svg",
  },
];

export const Parceiros: React.FC = () => {
  return (
    <section id="parceiros" className="py-16 md:py-24 bg-white">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-primary-green mb-4 w-full text-center">
            Nossos Parceiros
        </h2>
        
        <div className="mt-12 md:mt-16">
          {/* Grid responsivo de logos */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
            {parceiros.map((parceiro) => (
              <div
                key={parceiro.id}
                className="w-full flex items-center justify-center p-4 transition-all duration-300 md:hover:scale-110"
              >
                <img src={parceiro.logo} alt={parceiro.nome} className="max-w-full h-auto max-h-40 md:max-h-62 object-contain md:grayscale md:hover:grayscale-0 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
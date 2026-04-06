import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { Beneficios } from "./components/sections/Beneficios";
import { Documentos } from "./components/sections/Documentos";
import { Hero } from "./components/sections/Hero";
import { Home } from "./components/sections/Home";
import { Noticias } from "./components/sections/Noticias";
import { Proposito } from "./components/sections/Proposito";
import { Sobre } from "./components/sections/Sobre";
import { LoadingScreen } from "./components/shared/LoadingScreen";
import { WhatsIcon } from "./components/elements/WhatsIcon";

import video from "./assets/videos/video_apresentacao.mp4"
import { Mapa } from "./components/sections/Mapa";
import { Parceiros } from "./components/sections/Parceiros";

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const preloadImage = (src: string) => {
          return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject; 
          });
      };

      // Lista de imagens que *precisam* ser carregadas
      const imagesToPreload = [
          video,
      ];

      // Usa Promise.all para esperar TODAS as imagens carregarem
      Promise.all(imagesToPreload.map(preloadImage))
          .then(() => {

               setTimeout(() => {
                  setIsLoading(false);
              }, 500); 
          })
          .catch((err) => {
              console.error("Falha ao pré-carregar imagens", err);
              setIsLoading(false); 
          });

  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Layout title="Associação de Moradores RM">
        <Home />
        <Hero />
        <Noticias />
        <Sobre />
        <Proposito />
        <Beneficios />
        <Parceiros />
        <Documentos />
        <Mapa />
      </Layout>
      <WhatsIcon />
    </>
  )
}

export default App

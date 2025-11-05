import { Layout } from "./components/Layout";
import { Beneficios } from "./components/sections/Beneficios";
import { Documentos } from "./components/sections/Documentos";
import { Hero } from "./components/sections/Hero";
import { Home } from "./components/sections/Home";
import { Proposito } from "./components/sections/Proposito";
import { Sobre } from "./components/sections/Sobre";

function App() {
  return (
    <Layout title="Associação de Moradores RM">
      <Home />
      <Hero />
      <Sobre />
      <Proposito />
      <Beneficios />
      <Documentos />
    </Layout>
  )
}

export default App

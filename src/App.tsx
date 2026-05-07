import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { Layout } from "./components/Layout";
import { Beneficios } from "./components/sections/Beneficios";
import { Hero } from "./components/sections/Hero";
import { Home } from "./components/sections/Home";
import { Noticias } from "./components/sections/Noticias";
import { Proposito } from "./components/sections/Proposito";
import { Sobre } from "./components/sections/Sobre";
import { WhatsIcon } from "./components/elements/WhatsIcon";

const Parceiros = lazy(() =>
  import("./components/sections/Parceiros").then((module) => ({ default: module.Parceiros }))
);
const Documentos = lazy(() =>
  import("./components/sections/Documentos").then((module) => ({ default: module.Documentos }))
);
const Mapa = lazy(() =>
  import("./components/sections/Mapa").then((module) => ({ default: module.Mapa }))
);

type LazyOnVisibleProps = {
  children: ReactNode;
  minHeight?: number;
};

const LazyOnVisible = ({ children, minHeight = 360 }: LazyOnVisibleProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={ref} style={!isVisible ? { minHeight } : undefined}>
      {isVisible ? children : null}
    </div>
  );
};

function App() {
  return (
    <>
      <Layout title="Associação de Moradores RM">
        <Home />
        <Hero />
        <Noticias />
        <Sobre />
        <Proposito />
        <Beneficios />
        <LazyOnVisible minHeight={420}>
          <Suspense fallback={null}>
            <Parceiros />
          </Suspense>
        </LazyOnVisible>
        <LazyOnVisible minHeight={520}>
          <Suspense fallback={null}>
            <Documentos />
          </Suspense>
        </LazyOnVisible>
        <LazyOnVisible minHeight={640}>
          <Suspense fallback={null}>
            <Mapa />
          </Suspense>
        </LazyOnVisible>
      </Layout>
      <WhatsIcon />
    </>
  );
}

export default App;

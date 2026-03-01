import { useState, useRef } from 'react';

export const Mapa: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const legendaItems = [
    { num: 1, nome: "Entrada Recanto Maestro" },
    { num: 2, nome: "Termas Romanas" },
    { num: 3, nome: "Agroturismo" },
    { num: 4, nome: "Agroturismo" },
    { num: 5, nome: "Donna Negócios Rurais" },
    { num: 6, nome: "Recanto Indústrias de Calçados" },
    { num: 7, nome: "Pólux Montagens Elétricas" },
    { num: 8, nome: "Construtora Schio" },
    { num: 9, nome: "Materiais de Construção Kunst" },
    { num: 10, nome: "AM Stile" },
    { num: 11, nome: "Lavanderia" },
    { num: 12, nome: "Di Paolo" },
    { num: 13, nome: "Casa do Recanto" },
    { num: 14, nome: "Agroturismo Recanto" },
    { num: 15, nome: "Fábrica de Azeite" },
    { num: 16, nome: "Hotel Recanto Business Center" },
    { num: 17, nome: "Avezzano Garden" },
    { num: 18, nome: "Centro de profissionais" },
    { num: 19, nome: "Condomínios residenciais" },
    { num: 20, nome: "Empório Valmar" },
    { num: 21, nome: "Ginásio" },
    { num: 22, nome: "Farmácia, Mercado e Pizzaria" },
    { num: 23, nome: "Antonio Meneghetti Faculdade" },
    { num: 24, nome: "Casa do Estudante Masc." },
    { num: 25, nome: "Casa do Estudante Fem." },
    { num: 26, nome: "Anfiteatro" },
    { num: 27, nome: "Sauna" },
    { num: 28, nome: "Meta" },
    { num: 29, nome: "Fundação Antonio Meneghetti" },
    { num: 30, nome: "Projeto Horta" },
    { num: 31, nome: "Galeria de Ontoarte" },
    { num: 32, nome: "Melodance" },
    { num: 33, nome: "Hotel Capo Zorial" },
    { num: 34, nome: "Zorial Di Giordana" },
    { num: 35, nome: "Orquestra Jovem Recanto Maestro" },
    { num: 36, nome: "Salão Branco" },
    { num: 37, nome: "SPA Terápica Zorial" },
    { num: 38, nome: "Vinícola Domus Mea" },
    { num: 39, nome: "Fábrica de Cosméticos" },
    { num: 40, nome: "Atelier Lygia Marques" },
    { num: 41, nome: "Pousada Recanto" },
    { num: 42, nome: "Associação de Moradores" },
  ];

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };
  
  const openModal = () => {
    setIsModalOpen(true);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Zoom com scroll do mouse
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(zoomLevel + delta, 0.5), 3);
    setZoomLevel(newZoom);
  };

  // Drag da imagem
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      <section id="Mapa" className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white w-full">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-green">
            Mapa do Recanto Maestro
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Mapa */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="rounded-lg shadow-xl bg-white p-4 relative group w-full max-w-xl">
                <img 
                  src="./mapa.svg" 
                  alt="Mapa do Recanto Maestro" 
                  className="w-full h-auto cursor-pointer rounded"
                  onClick={openModal}
                  style={{ display: 'block' }}
                />
                <div className="absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-10 transition-all flex items-center justify-center pointer-events-none">
                  <span className="bg-white px-4 py-2 rounded-lg text-sm font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    🔍 Clique para ampliar
                  </span>
                </div>
              </div>
            </div>

            {/* Legenda */}
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary-green border-b-2 border-primary-green pb-3">
                  Legenda
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {legendaItems.map((item) => (
                    <div 
                      key={item.num} 
                      className="flex items-start gap-3 p-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {item.num}
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed pt-1">
                        {item.nome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Zoom */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Botão Fechar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 bg-white hover:bg-gray-200 text-gray-800 rounded-full p-3 shadow-lg transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Controles de Zoom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-full shadow-lg flex items-center gap-2 p-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="hover:bg-gray-200 text-gray-800 rounded-full p-2 transition-colors"
                aria-label="Diminuir zoom"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="text-sm font-semibold text-gray-800 min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="hover:bg-gray-200 text-gray-800 rounded-full p-2 transition-colors"
                aria-label="Aumentar zoom"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetZoom();
                }}
                className="hover:bg-gray-200 text-gray-800 rounded-full px-3 py-2 transition-colors text-sm font-medium"
                aria-label="Resetar zoom"
              >
                Reset
              </button>
            </div>

            {/* Imagem com Zoom */}
            <div 
              ref={imageRef}
              className="w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{
                cursor: isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'default',
                overflow: zoomLevel > 1 ? 'hidden' : 'visible'
              }}
            >
              <div
                className="transition-transform duration-100"
                style={{ 
                  transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                  transformOrigin: 'center center',
                }}
              >
                <img 
                  src="./mapa.svg" 
                  alt="Mapa do Recanto Maestro - Ampliado" 
                  className="select-none"
                  style={{ 
                    maxWidth: 'min(80vw, 800px)',
                    maxHeight: 'min(80vh, 800px)',
                    width: 'auto',
                    height: 'auto',
                    display: 'block'
                  }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
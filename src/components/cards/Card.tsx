interface CardProps {
    children: React.ReactNode;
    imagem: string;
}

export const InitialCard = ({imagem, children}: CardProps) => { 
    return(
        // * MUDANÇAS:
        // 1. Removido 'w-55' (largura fixa).
        // 2. Adicionado 'w-full' para que o card ocupe o espaço
        //    que o grid (no componente Hero) der a ele.
        <div className="flex flex-row items-center justify-start gap-3 w-full">

            {/* * MUDANÇAS na Imagem:
              * 1. Adicionado um tamanho fixo (ex: 'w-10 h-10').
              * 2. Adicionado 'flex-shrink-0' para impedir que
              * a imagem seja espremida pelo texto.
              */}
            <img src={imagem} className="w-10 h-10 flex-shrink-0"/>

            <p>{children}</p>
        </div>
    );
}
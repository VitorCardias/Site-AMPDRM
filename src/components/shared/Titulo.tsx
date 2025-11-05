interface TituloProps {
    children: React.ReactNode;
    className?: string;
}

export const Titulo = ({children, className=""}: TituloProps) => {
    return(
        <p className={`font-bold color-title text-3xl ${className}`} >
            {children}
        </p>
    )
}
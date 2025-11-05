import logo from '../../assets/logos/logo_verde.svg';

interface LoadingScreenProps {
    isLoading: boolean;
}

export const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
    return (
        <div 
            className={`
                fixed inset-0 z-[100] flex items-center justify-center bg-gray-900 
                transition-opacity duration-500 ease-out
                ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
        >
            <div className="relative flex items-center justify-center">
                {/* Efeito Pulsante */}
                <div className="absolute h-24 w-24 animate-ping rounded-full bg-teal-500 opacity-30"></div>
                
                {/* Logo */}
                <img 
                    src={logo} 
                    alt="Carregando..." 
                    className="relative w-20 h-20" 
                />
            </div>
        </div>
    );
};
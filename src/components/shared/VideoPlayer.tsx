import { useRef } from "react";

interface VideoPlayerProps {
    src: string;
}

export const VideoPlayer = ({ src }: VideoPlayerProps) => {

    // referencia para o elemento "video"
    const videoRef = useRef<HTMLVideoElement>(null);

    // controla as propriedades do video
    const isMuted = true;
    const isLooping = true;

    return (
        <div className="flex flex-col items-center w-full">
            <div className="overflow-hidden w-full">
                <video 
                    ref={videoRef}
                    src={src}
                    muted={isMuted}
                    loop={isLooping}
                    autoPlay
                    playsInline
                    className="w-full"
                />
            </div>
        </div>
    );

}
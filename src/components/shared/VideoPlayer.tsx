import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
    src: string;
}

export const VideoPlayer = ({ src }: VideoPlayerProps) => {

    // referencia para o elemento "video"
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    // controla as propriedades do video
    const isMuted = true;
    const isLooping = true;

    useEffect(() => {
        const loadVideo = () => setShouldLoadVideo(true);
        const idleCallback = window.requestIdleCallback?.(loadVideo, { timeout: 1200 });
        const fallbackTimeout = window.setTimeout(loadVideo, 1200);

        return () => {
            if (idleCallback) window.cancelIdleCallback?.(idleCallback);
            window.clearTimeout(fallbackTimeout);
        };
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="overflow-hidden w-full bg-primary-green">
                {shouldLoadVideo ? (
                    <video 
                        ref={videoRef}
                        src={src}
                        muted={isMuted}
                        loop={isLooping}
                        autoPlay
                        playsInline
                        preload="metadata"
                        className="w-full"
                    />
                ) : (
                    <div className="w-full aspect-video" aria-label="Carregando vídeo de apresentação" />
                )}
            </div>
        </div>
    );

}

import videoLoop from "../../assets/videos/video_apresentacao.mp4"
import { VideoPlayer } from "../shared/VideoPlayer";

export const Home = () => {
    return (
        <section className="flex flex-col items-center w-full">
            <VideoPlayer src={videoLoop}/>
        </section>
    );
};
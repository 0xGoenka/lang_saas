import YouTube from "react-youtube";
import { useServices } from "../../services/Services";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { E_EVENT } from "../../constants/event";
import { Header } from "../../components/Header";
import { Feedback } from "./Feedback";
import { useObservable } from "micro-observables";

export const Video = () => {
  const { playerService, dbService } = useServices();
  const navigate = useNavigate();
  const { video_id } = useParams();
  const isPlaying = useObservable(playerService.isPlaying);

  console.log("video_id", video_id);

  useEffect(() => {
    playerService.videoId = video_id;
    E_EVENT.display_subtitle.add(navigate);
    return () => {
      E_EVENT.display_subtitle.remove();
    };
  }, [navigate]);

  if (!video_id) {
    navigate("/");
    return null;
  }

  return (
    <div className="relative flex flex-col h-screen justify-between">
      <Header
        text="Library"
        onClick={() => navigate("/")}
        right={
          <button
            className="ml-[8px] bg-transparent border border-grey text-white px-[8px] rounded-md"
            onClick={() => {
              dbService.removeVideoFromLibrary(video_id);
              navigate("/");
            }}
          >
            remove
          </button>
        }
      />
      <div className="relative justify-center content-center">
        <div className="mb-[16px]">
          {/* <div className="youtube-video z-10000 border-2 bg-transparent absolute h-[360px]"></div> */}
          <YouTube
            opts={opts}
            videoId={video_id}
            onReady={playerService.onPlayerReady}
            onStateChange={playerService.onStateChange}
            onError={(e: unknown) => console.error("Error", e)}
            iframeClassName="youtube-video"
          />
        </div>
        {!isPlaying && <Feedback />}
      </div>
      <div className="h-[1px]"></div>
    </div>
  );
};

const opts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    // controls: 0, // dont show control
    disablekb: 1, // disable keyboard
    iv_load_policy: 3, // disable annotations
  },
};

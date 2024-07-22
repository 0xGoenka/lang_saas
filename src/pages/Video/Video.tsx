import YouTube from "react-youtube";
import { useServices } from "../../services/Services";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { E_EVENT } from "../../constants/event";
import { Header } from "../../components/Header";

const id = "Ye8mB6VsUHw";

export const Video = () => {
  const { playerService } = useServices();
  const navigate = useNavigate();

  useEffect(() => {
    E_EVENT.display_subtitle.add(navigate);
    return () => {
      E_EVENT.display_subtitle.remove();
    };
  }, [navigate]);

  return (
    <div className="relative flex flex-col h-screen justify-between">
      <Header text="Library" />
      <div className="relative justify-center content-center">
        <div className="mb-[16px]">
          {/* <div className="youtube-video z-10000 border-2 bg-transparent absolute h-[360px]"></div> */}
          <YouTube
            opts={opts}
            videoId={id}
            onReady={playerService.onPlayerReady}
            onStateChange={playerService.onStateChange}
            onError={(e: unknown) => console.error("Error", e)}
            iframeClassName="youtube-video"
          />
        </div>
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

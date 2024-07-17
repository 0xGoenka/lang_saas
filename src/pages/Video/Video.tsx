import YouTube from "react-youtube";
import { useServices } from "../../services/Services";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";

const id = "Ye8mB6VsUHw";

export const Video = () => {
  const { playerService } = useServices();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("display_subtitle", () => {
      console.log("display_subtitle");
      navigate("/playagain");
    });

    return () => {
      window.removeEventListener("display_subtitle", () => {});
    };
  }, [navigate]);

  return (
    <div>
      <div className="relative justify-center content-center h-screen">
        <div className="youtube-video z-10000 border-2 border-green bg-transparent absolute"></div>
        {/* <video className="w-full h-full" src="/Ye8mB6VsUHw.mp4" /> */}
        <YouTube
          opts={opts}
          videoId={id}
          onReady={playerService.onPlayerReady}
          onStateChange={playerService.onStateChange}
          onError={(e) => console.error("Error", e)}
          iframeClassName="youtube-video"
        />
      </div>
      <PrimaryButton onClick={() => playerService.playVideoAt()}>
        Play
      </PrimaryButton>
    </div>
  );
};

const opts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    controls: 0, // dont show control
    disablekb: 1, // disable keyboard
    iv_load_policy: 3, // disable annotations
  },
};

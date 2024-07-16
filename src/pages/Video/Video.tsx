import YouTube from "react-youtube";
import { useServices } from "../../services/Services";
import { PrimaryButton } from "../../components/Button";
import { useObservable } from "micro-observables";

export const Video = () => {
  const { playerService } = useServices();
  const currentSubtitle = useObservable(playerService.currentSub);
  const id = "Ye8mB6VsUHw";

  return (
    <div>
      <div className="h-[390px] w-[640px] z-10000 border-2 border-green bg-transparent absolute"></div>
      <YouTube
        opts={opts}
        videoId={id}
        onReady={playerService.onPlayerReady}
        onStateChange={playerService.onStateChange}
      />

      <PrimaryButton onClick={() => playerService.playVideoAt(10)}>
        Play at 10s
      </PrimaryButton>
      <div>{currentSubtitle}</div>
    </div>
  );
};

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    controls: 0,
    autoplay: 1,
    disablekb: 1,
    iv_load_policy: 3,
  },
};

import { YouTubeProps } from "react-youtube";
import { cookieSubtitles } from "../subtitles/cookie";
import { WebVTTParser, VTTData } from "webvtt-parser";
import { observable } from "micro-observables";

export class PlayerService {
  player: any = null;
  parser = new WebVTTParser();
  extrait = 0;
  srt_array: VTTData | undefined = undefined;
  currentSub = observable("");
  constructor() {
    this.srt_array = this.parser.parse(cookieSubtitles, "metadata");
  }

  playVideoAt = (seconds: number) => {
    console.log("playVideoAt", this.srt_array, this.player);
    if (!this.player) throw Error("Player not ready");
    if (!this.srt_array) throw Error("Subtitles not ready");
    this.currentSub.set(this.srt_array.cues[this.extrait].text);
    // this.player.seekTo(current_srt.startTime, true);
    this.player.playVideo();
    this.player.hideVideoInfo();

    this.extrait++;
  };

  onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // access to player in all event handlers via event.target
    console.log("onStateChange", event.data, event.target.getCurrentTime());
    if (event.data === 3 && this.srt_array) {
      const current_srt = this.srt_array.cues[this.extrait];
      setTimeout(() => {
        console.log("pauseVideo");
        this.player.pauseVideo();
      }, (current_srt.endTime - current_srt.startTime) * 1000);
    }
  };

  onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    console.log("onPlayerReady", event);
    this.player = event.target;
  };
}

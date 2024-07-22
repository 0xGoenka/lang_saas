import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { cookieSubtitles } from "../subtitles/cookie";
import { WebVTTParser, VTTData, Cue } from "webvtt-parser";
import { observable, WritableObservable } from "micro-observables";
import { E_EVENT } from "../constants/event";

export class PlayerService {
  player: YouTubePlayer | null = null;
  isPlaying = observable(false);
  parser = new WebVTTParser();
  extrait = 0;
  srt_array: VTTData | undefined = undefined;
  currentSub: WritableObservable<Cue | null> = observable(null);

  constructor() {
    this.srt_array = this.parser.parse(cookieSubtitles, "metadata");
  }

  getSubtitleToPlay = () => {
    if (!this.srt_array) throw Error("Subtitles not ready");
    const currSub = this.srt_array.cues[this.extrait];
    this.currentSub.set(currSub);
  };

  playVideoAt = () => {
    console.log("playVideo");
    const currentSub = this.currentSub.get();
    if (!this.player) throw Error("Player not ready");
    if (!currentSub) throw Error("Subtitles not ready");

    this.isPlaying.set(true);
    this.player.playVideo();

    this.player.seekTo(currentSub.startTime, true);
    this.extrait++;
  };

  onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // access to player in all event handlers via event.target
    console.log("onStateChange", event.data, new Date().getTime());
    if (event.data === YouTube.PlayerState.PLAYING && this.srt_array) {
      console.log("YouTube.PlayerState.PLAYING");
      const current_srt = this.srt_array.cues[this.extrait];
      setTimeout(() => {
        console.log("pauseVideo");
        this.player.pauseVideo();
        E_EVENT.display_subtitle.dispatch();
        this.isPlaying.set(false);
      }, (current_srt.endTime - current_srt.startTime) * 1000);
    }
  };

  onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    console.log("onPlayerReady", event, new Date().getTime());

    this.player = event.target;
    this.getSubtitleToPlay();
  };
}

// PLAYER STATE
// -1 (unstarted)
// 0 (ended)
// 1 (playing)
// 2 (paused)
// 3 (buffering)
// 5 (video cued).

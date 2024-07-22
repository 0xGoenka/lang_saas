import { PlayAgain } from "./../pages/Video/PlayAgain";
import { EngineService } from "./engine.service";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { WebVTTParser, Cue } from "webvtt-parser";
import { observable, WritableObservable } from "micro-observables";
import { E_EVENT } from "../constants/event";

export class PlayerService {
  engineService: EngineService;

  player: YouTubePlayer | null = null;
  isPlaying = observable(false);
  parser = new WebVTTParser();
  extrait = 0;
  currentSub: WritableObservable<Cue | null> = observable(null);
  currentSubId: WritableObservable<number | null> = observable(null);
  isPlayingAgain = observable(false);

  constructor(engineService: EngineService) {
    this.engineService = engineService;
  }

  async getSubtitleToPlay() {
    const currSub = await this.engineService.buildQuestionQueue("Ye8mB6VsUHw");
    if (!currSub) throw Error("No subtitle to play");
    this.currentSubId.set(currSub[0].id);
    this.currentSub.set(currSub[0].subtitle);
  }

  async playAgain() {
    this.isPlayingAgain.set(true);
  }

  async playVideoAt() {
    if (!this.isPlayingAgain.get()) await this.getSubtitleToPlay();
    const currentSub = this.currentSub.get();
    if (!this.player) throw Error("Player not ready");
    if (!currentSub) throw Error("Subtitles not ready");

    this.isPlaying.set(true);
    this.player.playVideo();

    this.player.seekTo(currentSub.startTime, true);
    this.extrait++;
  }

  onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // access to player in all event handlers via event.target
    console.log("onStateChange", event.data, new Date().getTime());
    if (event.data === YouTube.PlayerState.PLAYING) {
      const currentSub = this.currentSub.get();
      if (!currentSub) throw Error("Subtitles not ready");
      setTimeout(() => {
        this.player.pauseVideo();
        E_EVENT.display_subtitle.dispatch();
        this.isPlaying.set(false);
      }, (currentSub.endTime - currentSub.startTime) * 1000);
    }
  };

  onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    this.player = event.target;
  };
}

// PLAYER STATE
// -1 (unstarted)
// 0 (ended)
// 1 (playing)
// 2 (paused)
// 3 (buffering)
// 5 (video cued).

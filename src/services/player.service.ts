import { EngineService } from "./engine.service";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { WebVTTParser, Cue } from "webvtt-parser";
import { observable, WritableObservable } from "micro-observables";
import { E_EVENT } from "../constants/event";
import { NavigateFunction } from "react-router-dom";

export class PlayerService {
  engineService: EngineService;

  player: YouTubePlayer | null = null;
  isPlaying = observable(false);
  parser = new WebVTTParser();
  currentSub: WritableObservable<Cue | null> = observable(null);
  currentSubId: WritableObservable<number | null> = observable(null);
  isPlayingAgain = observable(false);
  videoId: string | undefined = undefined;

  constructor(engineService: EngineService) {
    this.engineService = engineService;
  }

  async getSubtitleToPlay() {
    if (!this.videoId) throw Error("No video id");
    const currSub = await this.engineService.buildQuestionQueue(this.videoId);
    if (!currSub) throw Error("No subtitle to play");
    this.currentSubId.set(currSub[0].id);
    this.currentSub.set(currSub[0].subtitle);
  }

  async playAgain(navigate: NavigateFunction) {
    this.isPlayingAgain.set(true);
    navigate("/video/" + this.videoId);
  }

  async playVideoAt() {
    if (this.isPlaying.get()) return;
    if (!this.isPlayingAgain.get()) await this.getSubtitleToPlay();
    const currentSub = this.currentSub.get();
    if (!this.player) throw Error("Player not ready");
    if (!currentSub) throw Error("Subtitles not ready");

    this.player.playVideo();
    this.isPlaying.set(true);
    this.player.seekTo(currentSub.startTime, true);
  }

  onStateChange: YouTubeProps["onStateChange"] = async (event) => {
    console.log({ event });
    // access to player in all event handlers via event.target
    if (event.data === YouTube.PlayerState.PLAYING) {
      console.log("PLAYING");
      await this.playVideoAt();
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

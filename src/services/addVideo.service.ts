import { NavigateFunction } from "react-router-dom";
import { DBService } from "./db.service";
import { Entry } from "@plussub/srt-vtt-parser/dist/types";
import { observable } from "micro-observables";
import toast from "react-hot-toast";
import { parse } from "@plussub/srt-vtt-parser";
import getYouTubeID from "get-youtube-id";

export class AddVideoService {
  subtitles = observable<Entry[]>([]);
  native_subtitles = observable<Entry[]>([]);
  videoName = observable("");
  videoUrl = observable("");
  dbService: DBService;

  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  setSubtitles = async (files: Blob[]) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      try {
        if (!text || typeof text !== "string") {
          toast.error("File look invalid");
          return;
        }
        const { entries } = parse(text);
        console.log({ entries });
        this.subtitles.set(entries);
      } catch (error) {
        console.log("error", error);
        toast.error("File look invalid");
        return;
      }
    };
    reader.readAsText(files[0]);
  };

  setNativeSubtitles = async (files: Blob[]) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      try {
        if (!text || typeof text !== "string") {
          toast.error("File look invalid");
          return;
        }
        const { entries } = parse(text);
        console.log({ entries });
        this.native_subtitles.set(entries);
      } catch (error) {
        console.log("error", error);
        toast.error("File look invalid");
        return;
      }
    };
    reader.readAsText(files[0]);
  };

  setVideoName = async (name: string) => {
    this.videoName.set(name);
  };

  setVideoUrl = async (url: string) => {
    this.videoUrl.set(url);
  };

  validateYoutubeUrl = async () => {
    const url = this.videoUrl.get();

    try {
      const id = await getYouTubeID(url);
      if (!id) {
        throw new Error("Video url look invalid");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Video url look invalid");
      throw new Error("Video url look invalid");
    }
  };

  validateVideoName = async () => {
    const name = this.videoName.get();
    if (!name || name.length < 3) {
      toast.error("Video name look invalid");
      throw new Error("Video name look invalid");
    }
  };

  validateSubtitles = async () => {
    const subtitles = this.subtitles.get();
    if (!subtitles || subtitles.length < 1) {
      toast.error("Subtitles look invalid");
      throw new Error("Subtitles look invalid");
    }
  };

  validateNativeSubtitles = async () => {
    const subtitles = this.native_subtitles.get();
    if (!subtitles || subtitles.length < 1) {
      toast.error("Native subtitles look invalid");
      throw new Error("Native subtitles look invalid");
    }
  };

  addVideoToLibrary = async (navigate: NavigateFunction) => {
    await this.validateSubtitles();
    await this.validateVideoName();
    await this.validateYoutubeUrl();
    await this.validateNativeSubtitles();

    const videoId = getYouTubeID(this.videoUrl.get());

    if (!videoId) {
      toast.error("Video url look invalid");
      throw new Error("Video url look invalid");
    }

    console.log("add video to library");

    try {
      await this.dbService.addVideoToLibrary(
        videoId,
        this.videoName.get(),
        this.subtitles.get(),
        this.native_subtitles.get()
      );
      this.videoName.set("");
      this.videoUrl.set("");
      this.subtitles.set([]);
      this.native_subtitles.set([]);
      navigate("/");
      toast.success("Video added to library");
    } catch (error) {
      console.log("error", error);
      toast.error("Error adding video to library");
      throw new Error("Error adding video to library");
    }
  };
}

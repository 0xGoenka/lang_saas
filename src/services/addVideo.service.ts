import { DBService } from "./db.service";
import { Entry } from "@plussub/srt-vtt-parser/dist/types";
import { observable } from "micro-observables";
import toast from "react-hot-toast";
import { parse } from "@plussub/srt-vtt-parser";
import getYouTubeID from "get-youtube-id";

export class AddVideoService {
  subtitles = observable<Entry[]>([]);
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

  setVideoName = async (name: string) => {
    this.videoName.set(name);
  };

  setVideoUrl = async (url: string) => {
    this.videoUrl.set(url);
    try {
      const id = await getYouTubeID(url);
      if (!id) {
        toast.error("Video url look invalid");
        return;
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Video url look invalid");
      return;
    }
  };

  validateYoutubeUrl = async () => {
    const url = this.videoUrl.get();

    try {
      const id = await getYouTubeID(url);
      if (!id) {
        toast.error("Video url look invalid");
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

  addVideoToLibrary = async () => {
    await this.validateSubtitles();
    await this.validateVideoName();
    await this.validateYoutubeUrl();

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
        this.subtitles.get()
      );
      this.videoName.set("");
      this.videoUrl.set("");
      this.subtitles.set([]);
    } catch (error) {
      console.log("error", error);
      toast.error("Error adding video to library");
      throw new Error("Error adding video to library");
    }
  };
}

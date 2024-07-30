import { Card } from "ts-fsrs";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Dexie, { InsertType, type EntityTable } from "dexie";
import { Cue } from "webvtt-parser";
import { initDbWithDummyData } from "./initDb";

export interface Video {
  id: number;
  video_id: string;
  name: string;
  url: string;
}

export interface Subtitle {
  id: number;
  video_id: string;
  subtitle: Cue;
  fsrsCard: Card;
}

export const db = new Dexie("database") as Dexie & {
  videos: EntityTable<
    Video,
    "id" // primary key "id" (for the typings only)
  >;
  subtitles: EntityTable<
    Subtitle,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  videos: "++id, video_id, name, url", // primary key "id" (for the runtime!)
  subtitles: "++id, video_id, subtitle, difficulty",
});

// fill db with dummy data
initDbWithDummyData();

export class DBService {
  constructor() {}

  bulkAddSubtitle = async (subtitles: InsertType<Subtitle, "id">[]) => {
    return await db.subtitles.bulkAdd(subtitles);
  };

  addVideo = async (video_id: string, name: string) => {
    const videoExists = await db.videos.get({ video_id });
    if (videoExists) throw new Error("Video already exists");

    return await db.videos.add({
      video_id,
      name,
      url: "https://www.youtube.com/watch?v=" + video_id,
    });
  };

  getVideos = async () => {
    return await db.videos.toArray();
  };

  getVideoIdFromSubtitle = async (subtitle_id: number) => {
    const subtitle = await db.subtitles.get({ id: subtitle_id });
    if (!subtitle) return null;
    return subtitle.video_id;
  };

  getSubtitlesFromVideoId = async (video_id: string) => {
    const subtitles = await db.subtitles
      .where("video_id")
      .equals(video_id)
      .toArray();

    console.log(subtitles);
    return subtitles;
  };

  updateSubtitle = async (id: number, fsrsCard: Card) => {
    try {
      // @ts-expect-error
      await db.subtitles.update(id, { fsrsCard });
    } catch (e) {
      console.error(e);
    }
  };
}

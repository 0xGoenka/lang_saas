import { Card, createEmptyCard } from "ts-fsrs";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Dexie, { InsertType, type EntityTable } from "dexie";
import { Entry } from "@plussub/srt-vtt-parser/dist/types";
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
  subtitle: Entry;
  fsrsCard: Card;
}

export interface NativeSubtitle {
  id: number;
  video_id: string;
  subtitle: Entry;
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
  native_subtitles: EntityTable<
    NativeSubtitle,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(2).stores({
  videos: "++id, video_id, name, url", // primary key "id" (for the runtime!)
  subtitles: "++id, video_id, subtitle, difficulty",
  native_subtitles: "++id, video_id, subtitle, difficulty",
});

// fill db with dummy data
initDbWithDummyData();

export class DBService {
  constructor() {}

  bulkAddSubtitle = async (subtitles: InsertType<Subtitle, "id">[]) => {
    return await db.subtitles.bulkAdd(subtitles);
  };

  addVideoToLibrary = async (
    video_id: string,
    name: string,
    subtitles: Entry[],
    nativeSubtitles: Entry[]
  ) => {
    const videoExists = await db.videos.get({ video_id });
    if (videoExists) throw new Error("Video already exists");

    try {
      await db.videos.add({
        video_id,
        name,
        url: "https://www.youtube.com/watch?v=" + video_id,
      });

      const formatedSub = subtitles.map((sub) => ({
        video_id,
        subtitle: sub,
        fsrsCard: createEmptyCard(new Date()),
      }));

      const formatedNativeSub = nativeSubtitles.map((sub) => ({
        video_id,
        subtitle: sub,
      }));

      await db.native_subtitles.bulkAdd(formatedNativeSub);
      await db.subtitles.bulkAdd(formatedSub);
    } catch {
      throw new Error("Error adding video to library");
    }
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

  getMatchingNativeSubtitle = async (subtitle: Subtitle, video_id: string) => {
    const nativeSubtitle = await db.native_subtitles
      .where("video_id")
      .equals(video_id)
      .and((native_sub) => native_sub.subtitle.from === subtitle.subtitle.from)
      .toArray();
    if (!nativeSubtitle) return null;
    console.log({ nativeSubtitle });
    return nativeSubtitle;
  };

  getNativeSubtitlesFromVideoId = async (video_id: string) => {
    const subtitles = await db.subtitles
      .where("video_id")
      .equals(video_id)
      .toArray();

    console.log(subtitles);
    return subtitles;
  };

  updateSubtitle = async (id: number, fsrsCard: Card) => {
    try {
      await db.subtitles.update(id, { fsrsCard });
    } catch (e) {
      console.error(e);
    }
  };

  removeVideoFromLibrary = async (video_id: string) => {
    try {
      await db.videos.where("video_id").equals(video_id).delete();
      await db.subtitles.where("video_id").equals(video_id).delete();
      await db.native_subtitles.where("video_id").equals(video_id).delete();
    } catch (e) {
      console.error(e);
    }
  };
}

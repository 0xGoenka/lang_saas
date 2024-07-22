/* eslint-disable @typescript-eslint/ban-ts-comment */
import Dexie, { type EntityTable } from "dexie";
import { E_Difficulty } from "../constants/contants";
import { Cue, WebVTTParser } from "webvtt-parser";
import { cookieSubtitles } from "../subtitles/cookie";

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
  difficulty: string;
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

const parser = new WebVTTParser();
const { cues } = parser.parse(cookieSubtitles, "metadata");
const formatedCues = cues.map((cue) => ({
  video_id: "Ye8mB6VsUHw",
  subtitle: cue,
  difficulty: E_Difficulty.TOO_HARD,
}));

db.videos.count().then((count) => {
  if (count === 0) {
    db.videos.add({
      video_id: "Ye8mB6VsUHw",
      name: "Sesame Street: Cookie Monster Sings C is for Cookie",
      url: "https://www.youtube.com/watch?v=Ye8mB6VsUHw",
    });
  }
});

db.subtitles.count().then((count) => {
  if (count === 0) {
    db.subtitles.bulkAdd(formatedCues);
  }
});

export class DBService {
  constructor() {}

  getVideos = async () => {
    return await db.videos.toArray();
  };

  getVideoIdFromSubtitle = async (subtitle_id: number) => {
    const subtitle = await db.subtitles.get({ id: subtitle_id });
    if (!subtitle) return null;
    return subtitle.video_id;
  };

  getSubtitles = async (video_id: string) => {
    const subtitles = await db.subtitles
      .where("video_id")
      .equals(video_id)
      .toArray();

    console.log(subtitles);
    return subtitles;
  };

  getSubtitlesWithDifficulty = async (
    video_id: string,
    difficulty: E_Difficulty
  ) => {
    const subtitles = await db.subtitles
      .where("video_id")
      .equals(video_id)
      .and((subtitle) => subtitle.difficulty === difficulty)
      .toArray();

    console.log("getSubtitlesWithDifficulty", difficulty, subtitles);
    return subtitles;
  };

  updateSubtitleDifficulty = async (id: number, difficulty: E_Difficulty) => {
    try {
      // @ts-expect-error
      await db.subtitles.update(id, { difficulty });
    } catch (e) {
      console.error(e);
    }
  };
}

import { createEmptyCard } from "ts-fsrs";
import { WebVTTParser } from "webvtt-parser";
import { db } from "./db.service";
import { cookieSubtitles } from "../subtitles/cookie";

export const initDbWithDummyData = async () => {
  const parser = new WebVTTParser();
  const { cues } = parser.parse(cookieSubtitles, "metadata");
  const formatedCues = cues.map((cue) => ({
    video_id: "Ye8mB6VsUHw",
    subtitle: cue,
    fsrsCard: createEmptyCard(new Date()),
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
};

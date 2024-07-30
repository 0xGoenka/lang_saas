import { createEmptyCard } from "ts-fsrs";
import { db } from "./db.service";
import { parse } from "@plussub/srt-vtt-parser";
import { kidCold } from "./../subtitles/kidCold";
import { london } from "../subtitles/london";
import { worse } from "../subtitles/worse";
import { lawnGrass } from "../subtitles/lawnGrass";

export const initDbWithDummyData = async () => {
  const { entries: kidColdEntries } = parse(kidCold);
  const { entries: londonEntries } = parse(london);
  const { entries: worseEntries } = parse(worse);
  const { entries: lawnGrassEntries } = parse(lawnGrass);

  const formatedCuesKidCold = kidColdEntries.map((cue) => ({
    video_id: "zpcI_g_zrpk",
    subtitle: cue,
    fsrsCard: createEmptyCard(new Date()),
  }));

  const formatedCuesLondon = londonEntries.map((cue) => ({
    video_id: "zFPdxSX_QQE",
    subtitle: cue,
    fsrsCard: createEmptyCard(new Date()),
  }));

  const formatedCuesWorse = worseEntries.map((cue) => ({
    video_id: "DHXBacEH0qo",
    subtitle: cue,
    fsrsCard: createEmptyCard(new Date()),
  }));

  const formatedCuesLawnGrass = lawnGrassEntries.map((cue) => ({
    video_id: "bR5kIPwg6_Q",
    subtitle: cue,
    fsrsCard: createEmptyCard(new Date()),
  }));

  db.videos.count().then((count) => {
    if (count === 1) {
      db.videos.delete(1);
      db.subtitles.delete(1);
    }

    if (count === 0) {
      db.videos.add({
        video_id: "zpcI_g_zrpk",
        name: "Why kids don’t get as cold as adults do",
        url: "https://www.youtube.com/watch?v=zpcI_g_zrpk",
      });
      db.videos.add({
        video_id: "zFPdxSX_QQE",
        name: "London, is prone to severe flooding",
        url: "https://www.youtube.com/watch?v=zFPdxSX_QQE",
      });
      db.videos.add({
        video_id: "DHXBacEH0qo",
        name: "Why everything you buy is worse now",
        url: "https://www.youtube.com/watch?v=DHXBacEH0qo",
      });
      db.videos.add({
        video_id: "bR5kIPwg6_Q",
        name: "Why grass lawns keep you warm",
        url: "https://www.youtube.com/watch?v=bR5kIPwg6_Q",
      });
    }
  });

  db.subtitles.count().then((count) => {
    if (count === 0) {
      db.subtitles.bulkAdd(formatedCuesKidCold);
      db.subtitles.bulkAdd(formatedCuesLondon);
      db.subtitles.bulkAdd(formatedCuesWorse);
      db.subtitles.bulkAdd(formatedCuesLawnGrass);
    }
  });
};

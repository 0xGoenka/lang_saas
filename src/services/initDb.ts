import { createEmptyCard } from "ts-fsrs";
import { db } from "./db.service";
import { parse } from "@plussub/srt-vtt-parser";
import { kidCold_en, kidCold_fr } from "../subtitles/kidCold";
import { worse_en, worse_fr } from "../subtitles/worse";

export const initDbWithDummyData = async () => {
  const { entries: kidColdEntries_en } = parse(kidCold_en);
  const { entries: worseEntries_en } = parse(worse_en);
  const { entries: kidColdEntries_fr } = parse(kidCold_fr);
  const { entries: worseEntries_fr } = parse(worse_fr);

  if (localStorage.getItem("init") === "true") {
    return;
  }
  localStorage.setItem("init", "true");

  const formatedCuesKidCold_en = kidColdEntries_en.map((cue) => ({
    video_id: "zpcI_g_zrpk",
    subtitle: cue,
    fsrsCard: createEmptyCard(new Date()),
  }));

  const formatedCuesKidCold_fr = kidColdEntries_fr.map((cue) => ({
    video_id: "zpcI_g_zrpk",
    subtitle: cue,
    fsrsCard: createEmptyCard(new Date()),
  }));

  const formatedCuesWorse_en = worseEntries_en.map((cue) => ({
    video_id: "DHXBacEH0qo",
    subtitle: cue,
    fsrsCard: createEmptyCard(new Date()),
  }));

  const formatedCuesWorse_fr = worseEntries_fr.map((cue) => ({
    video_id: "DHXBacEH0qo",
    subtitle: cue,
    fsrsCard: createEmptyCard(new Date()),
  }));

  db.videos.count().then((count) => {
    if (count === 0) {
      db.videos.add({
        video_id: "zpcI_g_zrpk",
        name: "Why kids don’t get as cold as adults do [English-French]",
        url: "https://www.youtube.com/watch?v=zpcI_g_zrpk",
      });
      db.videos.add({
        video_id: "DHXBacEH0qo",
        name: "Why everything you buy is worse now [English-French]",
        url: "https://www.youtube.com/watch?v=DHXBacEH0qo",
      });
    }
  });

  db.subtitles.count().then((count) => {
    if (count === 0) {
      db.subtitles.bulkAdd(formatedCuesKidCold_en);
      db.subtitles.bulkAdd(formatedCuesWorse_en);
    }
  });

  db.native_subtitles.count().then((count) => {
    if (count === 0) {
      db.native_subtitles.bulkAdd(formatedCuesKidCold_fr);
      db.native_subtitles.bulkAdd(formatedCuesWorse_fr);
    }
  });
};

import { NavigateFunction } from "react-router-dom";
import { E_Difficulty } from "../constants/contants";
import { DBService } from "./db.service";
import { shuffleArray } from "../utils/shuffleArray";

export class EngineService {
  dbService: DBService;
  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  answerQuestion = async (
    subtitleId: number | null,
    difficulty: E_Difficulty,
    navigate: NavigateFunction
  ) => {
    if (!subtitleId) throw Error("No subtitleId");
    this.updateDifficulty(subtitleId, difficulty);
    const videoId = await this.dbService.getVideoIdFromSubtitle(subtitleId);
    navigate("/video/" + videoId);
  };

  getQuestion = async (video_id: string, difficulty: E_Difficulty) => {
    const subtitles = await this.dbService.getSubtitlesWithDifficulty(
      video_id,
      difficulty
    );
    const randomIndex = Math.floor(Math.random() * subtitles.length);
    return subtitles[randomIndex];
  };

  buildQuestionQueue = async (video_id: string) => {
    const tooHardSubtitles = await this.dbService.getSubtitlesWithDifficulty(
      video_id,
      E_Difficulty.TOO_HARD
    );
    const hardSubtitles = await this.dbService.getSubtitlesWithDifficulty(
      video_id,
      E_Difficulty.HARD
    );
    const okSubtitles = await this.dbService.getSubtitlesWithDifficulty(
      video_id,
      E_Difficulty.OK
    );
    const easySubtitles = await this.dbService.getSubtitlesWithDifficulty(
      video_id,
      E_Difficulty.EASY
    );

    shuffleArray(tooHardSubtitles);
    shuffleArray(hardSubtitles);
    shuffleArray(okSubtitles);
    shuffleArray(easySubtitles);

    const questionQueue = [
      ...tooHardSubtitles.slice(0, 3),
      ...hardSubtitles.slice(0, 3),
      ...okSubtitles.slice(0, 3),
    ];

    shuffleArray(questionQueue);
    return questionQueue;
  };

  updateDifficulty = async (subtitle_id: number, difficulty: E_Difficulty) => {
    return await this.dbService.updateSubtitleDifficulty(
      subtitle_id,
      difficulty
    );
  };
}

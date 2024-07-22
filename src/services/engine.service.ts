import { NavigateFunction } from "react-router-dom";
import { E_Difficulty } from "../constants/contants";
import { DBService } from "./db.service";
import { shuffleArray } from "../utils/shuffleArray";

export class EngineService {
  dbService: DBService;
  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  answerQuestion = (difficulty: E_Difficulty, navigate: NavigateFunction) => {
    switch (difficulty) {
      case E_Difficulty.EASY:
        break;
      case E_Difficulty.OK:
        break;
      case E_Difficulty.HARD:
        break;
      case E_Difficulty.TOO_HARD:
        break;
    }
    navigate("/");
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
}

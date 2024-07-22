import { useObservable } from "micro-observables";
import { useServices } from "../../services/Services";
import { TertiaryButton } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { E_Difficulty } from "../../constants/contants";
import { Header } from "../../components/Header";

export const Feedback = () => {
  const { playerService, engineService } = useServices();
  const subtitle = useObservable(playerService.currentSub);
  const subtitleId = useObservable(playerService.currentSubId);
  const navigate = useNavigate();

  console.log("Feedback subtitle", subtitle);

  return (
    <div className="relative flex flex-col h-screen justify-between">
      <Header text="Library" onClick={() => navigate("/")} />
      <div className="text-white text-center">{subtitle?.text}</div>
      <div className="justify-center items-center flex mb-[50px]">
        <div className="justify-evenly">
          <div className="m-[4px] mb-[8px]">
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  engineService.answerQuestion(
                    subtitleId,
                    E_Difficulty.TOO_HARD,
                    navigate
                  );
                }}
              >
                Too hard
                <div className="mr-[8px] text-xs font-medium	">
                  Will reappear in 1mn
                </div>
              </TertiaryButton>
            </span>
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  engineService.answerQuestion(
                    subtitleId,
                    E_Difficulty.HARD,
                    navigate
                  );
                }}
              >
                Hard
                <div className="text-xs font-medium	">Will reappear in 6mn</div>
              </TertiaryButton>
            </span>
          </div>
          <div className="m-[4px]">
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  engineService.answerQuestion(
                    subtitleId,
                    E_Difficulty.OK,
                    navigate
                  );
                }}
              >
                Ok
                <div className="text-xs font-medium	">Will reappear in 10mn</div>
              </TertiaryButton>
            </span>
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  engineService.answerQuestion(
                    subtitleId,
                    E_Difficulty.EASY,
                    navigate
                  );
                }}
              >
                Easy
                <div className="text-xs font-medium	">Won’t reappear</div>
              </TertiaryButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

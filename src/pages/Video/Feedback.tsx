import { useObservable } from "micro-observables";
import { useServices } from "../../services/Services";
import { TertiaryButton } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { E_Difficulty } from "../../constants/contants";

export const Feedback = () => {
  const { playerService, engineService } = useServices();
  const subtitle = useObservable(playerService.currentSub);
  const navigate = useNavigate();

  console.log("Feedback subtitle", subtitle);

  return (
    <div>
      <div className="text-white">{subtitle?.text}</div>
      <div className="justify-evenly">
        <div className="mb-[8px]">
          <span className="mr-[8px]">
            <TertiaryButton
              onClick={() => {
                engineService.answerQuestion(E_Difficulty.TOO_HARD, navigate);
              }}
            >
              Too hard
              <div className=" mr-[8px] text-xs font-medium	">
                Will reappear in 1mn
              </div>
            </TertiaryButton>
          </span>
          <TertiaryButton
            onClick={() => {
              engineService.answerQuestion(E_Difficulty.HARD, navigate);
            }}
          >
            Hard
            <div className="text-xs font-medium	">Will reappear in 6mn</div>
          </TertiaryButton>
        </div>

        <div>
          <span className="mr-[8px]">
            <TertiaryButton
              onClick={() => {
                engineService.answerQuestion(E_Difficulty.OK, navigate);
              }}
            >
              Ok
              <div className="  text-xs font-medium	">Will reappear in 10mn</div>
            </TertiaryButton>
          </span>
          <TertiaryButton
            onClick={() => {
              engineService.answerQuestion(E_Difficulty.EASY, navigate);
            }}
          >
            Easy
            <div className="text-xs font-medium	">Won’t reappear</div>
          </TertiaryButton>
        </div>
      </div>
    </div>
  );
};

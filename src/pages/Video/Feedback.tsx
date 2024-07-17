import { useObservable } from "micro-observables";
import { useServices } from "../../services/Services";
import { TertiaryButton } from "../../components/Button";

export const Feedback = () => {
  const { playerService } = useServices();
  const subtitle = useObservable(playerService.currentSub);

  return (
    <div>
      Feedback
      <div className="text-white">{subtitle?.text}</div>
      <TertiaryButton onClick={() => {}}>Too hard</TertiaryButton>
      <TertiaryButton onClick={() => {}}>Hard</TertiaryButton>
      <TertiaryButton onClick={() => {}}>Ok</TertiaryButton>
      <TertiaryButton onClick={() => {}}>
        Easy
        <div className="text-xs ">Won’t reappear</div>
      </TertiaryButton>
    </div>
  );
};

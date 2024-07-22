import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { useServices } from "../../services/Services";

export const PlayAgain = () => {
  const navigate = useNavigate();
  const { playerService } = useServices();

  return (
    <div>
      PlayAgain
      <SecondaryButton
        onClick={() => {
          playerService.playAgain();
          navigate("/");
        }}
      >
        Play Again
      </SecondaryButton>
      <PrimaryButton
        onClick={() => {
          navigate("/feedback");
        }}
      >
        Show Answer
      </PrimaryButton>
    </div>
  );
};

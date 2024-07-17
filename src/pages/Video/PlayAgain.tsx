import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../components/Button";

export const PlayAgain = () => {
  const navigate = useNavigate();

  return (
    <div>
      PlayAgain
      <SecondaryButton onClick={() => {}}>Play Again</SecondaryButton>
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

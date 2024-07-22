import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import { useServices } from "../../services/Services";
import { Header } from "../../components/Header";
import { PlayIcon } from "../../components/Icons";

export const PlayAgain = () => {
  const navigate = useNavigate();
  const { playerService } = useServices();

  return (
    <div className="relative flex flex-col h-screen justify-between">
      <Header text="Library" />
      <div
        onClick={() => {
          playerService.playAgain();
          navigate("/");
        }}
        className="cursor-pointer flex flex-col align-center justify-center w-full items-center"
      >
        <PlayIcon />
        <span className="text-base text-grey font-bold mt-[8px]">
          Play again
        </span>
      </div>
      <div className="mb-[50px]">
        <PrimaryButton
          onClick={() => {
            navigate("/feedback");
          }}
        >
          Show Answer
        </PrimaryButton>
      </div>
    </div>
  );
};

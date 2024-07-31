import { useObservable } from "micro-observables";
import { useServices } from "../../services/Services";
import { TertiaryButton } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { decode } from "html-entities";
import { Rating } from "ts-fsrs";

export const Feedback = () => {
  const { fsrsService } = useServices();
  const cardToReview = useObservable(fsrsService.cardToReview);
  const nativeCardToReview = useObservable(fsrsService.nativeCardToReview);
  const navigate = useNavigate();

  if (!cardToReview) return <div>No card to review</div>;

  console.log("Feedback subtitle", cardToReview.subtitle);

  return (
    <div className="relative flex flex-col h-screen justify-between">
      <Header text="Library" onClick={() => navigate("/")} />
      <div>
        <div className="text-white text-center">
          {decode(cardToReview.subtitle.text)}
        </div>
        <div className="text-grey text-center text-xs">
          {decode(nativeCardToReview?.subtitle.text)}
        </div>
      </div>
      <div className="justify-center items-center flex mb-[50px]">
        <div className="justify-evenly">
          <div className="m-[4px] mb-[8px]">
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  fsrsService.updateCardRating(cardToReview, Rating.Again);
                  navigate("/video/" + cardToReview.video_id);
                }}
              >
                Too hard
                <div className="mr-[8px] text-xs font-medium	">
                  Will reappear in 5mn
                </div>
              </TertiaryButton>
            </span>
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  fsrsService.updateCardRating(cardToReview, Rating.Hard);
                  navigate("/video/" + cardToReview.video_id);
                }}
              >
                Hard
                <div className="text-xs font-medium	">Will reappear in 10mn</div>
              </TertiaryButton>
            </span>
          </div>
          <div className="m-[4px]">
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  fsrsService.updateCardRating(cardToReview, Rating.Good);
                  navigate("/video/" + cardToReview.video_id);
                }}
              >
                Ok
                <div className="text-xs font-medium	">Will reappear in 1H</div>
              </TertiaryButton>
            </span>
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  fsrsService.updateCardRating(cardToReview, Rating.Easy);
                  navigate("/video/" + cardToReview.video_id);
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

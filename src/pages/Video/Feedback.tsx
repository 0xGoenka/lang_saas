import { useObservable } from "micro-observables";
import { useServices } from "../../services/Services";
import { TertiaryButton } from "../../components/Button";
import { decode } from "html-entities";
import { Rating } from "ts-fsrs";

export const Feedback = () => {
  const { fsrsService, playerService } = useServices();
  const cardToReview = useObservable(fsrsService.cardToReview);
  const nativeCardToReview = useObservable(fsrsService.nativeCardToReview);

  if (!cardToReview) return <div>No card to review</div>;

  console.log("Feedback subtitle", cardToReview.subtitle);

  return (
    <div className="relative flex flex-col h-[30vh] justify-between">
      {/* <Header text="Library" onClick={() => navigate("/")} /> */}
      <div>
        <div className="text-white text-center">
          {decode(cardToReview.subtitle.text)}
        </div>
        <div className="text-grey text-center text-xs">
          {decode(nativeCardToReview?.subtitle.text)}
        </div>
      </div>
      <div className="justify-center items-center flex mb-[50px] mt-8">
        <div className="justify-evenly">
          <div className="m-[4px] mb-[8px]">
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  fsrsService.updateCardRating(cardToReview, Rating.Again);
                  playerService.playVideoAt();
                }}
              >
                Too hard
                {/* <div className="mr-[8px] text-xs font-medium	">
                  Will reappear in 5mn
                </div> */}
              </TertiaryButton>
            </span>
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  fsrsService.updateCardRating(cardToReview, Rating.Hard);
                  playerService.playVideoAt();
                }}
              >
                Hard
                {/* <div className="text-xs font-medium	">Will reappear in 10mn</div> */}
              </TertiaryButton>
            </span>
          </div>
          <div className="m-[4px]">
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  fsrsService.updateCardRating(cardToReview, Rating.Good);
                  playerService.playVideoAt();
                }}
              >
                Ok
                {/* <div className="text-xs font-medium	">Will reappear in 1H</div> */}
              </TertiaryButton>
            </span>
            <span className="m-[4px]">
              <TertiaryButton
                onClick={() => {
                  fsrsService.updateCardRating(cardToReview, Rating.Easy);
                  playerService.playVideoAt();
                }}
              >
                Easy
                {/* <div className="text-xs font-medium	">Won’t reappear</div> */}
              </TertiaryButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

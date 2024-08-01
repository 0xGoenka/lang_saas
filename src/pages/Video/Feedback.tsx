import { useObservable } from "micro-observables";
import { useServices } from "../../services/Services";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from "../../components/Button";
import { decode } from "html-entities";
import { Rating } from "ts-fsrs";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const Feedback = () => {
  const { fsrsService, playerService } = useServices();
  const cardToReview = useObservable(fsrsService.cardToReview);
  const nativeCardToReview = useObservable(fsrsService.nativeCardToReview);
  const [show, setShow] = useState(false);
  useHotkeys("A", () => playerService.playVideoAt(), [show]);
  useHotkeys("S", () => setShow(true), [show]);
  useHotkeys("D", () => again(), []);
  useHotkeys("W", () => ok(), []);
  useHotkeys("E", () => easy(), []);
  useHotkeys("R", () => hard(), []);

  const again = () => {
    if (!cardToReview) return;
    fsrsService.updateCardRating(cardToReview, Rating.Again);
    playerService.playVideoAt();
  };

  const ok = () => {
    if (!cardToReview) return;
    fsrsService.updateCardRating(cardToReview, Rating.Good);
    playerService.playVideoAt();
  };

  const easy = () => {
    if (!cardToReview) return;
    fsrsService.updateCardRating(cardToReview, Rating.Easy);
    playerService.playVideoAt();
  };

  const hard = () => {
    if (!cardToReview) return;
    fsrsService.updateCardRating(cardToReview, Rating.Hard);
    playerService.playVideoAt();
  };

  if (!cardToReview) return null;

  console.log("Feedback subtitle", cardToReview.subtitle);

  if (!show)
    return (
      <>
        <div className="mb-2">
          <SecondaryButton onClick={() => playerService.playVideoAt()}>
            Play Again (A)
          </SecondaryButton>
        </div>
        <PrimaryButton onClick={() => setShow(true)}>
          Show Answer (S)
        </PrimaryButton>
      </>
    );

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
              <TertiaryButton onClick={again}>
                Too hard (D)
                {/* <div className="mr-[8px] text-xs font-medium	">
                  Will reappear in 5mn
                </div> */}
              </TertiaryButton>
            </span>
            <span className="m-[4px]">
              <TertiaryButton onClick={hard}>
                Hard (R)
                {/* <div className="text-xs font-medium	">Will reappear in 10mn</div> */}
              </TertiaryButton>
            </span>
          </div>
          <div className="m-[4px]">
            <span className="m-[4px]">
              <TertiaryButton onClick={ok}>
                Ok (W)
                {/* <div className="text-xs font-medium	">Will reappear in 1H</div> */}
              </TertiaryButton>
            </span>
            <span className="m-[4px]">
              <TertiaryButton onClick={easy}>
                Easy (E)
                {/* <div className="text-xs font-medium	">Won’t reappear</div> */}
              </TertiaryButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
// useHotkeys("D", () => again(), []);
// useHotkeys("R", () => hard(), []);
// useHotkeys("W", () => ok(), []);
// useHotkeys("E", () => easy(), []);

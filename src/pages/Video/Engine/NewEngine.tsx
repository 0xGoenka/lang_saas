import { useEffect } from "react";
import { Rating } from "ts-fsrs";
import { PrimaryButton } from "../../../components/Button";
import { useServices } from "../../../services/Services";
import { useObservable } from "micro-observables";

export const NewEngine = () => {
  const fsrsService = useServices().fsrsService;
  const cardToReview = useObservable(fsrsService.cardToReview);

  useEffect(() => {
    fsrsService.getCardsToReview();
  }, []);

  if (!cardToReview)
    return (
      <div className="text-white">No card to review now come back later !</div>
    );

  return (
    <div>
      <div className="text-white">
        Current Card: {cardToReview.data} dueDate:{" "}
        {cardToReview.fsrsCard.due.toLocaleString()}
      </div>
      <PrimaryButton
        onClick={() => fsrsService.updateCardRating(cardToReview, Rating.Easy)}
      >
        Easy
      </PrimaryButton>
      <PrimaryButton
        onClick={() => fsrsService.updateCardRating(cardToReview, Rating.Good)}
      >
        Ok
      </PrimaryButton>
      <PrimaryButton
        onClick={() => fsrsService.updateCardRating(cardToReview, Rating.Hard)}
      >
        Hard
      </PrimaryButton>
      <PrimaryButton
        onClick={() => fsrsService.updateCardRating(cardToReview, Rating.Again)}
      >
        Very Hard
      </PrimaryButton>
    </div>
  );
};

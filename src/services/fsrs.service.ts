import { DBService, NativeSubtitle, Subtitle } from "./db.service";
import { observable } from "micro-observables";
import { fsrs, Rating } from "ts-fsrs";

export class FSRSService {
  fsrs = fsrs();
  cardToReview = observable<null | Subtitle>(null);
  nativeCardToReview = observable<null | NativeSubtitle>(null);

  dbService: DBService;

  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  getCardToReview = async (videoId: string) => {
    const cards = await this.dbService.getSubtitlesFromVideoId(videoId);

    console.log("All Cards");
    console.table(
      cards.map((card) => ({
        data: card.subtitle.text,
        fsrsCard: card.fsrsCard.due.toLocaleString(),
      }))
    );

    const cardsToReview = cards.filter(
      (card) => card.fsrsCard.due < new Date()
    );

    if (cardsToReview.length === 0) throw Error("No cards to review");

    this.cardToReview.set(cardsToReview[0]);
    const native_sub = await this.dbService.getMatchingNativeSubtitle(
      cardsToReview[0],
      videoId
    );

    if (!native_sub) throw Error("No native subtitle to review");

    this.nativeCardToReview.set(native_sub[0]);

    console.log("Filtered Cards");
    console.table(
      cardsToReview.map((card) => ({
        data: card.subtitle.text,
        fsrsCard: card.fsrsCard.due.toLocaleString(),
      }))
    );
    return { card: cardsToReview[0], native_sub };
  };

  updateCardRating = async (card: Subtitle, rating: Rating) => {
    const scheduling_cards = this.fsrs.repeat(card.fsrsCard, new Date());

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    card.fsrsCard = scheduling_cards[rating].card;
    console.log("updateCardRating", card, rating);
    await this.dbService.updateSubtitle(card.id, card.fsrsCard);

    this.getCardToReview(card.video_id);
  };
}

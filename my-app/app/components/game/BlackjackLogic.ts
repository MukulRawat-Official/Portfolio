export type Suit = "♠" | "♥" | "♦" | "♣";

export interface Card {
  id: string;
  rank: string;
  suit: Suit;
  value: number;
}

export const createDeck = (): Card[] => {
  const suits: Suit[] = ["♠", "♥", "♦", "♣"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const deck: Card[] = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      let value = parseInt(rank) || (["J", "Q", "K"].includes(rank) ? 10 : 11);
      deck.push({ id: `${rank}${suit}`, rank, suit, value });
    });
  });
  return deck.sort(() => Math.random() - 0.5);
};

export const getScore = (hand: Card[]): number => {
  let score = hand.reduce((acc, card) => acc + card.value, 0);
  let aces = hand.filter((c) => c.rank === "A").length;
  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }
  return score;
};

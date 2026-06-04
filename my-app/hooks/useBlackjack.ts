"use client";
import { useState } from "react";
import {
  createDeck,
  getScore,
  Card,
} from "@/app/components/game/BlackjackLogic";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useBlackjack = () => {
  const [bank, setBank] = useState(5000);
  const [bet, setBet] = useState(100);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<
    "betting" | "playing" | "resolving" | "result"
  >("betting");
  const [message, setMessage] = useState("PLACE_BET");

  const deal = async () => {
    if (bank < bet) {
      setMessage("INSUFFICIENT_FUNDS");
      return;
    }
    setBank((prev) => prev - bet);
    const newDeck = createDeck();
    setGameState("playing");
    setMessage("DEALING");
    setPlayerHand([]);
    setDealerHand([]);
    const p1 = newDeck.pop()!;
    const d1 = newDeck.pop()!;
    const p2 = newDeck.pop()!;
    const d2 = newDeck.pop()!;
    await wait(600);
    setPlayerHand([p1]);
    await wait(600);
    setDealerHand([d1]);
    await wait(600);
    setPlayerHand([p1, p2]);
    await wait(600);
    setDealerHand([d1, d2]);
    setDeck(newDeck);
    setMessage("HIT_OR_STAND");
  };

  const handleHit = () => {
    const card = deck.pop();
    if (!card) return;
    const newHand = [...playerHand, card];
    setPlayerHand(newHand);
    if (getScore(newHand) > 21) {
      setGameState("result");
      setMessage("BUST");
    }
  };

  const handleDouble = async () => {
    if (bank < bet) {
      setMessage("INSUFFICIENT_FUNDS");
      return;
    }
    setBank((prev) => prev - bet);
    const card = deck.pop();
    if (!card) return;
    const newHand = [...playerHand, card];
    setPlayerHand(newHand);
    if (getScore(newHand) > 21) {
      setGameState("result");
      setMessage("BUST");
    } else {
      handleStand(bet * 2);
    }
  };

  const handleStand = async (finalBet = bet) => {
    setGameState("resolving");
    setMessage("DEALER_REVEALING");
    let dHand = [...dealerHand];
    while (getScore(dHand) < 17) {
      await wait(800);
      dHand.push(deck.pop()!);
      setDealerHand([...dHand]);
    }
    setGameState("result");
    const pScore = getScore(playerHand);
    const dScore = getScore(dHand);
    if (dScore > 21 || pScore > dScore) {
      setMessage("WIN");
      setBank((prev) => prev + finalBet * 2);
    } else if (pScore < dScore) {
      setMessage("DEALER_WINS");
    } else {
      setMessage("PUSH");
      setBank((prev) => prev + finalBet);
    }
  };

  return {
    bank,
    bet,
    setBet,
    playerHand,
    dealerHand,
    gameState,
    message,
    deal,
    handleHit,
    handleStand: () => handleStand(),
    handleDouble,
    setGameState,
    getScore,
  };
};

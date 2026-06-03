"use client";
import React from "react";
import { useBlackjack } from "@/hooks/useBlackjack";
import { PlayingCard } from "@/app/components/game/cards/PlayingCard";
import { Suit } from "@/app/components/game/BlackjackLogic";

interface GameProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function Game({ onBack, onComplete }: GameProps) {
  const {
    bank,
    bet,
    setBet,
    playerHand,
    dealerHand,
    gameState,
    message,
    deal,
    handleHit,
    handleStand,
    handleDouble,
    setGameState,
    getScore,
  } = useBlackjack();

  return (
    <div className="min-h-screen bg-[#050505] text-emerald-500 font-mono flex flex-col p-8">
      {/* Updated Header with larger, more legible UI elements */}
      <header className="flex justify-between items-center border-b border-emerald-500/20 pb-6 mb-12">
        <button
          onClick={onBack}
          className="text-sm font-bold text-emerald-500/70 hover:text-emerald-400 uppercase tracking-widest border border-emerald-500/30 px-6 py-3 hover:bg-emerald-500/10 transition-all rounded-sm"
        >
          ← BACK TO MENU
        </button>

        <div className="flex gap-16">
          <div className="flex flex-col items-center">
            <span className="text-xs text-emerald-500/50 uppercase tracking-[0.2em] mb-1">
              Bankroll
            </span>
            <span className="text-2xl font-bold">${bank}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-emerald-500/50 uppercase tracking-[0.2em] mb-1">
              Target
            </span>
            <span className="text-2xl font-bold">$10,000</span>
          </div>
        </div>

        {/* Invisible spacer to balance the header layout */}
        <div className="w-[150px]" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-16">
        {/* Dealer Section */}
        <section className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs uppercase tracking-widest text-emerald-500/50">
              Dealer_Hand
            </span>
            <span className="text-lg border border-emerald-500/20 px-3 py-1 font-bold">
              {gameState === "betting"
                ? "0"
                : gameState === "playing"
                  ? "?"
                  : getScore(dealerHand)}
            </span>
          </div>
          <div className="flex gap-2 h-36">
            {dealerHand.map((c, i) => (
              <PlayingCard
                key={c.id}
                rank={c.rank}
                suit={c.suit as Suit}
                owner="dealer"
                hidden={gameState === "playing" && i === 1}
              />
            ))}
          </div>
        </section>

        {/* Player Section */}
        <section className="flex flex-col items-center">
          <div className="flex gap-2 h-36">
            {playerHand.map((c) => (
              <PlayingCard
                key={c.id}
                rank={c.rank}
                suit={c.suit as Suit}
                owner="player"
              />
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-xs uppercase tracking-widest text-emerald-500/50">
              Player_Total
            </span>
            <span className="text-lg border border-emerald-500/20 px-3 py-1 font-bold">
              {gameState === "betting" ? "0" : getScore(playerHand)}
            </span>
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-6 mt-8 pt-8 border-t border-emerald-500/20">
        <div className="text-emerald-500/80 tracking-[0.3em] uppercase text-sm font-bold">
          {message}
        </div>

        <div className="flex gap-2">
          {gameState === "betting" &&
            [100, 200, 500].map((b) => (
              <button
                key={b}
                onClick={() => setBet(b)}
                className={`w-24 h-14 border transition-all text-lg font-bold ${bet === b ? "border-emerald-500 bg-emerald-500 text-black" : "border-emerald-500/30 hover:border-emerald-500"}`}
              >
                ${b}
              </button>
            ))}

          {gameState === "betting" && (
            <button
              onClick={deal}
              className="px-10 h-14 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors text-lg font-bold"
            >
              DEAL
            </button>
          )}

          {gameState === "playing" && (
            <>
              <button
                onClick={handleHit}
                className="w-28 h-14 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors font-bold"
              >
                HIT
              </button>
              <button
                onClick={handleStand}
                className="w-28 h-14 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors font-bold"
              >
                STAND
              </button>
              {playerHand.length === 2 && bank >= bet && (
                <button
                  onClick={handleDouble}
                  className="w-28 h-14 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors font-bold"
                >
                  DOUBLE
                </button>
              )}
            </>
          )}
          {gameState === "result" && (
            <button
              onClick={() => setGameState("betting")}
              className="px-10 h-14 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors font-bold"
            >
              NEXT_ROUND
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

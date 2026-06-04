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
    <div className="min-h-screen bg-[#050505] text-emerald-500 font-mono flex flex-col p-4 md:p-8">
      {/* Responsive Header */}
      <header className="flex flex-wrap justify-between items-center border-b border-emerald-500/20 pb-6 mb-8 gap-4">
        <button
          onClick={onBack}
          className="text-sm font-bold text-emerald-500/70 hover:text-emerald-400 uppercase tracking-widest border border-emerald-500/30 px-4 py-2 hover:bg-emerald-500/10 transition-all rounded-sm"
        >
          ← BACK
        </button>

        <div className="flex gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-emerald-500/50 uppercase tracking-[0.2em]">
              Bank
            </span>
            <span className="text-xl font-bold">${bank}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-emerald-500/50 uppercase tracking-[0.2em]">
              Target
            </span>
            <span className="text-xl font-bold">$10k</span>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-16">
        {/* Dealer Section */}
        <section className="flex flex-col items-center w-full">
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
          {/* Added flex-wrap and h-auto to prevent overflow */}
          <div className="flex flex-wrap justify-center gap-2 h-auto min-h-[144px]">
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
        <section className="flex flex-col items-center w-full">
          {/* Added flex-wrap and h-auto to prevent overflow */}
          <div className="flex flex-wrap justify-center gap-2 h-auto min-h-[144px] mb-4">
            {playerHand.map((c) => (
              <PlayingCard
                key={c.id}
                rank={c.rank}
                suit={c.suit as Suit}
                owner="player"
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-emerald-500/50">
              Player_Total
            </span>
            <span className="text-lg border border-emerald-500/20 px-3 py-1 font-bold">
              {gameState === "betting" ? "0" : getScore(playerHand)}
            </span>
          </div>
        </section>
      </main>

      {/* Responsive Footer */}
      <footer className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-emerald-500/20">
        <div className="text-emerald-500/80 tracking-[0.2em] uppercase text-xs font-bold text-center">
          {message}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {gameState === "betting" &&
            [100, 200, 500].map((b) => (
              <button
                key={b}
                onClick={() => setBet(b)}
                className={`w-20 h-12 border transition-all text-sm font-bold ${bet === b ? "border-emerald-500 bg-emerald-500 text-black" : "border-emerald-500/30 hover:border-emerald-500"}`}
              >
                ${b}
              </button>
            ))}

          {gameState === "betting" && (
            <button
              onClick={deal}
              className="px-8 h-12 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors text-sm font-bold"
            >
              DEAL
            </button>
          )}

          {gameState === "playing" && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={handleHit}
                className="w-20 h-12 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors text-sm font-bold"
              >
                HIT
              </button>
              <button
                onClick={handleStand}
                className="w-20 h-12 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors text-sm font-bold"
              >
                STAND
              </button>
              {playerHand.length === 2 && bank >= bet && (
                <button
                  onClick={handleDouble}
                  className="w-20 h-12 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors text-sm font-bold"
                >
                  DOUBLE
                </button>
              )}
            </div>
          )}

          {gameState === "result" && (
            <button
              onClick={() => setGameState("betting")}
              className="px-8 h-12 border border-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors text-sm font-bold"
            >
              NEXT_ROUND
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

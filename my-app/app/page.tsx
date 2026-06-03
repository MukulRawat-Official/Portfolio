"use client";
import { useState } from "react";
import IntroSequence from "@/app/components/IntroSequence";
import EntryGate from "@/app/components/EntryGate";
import Game from "@/app/components/game/Game";
import Dashboard from "@/app/components/Dashboard";

export default function Page() {
  const [stage, setStage] = useState<
    "intro" | "menu" | "blackjack" | "dashboard"
  >("intro");

  return (
    <main>
      {stage === "intro" && (
        <IntroSequence onComplete={() => setStage("menu")} />
      )}
      {stage === "menu" && (
        <EntryGate onSelect={(path) => setStage(path as any)} />
      )}

      {/* Added onBack handler */}
      {stage === "blackjack" && (
        <Game
          onBack={() => setStage("menu")}
          onComplete={() => setStage("menu")}
        />
      )}

      {stage === "dashboard" && <Dashboard onBack={() => setStage("menu")} />}
    </main>
  );
}

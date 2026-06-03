import { motion } from "framer-motion";
import { Suit } from "@/app/components/game/BlackjackLogic";

interface CardProps {
  rank: string;
  suit: Suit;
  owner: "player" | "dealer";
  hidden?: boolean;
}

export const PlayingCard = ({ rank, suit, owner, hidden }: CardProps) => {
  // Animation variants for smooth entry
  const cardVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  if (hidden) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-24 h-36 border border-emerald-500/20 bg-[#050505] rounded-lg flex items-center justify-center"
      >
        <span className="text-emerald-900/50 text-3xl font-bold">?</span>
      </motion.div>
    );
  }

  const isDealer = owner === "dealer";
  const isRed = suit === "♥" || suit === "♦";

  const bgColor = isDealer ? "bg-zinc-900" : "bg-white";
  const textColor = isDealer
    ? isRed
      ? "text-red-500"
      : "text-emerald-500"
    : isRed
      ? "text-red-600"
      : "text-black";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`w-24 h-36 ${bgColor} rounded-lg flex flex-col justify-between p-3 shadow-lg border border-transparent`}
    >
      <span className={`text-2xl font-bold leading-none ${textColor}`}>
        {rank}
      </span>
      <span className={`text-3xl self-end ${textColor}`}>{suit}</span>
    </motion.div>
  );
};

interface ScoreBarProps {
  score: number;
}

export function ScoreBar({ score }: ScoreBarProps) {
  const color =
    score >= 80 ? "bg-sage" : score >= 60 ? "bg-gold" : "bg-terra";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-sand rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-bold text-bark w-8 text-right">{score}</span>
    </div>
  );
}

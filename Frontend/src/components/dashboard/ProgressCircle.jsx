export const ProgressCircle = ({ percentage = 0 }) => {
  const normalized = Math.min(100, Math.max(0, Math.round(percentage)));

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <svg className="h-full w-full" viewBox="0 0 36 36">
        <path
          className="stroke-muted"
          strokeWidth="3"
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="stroke-primary"
          strokeWidth="3"
          strokeDasharray={`${normalized}, 100`}
          strokeLinecap="round"
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <span className="absolute text-xs font-semibold text-primary">{normalized}%</span>
    </div>
  );
};


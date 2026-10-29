import './ProgressBar.css';

export default function ProgressBar({ value, max, label = 'Quiz progress' }) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div
      className="progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div className="progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

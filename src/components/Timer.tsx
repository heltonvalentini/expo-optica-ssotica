import { GAME_DURATION } from '../constants/cards'

interface TimerProps {
  timeLeft: number
  isRunning: boolean
}

export function Timer({ timeLeft, isRunning }: TimerProps) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const progress = timeLeft / GAME_DURATION
  const offset = circumference * (1 - progress)

  const color =
    timeLeft > 20 ? '#009def' : timeLeft > 10 ? '#eab308' : '#ef4444'

  return (
    <div
      className={`relative flex items-center justify-center ${
        timeLeft <= 10 && isRunning ? 'timer-danger' : ''
      }`}
    >
      <svg width="96" height="96" viewBox="0 0 96 96">
        {/* Background circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        {/* Progress circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 48 48)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-2xl font-bold tabular-nums"
          style={{ color }}
        >
          {timeLeft}
        </span>
        <span className="text-[10px] text-gray-400 font-medium">segundos</span>
      </div>
    </div>
  )
}

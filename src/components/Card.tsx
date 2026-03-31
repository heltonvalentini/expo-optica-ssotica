import type { Card as CardType } from '../types'
import { CardIcon } from './CardIcon'

interface CardProps {
  card: CardType
  onClick: () => void
}

export function Card({ card, onClick }: CardProps) {
  const isRevealed = card.isFlipped || card.isMatched

  return (
    <button
      onClick={onClick}
      disabled={card.isMatched}
      className={`relative w-full aspect-[3/4] cursor-pointer [perspective:800px] ${
        card.isMatched ? 'card-matched' : ''
      }`}
      aria-label={isRevealed ? card.name : 'Carta virada'}
    >
      <div className={`card-inner w-full h-full ${isRevealed ? 'flipped' : ''}`}>
        {/* Back (face-down) */}
        <div className="card-face rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg border-2 border-primary/30">
          <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none">
            <circle cx="20" cy="20" r="18" fill="white" opacity="0.2" />
            <text
              x="20"
              y="26"
              textAnchor="middle"
              fontFamily="Montserrat,sans-serif"
              fontWeight="800"
              fontSize="14"
              fill="white"
            >
              SS
            </text>
          </svg>
        </div>

        {/* Front (face-up) */}
        <div
          className={`card-back card-face rounded-xl bg-white flex flex-col items-center justify-center gap-2 shadow-lg border-2 ${
            card.isMatched ? 'border-success' : 'border-primary/20'
          } p-2`}
        >
          <CardIcon icon={card.icon} className="w-14 h-14" />
          <span className="text-xs font-semibold text-dark text-center leading-tight px-1">
            {card.name}
          </span>
        </div>
      </div>
    </button>
  )
}

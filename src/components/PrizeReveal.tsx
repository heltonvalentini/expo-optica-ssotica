import { useMemo } from 'react'
import type { Prize } from '../types'

interface PrizeRevealProps {
  prize: Prize
}

const CONFETTI_COLORS = ['#009def', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

function ConfettiPiece({ index }: { index: number }) {
  const style = useMemo(() => {
    const left = Math.random() * 100
    const delay = Math.random() * 2
    const duration = 2 + Math.random() * 2
    const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length]
    const size = 6 + Math.random() * 6
    return {
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      backgroundColor: color,
      width: `${size}px`,
      height: `${size}px`,
    }
  }, [index])

  return (
    <div
      className="confetti-piece fixed top-0 rounded-sm z-50"
      style={style}
    />
  )
}

export function PrizeReveal({ prize }: PrizeRevealProps) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-8 relative">
      {/* Confetti */}
      {Array.from({ length: 30 }, (_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}

      {/* Trophy icon */}
      <div className="text-6xl mb-4">🏆</div>

      <h2 className="text-3xl font-extrabold text-gold mb-2">Parabéns!</h2>
      <p className="text-dark/70 mb-6 text-base">
        Você completou o desafio e ganhou um prêmio!
      </p>

      {/* Prize card */}
      <div className="prize-card bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-6 shadow-xl w-full max-w-sm">
        <p className="text-sm font-medium text-blue-100 mb-2">Seu prêmio:</p>
        <h3 className="text-xl font-bold mb-1">{prize.title}</h3>
        <p className="text-blue-100 text-sm">{prize.description}</p>
      </div>

      <div className="mt-8 bg-primary-light rounded-xl p-4 max-w-sm w-full">
        <p className="text-sm text-dark font-medium">
          📱 Apresente esta tela no stand da <strong>SSOtica</strong> para
          ativar seu prêmio!
        </p>
      </div>
    </div>
  )
}

import type { Card as CardType } from '../types'
import { Card } from './Card'

interface GameBoardProps {
  cards: CardType[]
  onFlip: (index: number) => void
}

export function GameBoard({ cards, onFlip }: GameBoardProps) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto px-4 md:grid-cols-5 md:max-w-2xl">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} onClick={() => onFlip(index)} />
      ))}
    </div>
  )
}

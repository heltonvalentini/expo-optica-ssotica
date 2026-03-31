import { useState, useCallback, useRef, useEffect } from 'react'
import type { Card, GamePhase } from '../types'
import { CARD_TYPES, COMPARE_DELAY } from '../constants/cards'
import { shuffle } from '../utils/shuffle'

function createCards(): Card[] {
  const pairs = CARD_TYPES.flatMap((type) => [
    { ...type, id: `${type.pairId}-a`, isFlipped: false, isMatched: false },
    { ...type, id: `${type.pairId}-b`, isFlipped: false, isMatched: false },
  ])
  return shuffle(pairs)
}

export function useMemoryGame(onFirstFlip: () => void) {
  const [cards, setCards] = useState<Card[]>(() => createCards())
  const [phase, setPhase] = useState<GamePhase>('ready')
  const [selected, setSelected] = useState<number[]>([])

  const hasStartedRef = useRef(false)
  const matchedCountRef = useRef(0)
  const phaseRef = useRef<GamePhase>('ready')
  const selectedRef = useRef<number[]>([])

  // Keep refs in sync
  phaseRef.current = phase
  selectedRef.current = selected

  const flipCard = useCallback(
    (index: number) => {
      // Guard: ignore clicks when comparing, won, or lost
      if (
        phaseRef.current === 'comparing' ||
        phaseRef.current === 'won' ||
        phaseRef.current === 'lost'
      )
        return

      // Guard: already 2 selected
      if (selectedRef.current.length >= 2) return

      // Guard: card already flipped or matched
      setCards((prev) => {
        const card = prev[index]
        if (card.isFlipped || card.isMatched) return prev

        // Start timer on first ever flip
        if (!hasStartedRef.current) {
          hasStartedRef.current = true
          onFirstFlip()
        }

        // Flip this card visually
        return prev.map((c, i) =>
          i === index ? { ...c, isFlipped: true } : c
        )
      })

      // Track selection separately (outside setCards to avoid nesting state updates)
      setSelected((prev) => {
        if (prev.length >= 2) return prev
        return [...prev, index]
      })
    },
    [onFirstFlip]
  )

  // React to selection changes — compare when 2 cards selected
  useEffect(() => {
    if (selected.length !== 2) return

    const [firstIdx, secondIdx] = selected

    // Set phase to comparing immediately to block further clicks
    phaseRef.current = 'comparing'
    setPhase('comparing')

    // Read current cards to compare
    setCards((currentCards) => {
      const first = currentCards[firstIdx]
      const second = currentCards[secondIdx]

      if (!first || !second) return currentCards

      if (first.pairId === second.pairId) {
        // Match! Mark both as matched after short delay
        setTimeout(() => {
          setCards((curr) =>
            curr.map((c) =>
              c.pairId === first.pairId
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            )
          )
          matchedCountRef.current += 1
          setSelected([])

          if (matchedCountRef.current === 5) {
            phaseRef.current = 'won'
            setPhase('won')
          } else {
            phaseRef.current = 'playing'
            setPhase('playing')
          }
        }, 500)
      } else {
        // No match — flip both back after delay
        setTimeout(() => {
          setCards((curr) =>
            curr.map((c, i) =>
              i === firstIdx || i === secondIdx
                ? { ...c, isFlipped: false }
                : c
            )
          )
          setSelected([])
          phaseRef.current = 'playing'
          setPhase('playing')
        }, COMPARE_DELAY)
      }

      // Return unchanged for now (the timeout handles the update)
      return currentCards
    })
  }, [selected])

  const setLost = useCallback(() => {
    phaseRef.current = 'lost'
    setPhase('lost')
  }, [])

  const resetGame = useCallback(() => {
    setCards(createCards())
    setPhase('ready')
    setSelected([])
    phaseRef.current = 'ready'
    selectedRef.current = []
    hasStartedRef.current = false
    matchedCountRef.current = 0
  }, [])

  return { cards, phase, flipCard, setLost, resetGame }
}

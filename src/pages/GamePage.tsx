import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMemoryGame } from '../hooks/useMemoryGame'
import { useTimer } from '../hooks/useTimer'
import { GAME_DURATION } from '../constants/cards'
import { Header } from '../components/Header'
import { GameBoard } from '../components/GameBoard'
import { Timer } from '../components/Timer'

export function GamePage() {
  const navigate = useNavigate()

  const handleExpire = useCallback(() => {
    setLost()
  }, [])

  const { timeLeft, isRunning, start } = useTimer({
    duration: GAME_DURATION,
    onExpire: handleExpire,
  })

  const handleFirstFlip = useCallback(() => {
    start()
  }, [start])

  const { cards, phase, flipCard, setLost } = useMemoryGame(handleFirstFlip)

  useEffect(() => {
    if (phase === 'won') {
      const elapsed = GAME_DURATION - timeLeft
      navigate('/result', { state: { result: 'won', completionTime: elapsed } })
    } else if (phase === 'lost') {
      navigate('/result', { state: { result: 'lost' } })
    }
  }, [phase, navigate, timeLeft])

  // Redirect if no form data
  useEffect(() => {
    if (!sessionStorage.getItem('expo-form-data')) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const matchedCount = cards.filter((c) => c.isMatched).length / 2

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-center py-4 gap-4">
        {/* Timer and score */}
        <div className="flex items-center gap-6">
          <Timer timeLeft={timeLeft} isRunning={isRunning} />
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">
              {matchedCount}
              <span className="text-dark/30">/5</span>
            </p>
            <p className="text-xs text-dark/50 font-medium">pares</p>
          </div>
        </div>

        {/* Instructions */}
        {!isRunning && (
          <p className="text-sm text-dark/50 animate-pulse">
            Toque em uma carta para começar!
          </p>
        )}

        {/* Game board */}
        <GameBoard cards={cards} onFlip={flipCard} />
      </main>
    </div>
  )
}

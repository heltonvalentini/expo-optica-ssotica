import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { PrizeReveal } from '../components/PrizeReveal'
import { EncouragementMessage } from '../components/EncouragementMessage'
import { selectRandomPrize } from '../utils/prizes'
import { saveLead } from '../utils/storage'
import type { FormData } from '../types'

interface LocationState {
  result: 'won' | 'lost'
  completionTime?: number
}

export function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null

  const prize = useMemo(
    () => (state?.result === 'won' ? selectRandomPrize() : null),
    [state?.result]
  )

  useEffect(() => {
    if (!state) {
      navigate('/', { replace: true })
      return
    }

    const formRaw = sessionStorage.getItem('expo-form-data')
    if (!formRaw) return

    const formData: FormData = JSON.parse(formRaw)
    saveLead({
      ...formData,
      timestamp: new Date().toISOString(),
      gameResult: state.result,
      prize: prize?.title,
      completionTime: state.completionTime,
    })

    // Clear form data so user can't replay
    sessionStorage.removeItem('expo-form-data')
  }, [state, prize, navigate])

  if (!state) return null

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {state.result === 'won' && prize ? (
          <PrizeReveal prize={prize} />
        ) : (
          <EncouragementMessage />
        )}
      </main>
    </div>
  )
}

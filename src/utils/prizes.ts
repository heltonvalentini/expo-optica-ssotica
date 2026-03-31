import { PRIZES } from '../constants/prizes'
import type { Prize } from '../types'

export function selectRandomPrize(): Prize {
  const index = Math.floor(Math.random() * PRIZES.length)
  return PRIZES[index]
}

export interface FormData {
  nome: string
  email: string
  whatsapp: string
  cnpj: string
  isCliente: boolean
}

export interface CardType {
  pairId: number
  name: string
  icon: string
}

export interface Card extends CardType {
  id: string
  isFlipped: boolean
  isMatched: boolean
}

export type GamePhase = 'ready' | 'playing' | 'comparing' | 'won' | 'lost'

export interface Prize {
  id: string
  title: string
  description: string
}

export interface LeadData extends FormData {
  timestamp: string
  gameResult: 'won' | 'lost'
  prize?: string
  completionTime?: number
}

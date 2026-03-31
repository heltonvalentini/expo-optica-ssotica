import type { LeadData } from '../types'

const SHEETS_URL = '' // TODO: Adicionar URL do Google Apps Script
const LOCAL_KEY = 'expo-optica-leads-fallback'

export async function saveLead(data: LeadData): Promise<void> {
  if (SHEETS_URL) {
    try {
      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return
    } catch {
      // Fallback to localStorage
    }
  }

  // Fallback: save locally
  const existing = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
  existing.push(data)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing))
}

import { useState } from 'react'
import type { FormData } from '../types'
import {
  isValidEmail,
  isValidCNPJ,
  formatCNPJ,
  formatWhatsApp,
} from '../utils/validation'

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [isCliente, setIsCliente] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}

    if (nome.trim().length < 2) newErrors.nome = 'Informe seu nome'
    if (!isValidEmail(email)) newErrors.email = 'E-mail inválido'
    if (whatsapp.replace(/\D/g, '').length < 10)
      newErrors.whatsapp = 'WhatsApp inválido'
    if (!isValidCNPJ(cnpj)) newErrors.cnpj = 'CNPJ inválido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ nome: nome.trim(), email, whatsapp, cnpj, isCliente })
  }

  const inputClass =
    'w-full h-12 px-4 text-[15px] rounded-xl border border-gray-200 bg-gray-50/50 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all placeholder:text-gray-300'
  const errorInputClass =
    'w-full h-12 px-4 text-[15px] rounded-xl border border-danger/40 bg-red-50/30 focus:border-danger focus:ring-2 focus:ring-danger/10 focus:outline-none transition-all placeholder:text-gray-300'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome */}
      <div>
        <label className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wide">
          Nome
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome completo"
          className={errors.nome ? errorInputClass : inputClass}
        />
        {errors.nome && (
          <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
            <span>⚠</span> {errors.nome}
          </p>
        )}
      </div>

      {/* E-mail */}
      <div>
        <label className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wide">
          E-mail
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className={errors.email ? errorInputClass : inputClass}
        />
        {errors.email && (
          <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
            <span>⚠</span> {errors.email}
          </p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wide">
          WhatsApp
        </label>
        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
          placeholder="(11) 99999-9999"
          className={errors.whatsapp ? errorInputClass : inputClass}
        />
        {errors.whatsapp && (
          <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
            <span>⚠</span> {errors.whatsapp}
          </p>
        )}
      </div>

      {/* CNPJ */}
      <div>
        <label className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wide">
          CNPJ
        </label>
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
          placeholder="00.000.000/0000-00"
          className={errors.cnpj ? errorInputClass : inputClass}
        />
        {errors.cnpj && (
          <p className="text-danger text-xs mt-1.5 flex items-center gap-1">
            <span>⚠</span> {errors.cnpj}
          </p>
        )}
      </div>

      {/* Cliente SSOtica */}
      <div className="flex items-center justify-between py-3 px-4 bg-primary-light/50 rounded-xl">
        <span className="text-sm font-semibold text-dark">
          Já é cliente SSOtica?
        </span>
        <button
          type="button"
          onClick={() => setIsCliente(!isCliente)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
            isCliente ? 'bg-primary' : 'bg-gray-300'
          }`}
          aria-label={isCliente ? 'Sim, é cliente' : 'Não é cliente'}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
              isCliente ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full h-14 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-base rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] mt-2"
      >
        🎮 Jogar e Concorrer a Prêmios!
      </button>
    </form>
  )
}

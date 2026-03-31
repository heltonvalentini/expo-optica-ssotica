import { useNavigate } from 'react-router-dom'
import type { FormData } from '../types'
import { RegistrationForm } from '../components/RegistrationForm'

export function LandingPage() {
  const navigate = useNavigate()

  function handleSubmit(data: FormData) {
    sessionStorage.setItem('expo-form-data', JSON.stringify(data))
    navigate('/game')
  }

  return (
    <div className="min-h-dvh flex flex-col bg-gray-50">
      {/* Hero + Header integrado */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-[#005a8c] text-white px-6 pt-10 pb-28 text-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-white/5" />

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
            <circle cx="20" cy="20" r="19" fill="white" />
            <text
              x="20"
              y="26"
              textAnchor="middle"
              fontFamily="Montserrat,sans-serif"
              fontWeight="800"
              fontSize="16"
              fill="#009def"
            >
              SS
            </text>
          </svg>
          <div className="text-left">
            <h1 className="text-lg font-bold leading-tight tracking-tight">
              SSOtica
            </h1>
            <p className="text-[10px] text-white/70 font-medium uppercase tracking-widest">
              Expo Óptica 2026
            </p>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-[22px] md:text-3xl font-extrabold leading-tight mb-3">
          Descubra as inovações
          <br />
          <span className="text-white/90">SSOtica</span>
        </h2>
        <p className="text-sm text-white/70 max-w-xs mx-auto leading-relaxed">
          Preencha seus dados e jogue o Jogo da Memória para concorrer a
          prêmios exclusivos!
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-5">
          {[
            'SSChat',
            'OticaPay',
            'TEF Embarcado',
            'SS Lentes',
            'Empréstimo Fácil',
          ].map((feature) => (
            <span
              key={feature}
              className="bg-white/15 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Form card — overlaps hero */}
      <main className="flex-1 px-5 -mt-20 pb-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-6 max-w-md mx-auto border border-gray-100">
          <p className="text-center text-sm font-semibold text-dark/50 mb-5 uppercase tracking-wide">
            Seus dados
          </p>
          <RegistrationForm onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  )
}

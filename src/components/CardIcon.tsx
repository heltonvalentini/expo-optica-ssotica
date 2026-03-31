interface CardIconProps {
  icon: string
  className?: string
}

export function CardIcon({ icon, className = 'w-12 h-12' }: CardIconProps) {
  switch (icon) {
    case 'sschat':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="8" y="12" width="36" height="28" rx="6" stroke="#009def" strokeWidth="3" />
          <rect x="20" y="24" width="36" height="28" rx="6" stroke="#009def" strokeWidth="3" fill="white" />
          <circle cx="30" cy="38" r="2" fill="#009def" />
          <circle cx="38" cy="38" r="2" fill="#009def" />
          <circle cx="46" cy="38" r="2" fill="#009def" />
          <circle cx="50" cy="14" r="8" stroke="#009def" strokeWidth="2.5" />
          <circle cx="50" cy="12" r="1.5" fill="#009def" />
          <path d="M47 16 L53 16" stroke="#009def" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'oticapay':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="6" y="16" width="52" height="32" rx="5" stroke="#009def" strokeWidth="3" />
          <rect x="6" y="24" width="52" height="6" fill="#009def" opacity="0.3" />
          <rect x="12" y="36" width="16" height="4" rx="2" fill="#009def" opacity="0.5" />
          <circle cx="48" cy="38" r="6" stroke="#22c55e" strokeWidth="2.5" />
          <path d="M45 38 L47 40 L51 36" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'tef':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="14" y="4" width="36" height="52" rx="4" stroke="#009def" strokeWidth="3" />
          <rect x="20" y="10" width="24" height="14" rx="2" fill="#009def" opacity="0.2" stroke="#009def" strokeWidth="1.5" />
          <rect x="20" y="30" width="6" height="5" rx="1" fill="#009def" opacity="0.6" />
          <rect x="29" y="30" width="6" height="5" rx="1" fill="#009def" opacity="0.6" />
          <rect x="38" y="30" width="6" height="5" rx="1" fill="#009def" opacity="0.6" />
          <rect x="20" y="38" width="6" height="5" rx="1" fill="#009def" opacity="0.6" />
          <rect x="29" y="38" width="6" height="5" rx="1" fill="#009def" opacity="0.6" />
          <rect x="38" y="38" width="6" height="5" rx="1" fill="#22c55e" />
          <rect x="14" y="48" width="36" height="8" rx="0" fill="none" />
          <path d="M24 58 L24 62 M40 58 L40 62" stroke="#009def" strokeWidth="2" />
        </svg>
      )
    case 'sslentes':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="20" cy="32" r="12" stroke="#009def" strokeWidth="3" />
          <circle cx="44" cy="32" r="12" stroke="#009def" strokeWidth="3" />
          <path d="M32 32 C32 28 32 28 32 32" stroke="#009def" strokeWidth="3" />
          <path d="M8 32 L4 28" stroke="#009def" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M56 32 L60 28" stroke="#009def" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="32" r="4" fill="#009def" opacity="0.15" />
          <circle cx="44" cy="32" r="4" fill="#009def" opacity="0.15" />
        </svg>
      )
    case 'emprestimo':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="32" cy="32" r="22" stroke="#009def" strokeWidth="3" />
          <text
            x="32"
            y="28"
            textAnchor="middle"
            fontFamily="Montserrat,sans-serif"
            fontWeight="700"
            fontSize="22"
            fill="#009def"
          >
            R$
          </text>
          <path
            d="M22 44 L30 38 L34 42 L42 34"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M38 34 L42 34 L42 38" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

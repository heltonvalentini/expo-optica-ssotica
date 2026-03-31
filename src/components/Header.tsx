export function Header() {
  return (
    <header className="bg-primary text-white py-4 px-4 text-center shadow-md">
      <div className="flex items-center justify-center gap-3">
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
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
        <div>
          <h1 className="text-xl font-bold tracking-tight">SSOtica</h1>
          <p className="text-xs text-blue-100 font-medium">Expo Óptica 2026</p>
        </div>
      </div>
    </header>
  )
}

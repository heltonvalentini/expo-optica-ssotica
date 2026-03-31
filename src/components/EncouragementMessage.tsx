export function EncouragementMessage() {
  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <div className="text-6xl mb-4">⏱️</div>

      <h2 className="text-2xl font-bold text-dark mb-2">O tempo acabou!</h2>
      <p className="text-dark/70 mb-6 text-base max-w-sm">
        Não foi dessa vez, mas não desanime! Visite o stand da SSOtica e
        conheça de perto todas as nossas inovações.
      </p>

      <div className="bg-primary-light rounded-xl p-4 max-w-sm w-full">
        <p className="text-sm text-dark font-medium">
          💡 Conheça o <strong>SSChat</strong>, <strong>OticaPay</strong>,{' '}
          <strong>TEF Embarcado</strong>, <strong>SS Lentes</strong> e{' '}
          <strong>Empréstimo Fácil</strong> no nosso stand!
        </p>
      </div>
    </div>
  )
}

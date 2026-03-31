# SSOtica - Expo Óptica 2026

Landing page interativa com jogo da memória para captação de leads na feira Expo Óptica. Visitantes escaneiam um QR Code, preenchem um cadastro e jogam para concorrer a prêmios.

## Fluxo

1. **QR Code** → Visitante acessa a landing page pelo celular
2. **Formulário** → Preenche Nome, E-mail, WhatsApp, CNPJ e se já é cliente SSOtica
3. **Jogo da Memória** → 10 cartas (5 pares) com as inovações do sistema SSOtica. Timer de 40 segundos
4. **Resultado** → Vencedor ganha um prêmio aleatório (trial de 7 dias). Perdedor recebe mensagem para visitar o stand

## Inovações nas cartas

- SSChat e SSAgentes
- OticaPay
- TEF Embarcado
- SS Lentes
- Empréstimo Fácil

## Prêmios

| Prêmio | Tipo |
|--------|------|
| Oticazap + Radar de Satisfação + Cashback | Trial 7 dias |
| ssChat | Trial 7 dias |
| Radar de Satisfação | Trial 7 dias |
| Cashback | Trial 7 dias |

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build)
- **Tailwind CSS v4**
- **React Router** (SPA com 3 rotas)

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

## Build e deploy

```bash
npm run build
```

A pasta `dist/` é gerada pronta para deploy estático. Configurações incluídas para Vercel (`vercel.json`) e Netlify (`public/_redirects`).

## Armazenamento de leads

Os dados do formulário + resultado do jogo são enviados para Google Sheets via Apps Script. Para configurar, adicione a URL do script em `src/utils/storage.ts`:

```ts
const SHEETS_URL = 'https://script.google.com/macros/s/SEU_ID/exec'
```

Se o envio falhar (WiFi instável na feira), os dados são salvos em localStorage como fallback.

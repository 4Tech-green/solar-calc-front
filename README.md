# SolarCalc — Frontend

Interface web do SolarCalc. Permite o upload de uma conta de luz e exibe a análise de viabilidade de energia solar com opções de sistema, custo e retorno financeiro.

**Deploy:** https://solar-calc-front.vercel.app  
**Backend:** https://github.com/4Tech-green/solar-calc-back

---

## Pré-requisitos

- Node.js 18+
- npm

---

## Clonando e rodando

```bash
git clone https://github.com/4Tech-green/solar-calc-front.git
cd solar-calc-front
npm install
npm run dev
```

Interface disponível em: `http://localhost:5173`

O frontend já vem configurado para apontar para `http://localhost:8080` em desenvolvimento. Certifique-se de que o backend está rodando antes de testar o upload.

---

## Variável de ambiente (deploy)

Para apontar para um backend diferente do localhost, crie um arquivo `.env.local`:

```
VITE_API_URL=https://solar-calc-back.onrender.com
```

---

## Estrutura do projeto

```
src/
├── App.jsx                  # Roteamento entre páginas
└── pages/
    ├── LandingPage.jsx      # Tela de upload da conta de luz
    └── ResultadoPage.jsx    # Tela de resultado com opções de sistema solar
```

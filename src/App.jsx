import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import ResultadoPage from './pages/ResultadoPage'

export default function App() {
  const [resultado, setResultado] = useState(null)

  if (resultado) {
    return <ResultadoPage dados={resultado} onVoltar={() => setResultado(null)} />
  }

  return <LandingPage onResultado={setResultado} />
}

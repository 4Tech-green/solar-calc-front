import { useState, useRef } from 'react'

export default function LandingPage({ onResultado }) {
  const [arquivo, setArquivo] = useState(null)
  const [preview, setPreview] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)
  const inputRef = useRef()

  function handleArquivo(file) {
    if (!file) return
    setArquivo(file)
    setPreview(URL.createObjectURL(file))
    setErro(null)
  }

  function handleDrop(e) {
    e.preventDefault()
    handleArquivo(e.dataTransfer.files[0])
  }

  async function handleEnviar() {
    if (!arquivo) {
      setErro('Selecione uma imagem da conta de luz.')
      return
    }

    setCarregando(true)
    setErro(null)

    const formData = new FormData()
    formData.append('imagem', arquivo)

    try {
      const base = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${base}/api/analise/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Erro ao processar a conta de luz.')

      const data = await res.json()
      onResultado(data)
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <span className="text-3xl">☀️</span>
          <div>
            <h1 className="text-xl font-bold text-gray-800">SolarCalc</h1>
            <p className="text-xs text-gray-500">Análise de viabilidade solar</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Descubra se energia solar vale para você
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Envie sua conta de luz e nossa IA analisa automaticamente a viabilidade
            de instalar painéis solares na sua residência — incluindo custo, retorno
            e legislação local.
          </p>
        </div>

        {/* Upload */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Envie sua conta de luz
          </h3>

          <div
            className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
            onClick={() => inputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-contain" />
            ) : (
              <>
                <div className="text-5xl mb-3">📄</div>
                <p className="text-gray-500">Arraste ou clique para selecionar</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG ou PDF — até 10MB</p>
              </>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={e => handleArquivo(e.target.files[0])}
          />

          {arquivo && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {arquivo.name}
            </p>
          )}

          {erro && (
            <p className="text-sm text-red-500 mt-3 text-center">{erro}</p>
          )}

          <button
            onClick={handleEnviar}
            disabled={carregando}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {carregando ? 'Analisando...' : 'Analisar minha conta ☀️'}
          </button>
        </div>

        {/* Cards informativos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: '🤖', titulo: 'IA extrai os dados', texto: 'Nossa inteligência artificial lê automaticamente os dados da sua conta.' },
            { icon: '📍', titulo: 'Análise por localidade', texto: 'Calculamos a irradiação solar e a legislação tributária do seu município.' },
            { icon: '💰', titulo: 'Retorno financeiro', texto: 'Receba opções de sistema com custo, economia anual e prazo de retorno.' },
          ].map(card => (
            <div key={card.titulo} className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-4xl mb-3">{card.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2">{card.titulo}</h4>
              <p className="text-sm text-gray-500">{card.texto}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

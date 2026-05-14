export default function ResultadoPage({ dados, onVoltar }) {
  const { dadosConta, viabilidade } = dados

  const opcoes = [
    {
      titulo: 'Básico',
      descricao: 'Cobre ~75% do consumo',
      custo: viabilidade.custoBasico,
      cor: 'border-blue-200 bg-blue-50',
      badge: 'bg-blue-100 text-blue-700',
    },
    {
      titulo: 'Recomendado',
      descricao: 'Cobre 100% do consumo',
      custo: viabilidade.custoIntermediario,
      cor: 'border-orange-400 bg-orange-50 ring-2 ring-orange-400',
      badge: 'bg-orange-100 text-orange-700',
      destaque: true,
    },
    {
      titulo: 'Completo',
      descricao: 'Gera créditos de energia',
      custo: viabilidade.custoCompleto,
      cor: 'border-green-200 bg-green-50',
      badge: 'bg-green-100 text-green-700',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <button onClick={onVoltar} className="text-gray-400 hover:text-gray-600 mr-2">←</button>
          <span className="text-3xl">☀️</span>
          <div>
            <h1 className="text-xl font-bold text-gray-800">SolarCalc</h1>
            <p className="text-xs text-gray-500">Resultado da análise</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Dados do cliente */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Dados identificados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Info label="Nome" valor={dadosConta.nome} />
            <Info label="Distribuidora" valor={dadosConta.distribuidora} />
            <Info label="Cidade" valor={`${dadosConta.cidade}/${dadosConta.estado}`} />
            <Info label="Consumo mensal" valor={`${dadosConta.consumoMensalKwh} kWh`} />
            <Info label="Valor atual" valor={`R$ ${dadosConta.valorMensalReais.toFixed(2)}`} />
            <Info label="Potência estimada" valor={`${viabilidade.potenciaEstimadaKwp} kWp`} />
            <Info label="Irradiação local" valor={`${viabilidade.irradiacaoMediaAnual} kWh/m²/dia`} />
            <Info label="Economia anual" valor={`R$ ${viabilidade.economiaAnualEstimada.toFixed(2)}`} />
          </div>
        </div>

        {/* Opções de sistema */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Opções de sistema solar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {opcoes.map(op => (
            <div key={op.titulo} className={`rounded-2xl border-2 p-6 ${op.cor}`}>
              {op.destaque && (
                <div className="text-center mb-3">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MAIS POPULAR
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-800 text-center mb-1">{op.titulo}</h3>
              <p className="text-sm text-gray-500 text-center mb-4">{op.descricao}</p>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-800">
                  R$ {op.custo.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Payback estimado</span>
                  <span className="font-semibold">{viabilidade.paybackAnos} anos</span>
                </div>
                <div className="flex justify-between">
                  <span>Economia anual</span>
                  <span className="font-semibold text-green-600">
                    R$ {viabilidade.economiaAnualEstimada.toFixed(2)}
                  </span>
                </div>
              </div>
              <button className={`w-full mt-5 py-2 rounded-xl font-semibold text-sm ${op.destaque ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'} transition-colors`}>
                Quero este
              </button>
            </div>
          ))}
        </div>

        {/* Legislação */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Legislação e tributação</h2>
          <p className="text-sm text-gray-600 mb-2">🏛️ {viabilidade.legislacaoEstadual}</p>
          {viabilidade.temIncentivosLocais && (
            <p className="text-sm text-green-600 font-medium">✅ Seu município possui incentivos locais</p>
          )}
          {viabilidade.observacoes && (
            <p className="text-sm text-gray-500 mt-2">💡 {viabilidade.observacoes}</p>
          )}
        </div>

        <div className="text-center mt-8">
          <button onClick={onVoltar} className="text-orange-500 hover:text-orange-600 font-medium">
            ← Analisar outra conta
          </button>
        </div>
      </main>
    </div>
  )
}

function Info({ label, valor }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="font-semibold text-gray-800">{valor}</p>
    </div>
  )
}

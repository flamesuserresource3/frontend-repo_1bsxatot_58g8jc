import React from 'react';

// Pequeno questionário DISC com perguntas discretas
// Opções A-D mapeiam para perfis no backend (A=D, B=I, C=S, D=C)
const QUESTIONS = [
  {
    id: 1,
    q: 'Quando preciso decidir rápido, eu costumo…',
    opts: {
      A: 'Ir direto ao ponto e escolher logo',
      B: 'Ouvir pessoas e buscar opiniões',
      C: 'Manter a calma e seguir o que já funciona',
      D: 'Analisar prós e contras com cuidado',
    },
  },
  {
    id: 2,
    q: 'No trabalho/equipe, sou mais lembrado por…',
    opts: {
      A: 'Determinação e foco em resultados',
      B: 'Comunicação e entusiasmo',
      C: 'Paciência e apoio',
      D: 'Precisão e organização',
    },
  },
  {
    id: 3,
    q: 'Quando algo muda de última hora, eu…',
    opts: {
      A: 'Assumo o controle e adapto o plano',
      B: 'Converso com todos e motivo o grupo',
      C: 'Procuro estabilidade e segurança',
      D: 'Reviso detalhes para evitar erros',
    },
  },
  {
    id: 4,
    q: 'Para me sentir confiante em um tratamento, eu…',
    opts: {
      A: 'Quero clareza sobre o resultado final',
      B: 'Gosto de saber como será a experiência',
      C: 'Prefiro sentir confiança na equipe',
      D: 'Preciso de dados e explicações técnicas',
    },
  },
];

export default function DiscQuiz({ value, onChange }) {
  const handleSelect = (qid, letter) => {
    const next = { ...(value || {}) };
    next[qid] = letter;
    onChange(next);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Seu estilo (DISC)</h3>
      <p className="text-sm text-gray-600">Responda de forma espontânea. Não há certo ou errado.</p>
      <div className="space-y-6">
        {QUESTIONS.map((item) => (
          <div key={item.id} className="rounded-xl border border-gray-200 p-4">
            <p className="font-medium text-gray-900 mb-4">{item.q}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(item.opts).map(([letter, label]) => {
                const selected = value?.[item.id] === letter;
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => handleSelect(item.id, letter)}
                    className={`text-left rounded-lg border px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                      selected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2 font-semibold">{letter})</span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

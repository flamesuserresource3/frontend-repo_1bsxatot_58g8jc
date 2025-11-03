import React, { useMemo, useState } from 'react';
import DiscQuiz from './DiscQuiz';

const required = (v) => (v ? undefined : 'Obrigatório');

export default function LeadForm({ onSubmitted }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    motivo_principal: '',
    como_conheceu: '',
    preferencia_horario: '',
    teve_diagnostico_previo: '',
    detalhes_diagnostico: '',
    pronto_para_fechar: 3,
    orcamento_estimado: '',
  });
  const [disc, setDisc] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

  const discRespostas = useMemo(() => {
    // Converte objeto {qid: 'A'} em lista ordenada por qid
    const ids = Object.keys(disc)
      .map((k) => parseInt(k, 10))
      .sort((a, b) => a - b);
    return ids.map((id) => disc[id]);
  }, [disc]);

  const validate = () => {
    const errors = {
      nome: required(form.nome),
    };
    return Object.values(errors).filter(Boolean)[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const resp = await fetch(`${backendUrl}/api/lead-intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          teve_diagnostico_previo:
            form.teve_diagnostico_previo === ''
              ? null
              : form.teve_diagnostico_previo === 'sim',
          pronto_para_fechar: Number(form.pronto_para_fechar) || null,
          disc_respostas: discRespostas,
        }),
      });
      if (!resp.ok) throw new Error('Falha ao enviar');
      const data = await resp.json();
      onSubmitted?.(data);
      // Reset básico
      setForm({
        nome: '',
        email: '',
        telefone: '',
        motivo_principal: '',
        como_conheceu: '',
        preferencia_horario: '',
        teve_diagnostico_previo: '',
        detalhes_diagnostico: '',
        pronto_para_fechar: 3,
        orcamento_estimado: '',
      });
      setDisc({});
    } catch (e) {
      setError('Não foi possível enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Seus dados</h2>
                <p className="text-sm text-gray-600 mb-4">Leva menos de 3 minutos.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nome completo *</label>
                    <input
                      type="text"
                      value={form.nome}
                      onChange={update('nome')}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      placeholder="voce@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone/WhatsApp</label>
                    <input
                      type="tel"
                      value={form.telefone}
                      onChange={update('telefone')}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      placeholder="(00) 90000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Como nos conheceu?</label>
                    <select
                      value={form.como_conheceu}
                      onChange={update('como_conheceu')}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    >
                      <option value="">Selecione</option>
                      <option>Indicação</option>
                      <option>Google</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>Outros</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Motivo principal da consulta</label>
                    <textarea
                      rows={3}
                      value={form.motivo_principal}
                      onChange={update('motivo_principal')}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      placeholder="Conte brevemente o que busca resolver"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Diagnóstico e decisão</h2>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Já teve diagnóstico prévio?</label>
                    <select
                      value={form.teve_diagnostico_previo}
                      onChange={update('teve_diagnostico_previo')}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    >
                      <option value="">Selecione</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Prontidão para iniciar</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={form.pronto_para_fechar}
                      onChange={update('pronto_para_fechar')}
                      className="mt-3 w-full"
                    />
                    <div className="text-xs text-gray-600 mt-1">1 = Ainda avaliando • 5 = Pronto para fechar</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Orçamento estimado</label>
                    <select
                      value={form.orcamento_estimado}
                      onChange={update('orcamento_estimado')}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    >
                      <option value="">Selecione</option>
                      <option>Até R$ 1.000</option>
                      <option>R$ 1.000 - R$ 5.000</option>
                      <option>R$ 5.000 - R$ 10.000</option>
                      <option>Acima de R$ 10.000</option>
                      <option>Prefiro avaliar na consulta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preferência de horário</label>
                    <select
                      value={form.preferencia_horario}
                      onChange={update('preferencia_horario')}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    >
                      <option value="">Selecione</option>
                      <option>Manhã</option>
                      <option>Tarde</option>
                      <option>Noite</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Detalhes do diagnóstico (se houver)</label>
                  <textarea
                    rows={3}
                    value={form.detalhes_diagnostico}
                    onChange={update('detalhes_diagnostico')}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    placeholder="Ex.: obturação, implante, ortodontia, etc."
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <DiscQuiz value={disc} onChange={setDisc} />
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-800">{error}</div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  {loading ? 'Enviando…' : 'Enviar informações'}
                </button>
                <span className="text-xs text-gray-500">Seus dados são usados somente para seu atendimento.</span>
              </div>
            </form>
          </div>
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                <p className="text-sm">
                  Dica: você receberá um retorno com a melhor proposta conforme suas respostas.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900">Como funciona</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Leva poucos minutos para preencher</li>
                  <li>Ajuda o dentista a preparar seu atendimento</li>
                  <li>Você pode ajustar qualquer informação na consulta</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

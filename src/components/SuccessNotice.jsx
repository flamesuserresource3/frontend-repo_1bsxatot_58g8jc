import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessNotice({ onClose, code }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
      <div className="flex items-start gap-4">
        <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Recebemos suas informações!</h4>
          <p className="text-emerald-800/90">
            Obrigado por preencher. Nossa equipe entrará em contato para confirmar seu atendimento.
          </p>
          {code && (
            <p className="text-sm text-emerald-800/80">Protocolo: <span className="font-mono">{code}</span></p>
          )}
          <div>
            <button
              onClick={onClose}
              className="mt-2 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { User, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 w-fit rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Pré-cadastro de pacientes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Conheça seu paciente antes da primeira consulta
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            Envie um link simples para seus leads responderem em poucos minutos. Descubra histórico, prontidão de compra e o perfil DISC por meio de perguntas discretas.
          </p>
          <div className="flex items-center gap-3 text-gray-500">
            <User className="h-5 w-5" />
            <span className="text-sm">Feito para clínicas odontológicas no Brasil</span>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-32 bg-gradient-to-t from-emerald-50/40 to-transparent" />
    </section>
  );
}

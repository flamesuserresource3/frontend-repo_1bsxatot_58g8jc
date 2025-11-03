import React, { useState } from 'react';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import SuccessNotice from './components/SuccessNotice';

function App() {
  const [submitted, setSubmitted] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/40">
      <Hero />
      <main className="mx-auto max-w-6xl px-4 md:px-6 pb-16">
        {submitted ? (
          <SuccessNotice
            code={submitted?.id}
            onClose={() => setSubmitted(null)}
          />
        ) : (
          <LeadForm onSubmitted={setSubmitted} />
        )}
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Sua Clínica Odontológica</p>
          <a href="#" className="hover:text-gray-700">Política de Privacidade</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

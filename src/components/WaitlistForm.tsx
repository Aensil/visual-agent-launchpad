import React, { useState } from 'react';
import { supabaseclient } from '../lib/supabaseclient'; // Asegúrate que esto apunte bien
import { v4 as uuidv4 } from 'uuid';

const WaitlistForm: React.FC = () => {
  const [previousSolution, setPreviousSolution] = useState<string | null>(null);
  const [contactPreference, setContactPreference] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const formData = {
      uuid: uuidv4(),
      name: data.get('name') as string,
      email: data.get('email') as string,
      occupation: data.get('occupation') as string,
      challenge: data.get('challenge') as string,
      previous_solution: data.get('previous_solution') as string,
      solution_feedback: data.get('solution_feedback') as string || '',
      ideal_features: data.get('ideal_features') as string,
      investment: data.get('investment') as string,
      beta_tester: data.get('beta_tester') as string,
      contact_preference: data.get('contact_preference') as string,
      phone: data.get('phone') ? Number(data.get('phone')) : null,
      source: data.get('source') as string,
      willing_to_share: data.get('willing_to_share') as string,
    };

    try {
      const { error } = await supabaseclient.from('waitlist').insert([formData]);
      if (error) {
        console.error('Error saving to Supabase:', error.message);
        alert('Ocurrió un error al guardar tu información. Intenta nuevamente.');
        return;
      }

      alert('¡Gracias por unirte a nuestra lista de espera! Te contactaremos pronto.');
      form.reset();
    } catch (err: any) {
      console.error('Unexpected error:', err);
      alert('Error inesperado. Intenta más tarde.');
    }
  };


  return (
    <form id="waitlist-form" onSubmit={handleSubmit}>
      {/* Sección 1: Conociendo a tu audiencia */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">🧠</span> Conociendo a tu audiencia
        </h3>

        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Cuál es tu nombre?</label>
          <input 
            name="name"
            type="text" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Cuál es tu dirección de correo electrónico?</label>
          <input 
            name="email"
            type="email" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿A qué te dedicas actualmente?</label>
          <select 
            name="occupation"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            required
          >
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="Estudiante">Estudiante</option>
            <option value="Profesional">Profesional</option>
            <option value="Emprendedor">Emprendedor</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      {/* Sección 2: Identificando necesidades y desafíos */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">🎯</span> Identificando necesidades y desafíos
        </h3>

        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Qué desafío principal enfrentas actualmente en relación con soluciones visuales o IA?</label>
          <textarea 
            name="challenge"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50 min-h-24"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Has utilizado alguna solución para este problema anteriormente?</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="previous_solution" 
                value="Sí"
                className="mr-2"
                onChange={() => setPreviousSolution('Sí')}
              />
              Sí
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="previous_solution" 
                value="No"
                className="mr-2"
                onChange={() => setPreviousSolution('No')}
              />
              No
            </label>
          </div>
        </div>

        {previousSolution === 'Sí' && (
          <div className="mb-4">
            <label className="block mb-2 text-white/80">¿Qué te gustó o no te gustó de esa solución?</label>
            <textarea 
              name="solution_feedback"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50 min-h-24"
            ></textarea>
          </div>
        )}
      </div>

      {/* Sección 3: Explorando expectativas y preferencias */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">💡</span> Explorando expectativas y preferencias
        </h3>

        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Qué características te gustaría ver en una solución ideal para tu problema?</label>
          <textarea 
            name="ideal_features"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50 min-h-24"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Cuánto estarías dispuesto a invertir en una solución que resuelva este desafío?</label>
          <select 
            name="investment"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            required
          >
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="<$50">Menos de $50</option>
            <option value="$50-$100">$50 - $100</option>
            <option value="$100-$200">$100 - $200</option>
            <option value=">$200">Más de $200</option>
          </select>
        </div>
      </div>

      {/* Sección 4: Participación y compromiso */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">🚀</span> Participación y compromiso
        </h3>

        {/* Resto del código igual... */}

        {(contactPreference === 'Mensaje de texto' || contactPreference === 'Llamada telefónica') && (
          <div className="mb-4">
            <label className="block mb-2 text-white/80">Número de teléfono</label>
            <input 
              name="phone"
              type="tel" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            />
          </div>
        )}
      </div>

      {/* Sección 5: Difusión y referencias */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">📣</span> Difusión y referencias
        </h3>

        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Cómo te enteraste de nosotros?</label>
          <select 
            name="source"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            required
          >
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="Redes sociales">Redes sociales</option>
            <option value="Recomendación">Recomendación</option>
            <option value="Búsqueda en línea">Búsqueda en línea</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-electric-cyan to-neural-indigo text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Unirme a la Lista de Espera
      </button>
    </form>
  );
};

export default WaitlistForm;
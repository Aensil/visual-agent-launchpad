import React, { useState } from 'react';

const WaitlistForm: React.FC = () => {
  const [previousSolution, setPreviousSolution] = useState<string | null>(null);
  const [contactPreference, setContactPreference] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para procesar el formulario
    alert('¡Gracias por unirte a nuestra lista de espera! Te contactaremos pronto.');
    // Aquí iría el código para enviar los datos a tu servidor
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
            type="text" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Cuál es tu dirección de correo electrónico?</label>
          <input 
            type="email" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿A qué te dedicas actualmente?</label>
          <select 
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
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50 min-h-24"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Cuánto estarías dispuesto a invertir en una solución que resuelva este desafío?</label>
          <select 
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
        
        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Te gustaría ser parte de nuestro grupo de prueba beta y brindarnos tu opinión?</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="beta_tester" value="Sí" className="mr-2" required />
              Sí
            </label>
            <label className="flex items-center">
              <input type="radio" name="beta_tester" value="No" className="mr-2" />
              No
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Cómo prefieres que te contactemos con actualizaciones?</label>
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="contact_preference" 
                value="Correo electrónico" 
                className="mr-2" 
                required
                onChange={() => setContactPreference('Correo electrónico')}
              />
              Correo electrónico
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="contact_preference" 
                value="Mensaje de texto" 
                className="mr-2"
                onChange={() => setContactPreference('Mensaje de texto')}
              />
              Mensaje de texto
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="contact_preference" 
                value="Llamada telefónica" 
                className="mr-2"
                onChange={() => setContactPreference('Llamada telefónica')}
              />
              Llamada telefónica
            </label>
          </div>
        </div>
        
        {(contactPreference === 'Mensaje de texto' || contactPreference === 'Llamada telefónica') && (
          <div className="mb-4">
            <label className="block mb-2 text-white/80">Número de teléfono</label>
            <input 
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
        
        <div className="mb-4">
          <label className="block mb-2 text-white/80">¿Estarías dispuesto a compartir nuestra iniciativa con tus amigos o colegas?</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="willing_to_share" value="Sí" className="mr-2" required />
              Sí
            </label>
            <label className="flex items-center">
              <input type="radio" name="willing_to_share" value="No" className="mr-2" />
              No
            </label>
          </div>
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
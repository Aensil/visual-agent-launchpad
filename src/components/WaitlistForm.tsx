import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Lazy load Supabase client
const getSupabaseClient = () => import('../lib/supabaseclient').then(mod => mod.supabaseclient);

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
      phone: data.get('phone') as string || '',
      source: data.get('source') as string,
      willing_to_share: data.get('willing_to_share') as string,
    };

    try {
      const supabaseclient = await getSupabaseClient();
      const { error } = await supabaseclient.from('waitlist').insert([formData]);
      if (error) {
        console.error('Error saving to Supabase:', error.message);
        alert('An error occurred while saving your information. Please try again.');
        return;
      }

      alert('¡Thanks for joining the waitlist! We will contact you soon.');
      form.reset();
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Error unknown. Try again later.');
    }
  };

  return (
    <form id="waitlist-form" onSubmit={handleSubmit}>
      {/* Section 1: Getting to know your audience */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">🧠</span> Getting to know your audience
        </h3>
  
        <div className="mb-4">
          <label className="block mb-2 text-white/80">What is your name?</label>
          <input 
            name="name"
            type="text" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            required
          />
        </div>
  
        <div className="mb-4">
          <label className="block mb-2 text-white/80">What is your email address?</label>
          <input 
            name="email"
            type="email" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            required
          />
        </div>
  
        <div className="mb-4">
          <label className="block mb-2 text-white/80">What is your current occupation?</label>
          <select 
                name="occupation"
                className="w-full bg-gray-800 text-white border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
                defaultValue=""
                required
              >
                <option value="" disabled>Select an option</option>
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Other">Other</option>
              </select>

        </div>
      </div>
  
      {/* Section 2: Identifying needs and challenges */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">🎯</span> Identifying needs and challenges
        </h3>
  
        <div className="mb-4">
          <label className="block mb-2 text-white/80">What main challenge are you currently facing regarding visual solutions or AI?</label>
          <textarea 
            name="challenge"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50 min-h-24"
            required
          ></textarea>
        </div>
  
        <div className="mb-4">
          <label className="block mb-2 text-white/80">Have you used any solution for this problem before?</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="previous_solution" 
                value="Yes"
                className="mr-2"
                onChange={() => setPreviousSolution('Yes')}
              />
              Yes
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
  
        {previousSolution === 'Yes' && (
          <div className="mb-4">
            <label className="block mb-2 text-white/80">What did you like or dislike about that solution?</label>
            <textarea 
              name="solution_feedback"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50 min-h-24"
            ></textarea>
          </div>
        )}
      </div>
  
      {/* Section 3: Exploring expectations and preferences */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">💡</span> Exploring expectations and preferences
        </h3>
  
        <div className="mb-4">
          <label className="block mb-2 text-white/80">What features would you like to see in an ideal solution for your problem?</label>
          <textarea 
            name="ideal_features"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50 min-h-24"
            required
          ></textarea>
        </div>
  
        <div className="mb-4">
          <label className="block mb-2 text-white/80">How much would you be willing to invest in a solution that resolves this challenge?</label>
          <select 
            name="investment"
            className="w-full bg-gray-800 text-white border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            defaultValue=""
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="<$50">Less than $50</option>
            <option value="$50-$100">$50 - $100</option>
            <option value="$100-$200">$100 - $200</option>
            <option value=">$200">More than $200</option>
          </select>
        </div>
      </div>
  
      {/* Section 4: Participation and commitment */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">🚀</span> Participation and commitment
        </h3>
  
        <div className="mb-4">
          <label className="block mb-2 text-white/80">How would you prefer to be contacted for updates?</label>
          <select 
            name="contact_preference"
            className="w-full bg-gray-800 text-white border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            defaultValue=""
            onChange={(e) => setContactPreference(e.target.value)}
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="Email">Email</option>
            <option value="Text message">Text message</option>
            <option value="Phone call">Phone call</option>
          </select>
        </div>
  
        {(contactPreference === 'Text message' || contactPreference === 'Phone call') && (
          <div className="mb-4">
            <label className="block mb-2 text-white/80">Phone number with country code</label>
            <input 
              name="phone"
              type="tel" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            />
          </div>
        )}
      </div>
  
      {/* Section 5: Outreach and references */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <span className="mr-2">📣</span> Outreach and references
        </h3>
  
        <div className="mb-4">
          <label className="block mb-2 text-white/80">How did you hear about us?</label>
          <select 
            name="source"
            className="w-full bg-gray-800 text-white border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neural-indigo/50"
            defaultValue=""
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="Social media">Social media</option>
            <option value="Recommendation">Recommendation</option>
            <option value="Online search">Online search</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
  
      <button 
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-electric-cyan to-neural-indigo text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Join the Waitlist
      </button>
    </form>
  );
};

export default WaitlistForm;
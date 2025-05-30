
import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function OnboardingForm() {
  const [form, setForm] = useState({ topic: '', audience: '', goal: '', format: '' });
  const db = getFirestore();
  const auth = getAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    await setDoc(doc(db, 'users', user.uid), { onboarding: form }, { merge: true });
    alert('Saved onboarding info!');
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Onboarding</h2>
      {['topic', 'audience', 'goal', 'format'].map((field) => (
        <input key={field} name={field} placeholder={field} onChange={handleChange} className="block mb-2 p-2 border" />
      ))}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}
export default OnboardingForm;

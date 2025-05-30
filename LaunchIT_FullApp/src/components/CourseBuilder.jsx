
import React, { useState } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

function CourseBuilder() {
  const [outline, setOutline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  const generateOutline = async () => {
    setLoading(true);
    const user = auth.currentUser;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    const { topic, audience } = userSnap.data().onboarding;

    try {
      const response = await axios.post('/generateOutline', { topic, audience });
      await setDoc(userRef, { courseOutline: response.data.outline }, { merge: true });
      setOutline(response.data.outline);
    } catch (err) {
      console.error(err);
      setError('Outline generation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-lg">Course Builder</h2>
      <button onClick={generateOutline} className="bg-purple-600 text-white px-4 py-2 rounded">Generate</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {outline && <pre>{JSON.stringify(outline, null, 2)}</pre>}
    </div>
  );
}
export default CourseBuilder;

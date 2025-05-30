
# Launch-I.T. - Full Development Documentation

## Overview
Launch-I.T. is an AI-powered SaaS platform that helps users ideate, build, brand, and market online courses, bootcamps, or classes. The product is designed for creators, educators, and entrepreneurs looking to monetize their expertise with minimal technical friction.

---

## Tech Stack

### Frontend
- React (with Hooks)
- Tailwind CSS
- React Router

### Backend
- Firebase Authentication
- Firebase Firestore
- Firebase Cloud Functions (Node.js)
- OpenAI API (GPT-4o)

### Hosting & Dev
- Firebase Hosting
- Replit (development)
- GitHub (version control)

---

## Project Structure

```
launch-it/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── OnboardingForm.jsx
│   │   ├── CourseBuilder.jsx
│   │   ├── BrandBuilder.jsx
│   │   ├── LaunchEngine.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   ├── App.jsx
│   ├── index.js
├── functions/
│   └── aiAssistant.js
├── .firebaserc
├── firebase.json
├── tailwind.config.js
├── package.json
```

---

## User Flow

### 1. Onboarding
- Step-by-step form:
  - Course Topic
  - Audience Type
  - Learning Goals
  - Format Preference
- Data stored in Firestore under user UID
- On completion, user is routed to Course Builder

### 2. Course Builder
- Loads previous onboarding data
- Sends POST to Firebase Function `/generateOutline`
- Receives course structure JSON
- Editable UI for course layout
- Save to Firestore

### 3. Brand Builder
- Input: Course title, tone, industry
- Output:
  - Tagline
  - Sales pitch
  - Branding suggestions (colors/fonts)
- Landing page preview with mockup

### 4. Launch Engine
- Timeline of marketing events
- CTA buttons for:
  - Email generation
  - Ad script generation
- Toggle steps as completed

### 5. AI Assistant
- Floating assistant icon
- Natural language Q&A
- Context-aware responses using user Firestore data

---

## Firebase Function (Example)

### `functions/aiAssistant.js`

```js
const functions = require('firebase-functions');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: functions.config().openai.key,
});
const openai = new OpenAIApi(configuration);

exports.generateOutline = functions.https.onRequest(async (req, res) => {
  const { topic, audience } = req.body;

  const prompt = `Create a course outline for the topic "${topic}" aimed at "${audience}". Return the output as JSON with modules and lessons.`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const outline = completion.data.choices[0].message.content;
    res.status(200).send({ outline });
  } catch (error) {
    console.error("Error generating outline:", error);
    res.status(500).send("Failed to generate outline.");
  }
});
```

---

## Firestore Schema

### `users/{uid}`
```json
{
  "email": "user@example.com",
  "onboarding": {
    "topic": "Digital Marketing",
    "audience": "Small business owners",
    "goal": "Generate passive income"
  },
  "courseOutline": {
    "modules": [
      {
        "title": "Introduction",
        "lessons": ["Welcome", "Expectations", "Tools Needed"]
      }
    ]
  },
  "branding": {
    "tagline": "Turn Skills Into Income",
    "colors": ["#5b21b6", "#1e293b"]
  }
}
```

---

## Authentication
- Firebase Auth with:
  - Email/Password
  - Google OAuth

---

## Deployment
1. `firebase login`
2. `firebase init` (Hosting + Functions + Firestore)
3. `firebase deploy`

---

## Future Additions
- Stripe integration for course payments
- Marketplace listing system
- Live cohort management
- Embedded analytics dashboard

---

## Contributors
- Product Owner: [Insert Name]
- Designer: [Insert Name]
- Lead Developer: [Insert Name]
- AI Integration: [Insert Name]

---

## License
MIT


const functions = require('firebase-functions');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors')({ origin: true });

const configuration = new Configuration({
  apiKey: functions.config().openai.key,
});
const openai = new OpenAIApi(configuration);

exports.generateOutline = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { topic, audience } = req.body;
    const prompt = `Create a course outline for the topic "${topic}" aimed at "${audience}". Return structured modules and lessons in JSON.`;

    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      });

      const outline = completion.data.choices[0].message.content;
      res.status(200).send({ outline: JSON.parse(outline) });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Failed to generate outline.');
    }
  });
});

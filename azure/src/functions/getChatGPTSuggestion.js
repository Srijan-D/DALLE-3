const { app } = require('@azure/functions');
const openai = require('../../lib/openai');

app.http('getChatGPTSuggestion', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const response = await openai.createCompletion({
            model: 'gpt-3.5-turbo-instruct',
            prompt: 'Write a random text prompt for DALL.E to generate an image, this prompt will be shown to the user,include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic,4K, abstract, modern, black and white etc. Do not wrap the answer in quotes',
            max_tokens: 100,
            temperature: 0.9,
        })
        const responseText = response.data.choices[0].text;

        return { body: responseText };
    }
});

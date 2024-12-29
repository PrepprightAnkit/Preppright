// contentModerator.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default class ContentModerator {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });
    
    this.generationConfig = {
      temperature: 0,  // Set to 0 for consistent results
      topP: 1,
      topK: 1,
      maxOutputTokens: 1, // We only need a single token response
    };
  }

  async isContentSafe(text) {
    try {
      const prompt = `You are a content moderation system. Analyze the following text for any inappropriate content, including:
- Explicit profanity or obscenities in any language
- Masked profanity using symbols (e.g., @ss, f*ck)
- Intentionally misspelled inappropriate words
- Hidden inappropriate meanings or context
- Hate speech or discriminatory language
- Offensive slang or innuendos
- Threatening or harassing language

Text to analyze: "${text}"

Respond with EXACTLY one word:
- "true" if the content is safe and appropriate
- "false" if the content contains ANY inappropriate elements

Just the word true or false, nothing else.`;

      const chatSession = this.model.startChat({
        generationConfig: this.generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      const response = result.response.text().toLowerCase().trim();
      
      return response === 'true';
    } catch (error) {
      console.error('Content moderation error:', error);
      return false; // Fail safe - reject content if there's an error
    }
  }
}
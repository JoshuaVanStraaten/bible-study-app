import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateExplanation(book, chapter, text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a Bible study assistant. Provide a clear, easy-to-understand explanation of ${book} Chapter ${chapter}.

    Bible Text:
    ${text}

    Please provide:
    1. **Key Themes and Meaning**: What are the main themes and what is happening in this chapter?
    2. **Biblical Context**: How does this chapter fit into the broader biblical narrative?
    3. **Practical Application**: How can readers apply these teachings to their lives today?

    Keep the explanation conversational, accessible to both new and seasoned believers, and around 300-400 words.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const explanation = response.text();

    return explanation;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate explanation');
  }
}

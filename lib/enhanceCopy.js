import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function enhanceCopy(title, description) {
  const prompt = `
  Create persuasive, premium e-commerce copy for this product:
  Product Name: ${title}
  Product Details: ${description}
  
  Return JSON with:
  - "headline"
  - "bulletPoints" (array)
  - "cta"
  - "longDescription"
  `;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  try {
    return JSON.parse(res.choices[0].message.content);
  } catch {
    return { headline: title, bulletPoints: [], cta: "", longDescription: description };
  }
}

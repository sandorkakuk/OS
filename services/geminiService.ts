
import { GoogleGenAI, Type } from "@google/genai";
import { OSDetail, DeepDiveResult, GroundingSource } from "../types";

export const getOSDeepDive = async (osName: string): Promise<DeepDiveResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // 1. Get Text Details and Search Grounding
  const textResponse = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Adj részletes áttekintést a(z) "${osName}" operációs rendszerről magyar nyelven. 
    Kérlek térj ki a történetére, technikai újításaira és a vizuális megjelenésére (UI).
    Keress hiteles forrásokat és linkeket eredeti képernyőképekhez a webes keresővel!`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          history: { type: Type.STRING },
          innovations: { type: Type.ARRAY, items: { type: Type.STRING } },
          impact: { type: Type.STRING },
          funFact: { type: Type.STRING },
          visualDescription: { type: Type.STRING, description: "A system interface visual description for image generation." }
        },
        required: ["title", "history", "innovations", "impact", "funFact", "visualDescription"]
      }
    }
  });

  const detail = JSON.parse(textResponse.text.trim()) as OSDetail;
  const sources: GroundingSource[] = textResponse.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.web)
    ?.map(chunk => ({
      title: chunk.web.title,
      uri: chunk.web.uri
    })) || [];

  // 2. Generate Visual Reconstruction
  let imageUrl = "";
  try {
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `A high-quality historical reconstruction of the user interface (UI) of the operating system: ${osName}. 
          The image should show a screen with windows, menus, or command lines as they looked in ${detail.title}. 
          Authentic retro computing aesthetic. No modern elements.` }
        ]
      },
      config: {
        imageConfig: { aspectRatio: "16:9" }
      }
    });

    for (const part of imageResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  } catch (imgError) {
    console.warn("Image generation failed:", imgError);
  }

  return { detail, imageUrl, sources };
};

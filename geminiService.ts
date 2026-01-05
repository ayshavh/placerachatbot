
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface CompanyDetailsResult {
  text: string;
}

export const fetchCompanyDetails = async (companyName: string): Promise<CompanyDetailsResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide current job session and recruitment details for ${companyName}.
      
      STRICT REQUIREMENTS:
      - Use simple English.
      - No emojis.
      - No numbered lists.
      - Keep it structured and concise.
      - Return the response exactly in this format:
      
      Company overview: [A short summary]
      Domain / services: [List domains]
      Headquarters: [City, Country]
      Common fresher roles: [List roles]
      Approximate fresher salary package: [Package range]
      Specific Eligibility Criteria: [Include Minimum CGPA, Backlog policy, and Eligible branches for latest recruitment]
      Official Website: [Direct URL to the company's official website]
      `,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const text = response.text || 'Could not fetch company details at this time.';
    
    return { text };
  } catch (error) {
    console.error('Error fetching company details:', error);
    return { 
      text: 'An error occurred while fetching company details. Please try again later.'
    };
  }
};

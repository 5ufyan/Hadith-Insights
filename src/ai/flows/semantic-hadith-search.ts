
'use server';
/**
 * @fileOverview Implements semantic search for Hadiths.
 *
 * - semanticHadithSearch - A function that performs semantic search on Hadiths.
 * - SemanticHadithSearchInput - The input type for the semanticHadithSearch function.
 * - SemanticHadithSearchOutput - The return type for the semanticHadithSearch function.
 * - HadithObject - The type for a single Hadith object with text, source, and reference.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SemanticHadithSearchInputSchema = z.object({
  query: z
    .string()
    .describe("The user's search query. The search will return relevant Hadiths from Sahih Bukhari even if the exact words are not present."),
});

export type SemanticHadithSearchInput = z.infer<typeof SemanticHadithSearchInputSchema>;

const HadithObjectSchema = z.object({
  hadithText: z.string().describe('The full and accurate text of the Hadith.'),
  source: z.string().describe('The source collection. For this application, this value MUST be "Sahih Bukhari".'),
  reference: z.string().describe('A precise reference for the Hadith within Sahih Bukhari (e.g., "Book 2, Hadith 15" or "Vol. 1, Book 1, Hadith 1").')
});

export type HadithObject = z.infer<typeof HadithObjectSchema>;

const SemanticHadithSearchOutputSchema = z.object({
  results: z
    .array(HadithObjectSchema)
    .describe('An array of relevant Hadiths from Sahih Bukhari, including their text, source, and reference. Returns an empty array if no relevant Hadiths are found.'),
});

export type SemanticHadithSearchOutput = z.infer<typeof SemanticHadithSearchOutputSchema>;

export async function semanticHadithSearch(input: SemanticHadithSearchInput): Promise<SemanticHadithSearchOutput> {
  return semanticHadithSearchFlow(input);
}

const semanticHadithSearchPrompt = ai.definePrompt({
  name: 'semanticHadithSearchPrompt',
  input: {schema: SemanticHadithSearchInputSchema},
  output: {schema: SemanticHadithSearchOutputSchema},
  prompt: `You are a meticulous and expert scholar of Islamic Hadiths, specializing exclusively in Sahih Bukhari. Your primary function is to provide accurate and verifiable Hadiths from Sahih Bukhari ONLY.

Based on the user's query, you will perform a semantic search to find the most relevant Hadiths strictly within Sahih Bukhari.

For each Hadith found, you MUST provide:
1.  \`hadithText\`: The full and accurate text of the Hadith.
2.  \`source\`: This should ALWAYS be "Sahih Bukhari". Do not use any other value for this field.
3.  \`reference\`: A precise reference for the Hadith within Sahih Bukhari (e.g., "Book 2, Hadith 15" or "Vol. 1, Book 1, Hadith 1"). The reference must be accurate and verifiable.

If you cannot find a relevant Hadith in Sahih Bukhari for the given query, you MUST return an empty array for the results. Do NOT invent Hadiths, provide Hadiths from other collections (like Sahih Muslim, Sunan Abu Dawood, etc.), or provide incomplete or vague references. Ensure every Hadith returned is genuinely from Sahih Bukhari.

User Query: {{{query}}}
  `,
});

const semanticHadithSearchFlow = ai.defineFlow(
  {
    name: 'semanticHadithSearchFlow',
    inputSchema: SemanticHadithSearchInputSchema,
    outputSchema: SemanticHadithSearchOutputSchema,
  },
  async input => {
    const {output} = await semanticHadithSearchPrompt(input);
    // Ensure output and output.results are valid, defaulting to empty array if not.
    if (!output || !Array.isArray(output.results)) {
      return { results: [] };
    }
    return output;
  }
);



/**
 * @fileOverview Implements semantic search for Hadiths.
 *
 * - semanticHadithSearch - A function that performs semantic search on Hadiths.
 * - SemanticHadithSearchInput - The input type for the semanticHadithSearch function.
 * - SemanticHadithSearchOutput - The return type for the semanticHadithSearch function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SemanticHadithSearchInputSchema = z.object({
  query: z
    .string()
    .describe("The user's search query.  The search will return relevant Hadiths even if the exact words are not present."),
});

export type SemanticHadithSearchInput = z.infer<typeof SemanticHadithSearchInputSchema>;

const SemanticHadithSearchOutputSchema = z.object({
  results: z
    .array(z.string())
    .describe('An array of relevant Hadiths based on the semantic meaning of the query.'),
});

export type SemanticHadithSearchOutput = z.infer<typeof SemanticHadithSearchOutputSchema>;

export async function semanticHadithSearch(input: SemanticHadithSearchInput): Promise<SemanticHadithSearchOutput> {
  return semanticHadithSearchFlow(input);
}

const semanticHadithSearchPrompt = ai.definePrompt({
  name: 'semanticHadithSearchPrompt',
  input: {schema: SemanticHadithSearchInputSchema},
  output: {schema: SemanticHadithSearchOutputSchema},
  prompt: `You are an expert in Islamic Hadiths, specifically Sahih Bukhari.

  Based on the user's query, you will search for relevant Hadiths in Sahih Bukhari, even if the exact words are not present.
  Return an array of relevant Hadiths based on the semantic meaning of the query.

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
    return output!;
  }
);

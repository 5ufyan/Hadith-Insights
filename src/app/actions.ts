
'use server';

import { semanticHadithSearch, type SemanticHadithSearchInput, type SemanticHadithSearchOutput, type HadithObject } from '@/ai/flows/semantic-hadith-search';

interface SearchResult {
  results: HadithObject[];
  error?: string;
}

export async function searchHadithsAction(query: string): Promise<SearchResult> {
  if (!query || query.trim() === "") {
    return { results: [] };
  }
  try {
    const input: SemanticHadithSearchInput = { query: query.trim() };
    const response: SemanticHadithSearchOutput = await semanticHadithSearch(input);
    // Ensure results is always an array, even if AI returns null/undefined or incorrect structure
    const results = Array.isArray(response.results) ? response.results.filter(
      item => typeof item === 'object' && item !== null && 'hadithText' in item && 'source' in item && 'reference' in item
    ) : [];
    return { results };
  } catch (error) {
    console.error("Error searching Hadiths:", error);
    let errorMessage = "Failed to search Hadiths due to an unexpected error.";
    if (error instanceof Error) {
        errorMessage = `Failed to search Hadiths: ${error.message}`;
    }
    return { results: [], error: errorMessage };
  }
}

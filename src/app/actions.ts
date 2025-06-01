'use server';

import { semanticHadithSearch, type SemanticHadithSearchInput, type SemanticHadithSearchOutput } from '@/ai/flows/semantic-hadith-search';

interface SearchResult {
  results: string[];
  error?: string;
}

export async function searchHadithsAction(query: string): Promise<SearchResult> {
  if (!query || query.trim() === "") {
    return { results: [] };
  }
  try {
    const input: SemanticHadithSearchInput = { query: query.trim() };
    const response: SemanticHadithSearchOutput = await semanticHadithSearch(input);
    // Ensure results is always an array, even if AI returns null/undefined
    const results = Array.isArray(response.results) ? response.results : [];
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

import { Suspense } from 'react';
import Image from 'next/image';
import { searchHadithsAction } from './actions';
import { HadithSearchForm } from '@/components/hadith/hadith-search-form';
import { HadithCard } from '@/components/hadith/hadith-card';
import { HadithFilters } from '@/components/hadith/hadith-filters';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { LoadingSpinner } from '@/components/loading-spinner';

interface HomePageProps {
  searchParams?: {
    query?: string;
  };
}

async function SearchResults({ query }: { query: string }) {
  const { results, error } = await searchHadithsAction(query);

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Search Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground">No Hadiths found matching your query.</p>
        <p className="text-sm text-muted-foreground mt-2">Try a different search term or broaden your query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {results.map((hadith, index) => (
        <HadithCard 
          key={index} 
          hadithText={hadith} 
          className="animate-slide-up" 
          style={{ animationDelay: `${index * 100}ms` }} 
        />
      ))}
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-card p-6 rounded-lg shadow-md animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-5/6 mb-6"></div>
          <div className="h-8 bg-muted rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}


export default function HomePage({ searchParams }: HomePageProps) {
  const query = searchParams?.query || '';

  return (
    <div className="space-y-8">
      <section aria-labelledby="search-title">
        <h2 id="search-title" className="sr-only">Search Hadiths</h2>
        <HadithSearchForm initialQuery={query} />
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <HadithFilters />
        </aside>

        <main className="lg:col-span-3">
          {query ? (
            <>
              <h3 className="text-2xl font-headline font-semibold mb-6">
                Search Results for "{query}"
              </h3>
              <Suspense fallback={<SearchResultsSkeleton />}>
                <SearchResults query={query} />
              </Suspense>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 bg-card rounded-lg shadow-md">
              <Image src="https://placehold.co/300x200.png" alt="Stylized Islamic calligraphy or serene mosque" data-ai-hint="islamic calligraphy" className="mb-6 rounded-md" width={300} height={200} />
              <h3 className="text-2xl font-headline font-semibold mb-2">Welcome to Hadith Insights</h3>
              <p className="text-lg text-muted-foreground max-w-md">
                Unlock the wisdom of Sahih Bukhari. Enter a query above to begin your semantic search for relevant Hadiths.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

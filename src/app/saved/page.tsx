
'use client';

import { HadithCard } from '@/components/hadith/hadith-card';
import { useSavedHadiths, type SavedHadith } from '@/hooks/use-saved-hadiths';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookmarkX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from '@/components/loading-spinner';

export default function SavedHadithsPage() {
  const { savedHadiths, isLoaded } = useSavedHadiths();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner size={48} />
        <p className="ml-4 text-lg text-muted-foreground">Loading saved Hadiths...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-headline font-semibold">Your Saved Hadiths</h2>
        {savedHadiths.length > 0 && (
           <p className="text-muted-foreground text-sm sm:text-base">
             You have {savedHadiths.length} Hadith{savedHadiths.length === 1 ? '' : 's'} saved.
           </p>
        )}
      </div>

      {savedHadiths.length === 0 ? (
        <Alert className="max-w-2xl mx-auto shadow-md">
          <BookmarkX className="h-5 w-5" />
          <AlertTitle className="font-headline text-lg">No Saved Hadiths Yet</AlertTitle>
          <AlertDescription className="mt-2">
            You haven't saved any Hadiths. Start exploring and save your favorites for easy access.
            <Button variant="link" asChild className="px-1 text-base">
              <Link href="/">Search for Hadiths</Link>
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedHadiths.map((hadith: SavedHadith, index: number) => (
             <HadithCard 
              key={`${hadith.reference}-${index}`} 
              hadith={hadith}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { useSavedHadiths } from '@/hooks/use-saved-hadiths';
import { cn } from '@/lib/utils';

interface HadithCardProps {
  hadithText: string;
  className?: string;
}

export function HadithCard({ hadithText, className }: HadithCardProps) {
  const { saveHadith, unsaveHadith, isHadithSaved, isLoaded } = useSavedHadiths();
  const isSaved = isLoaded && isHadithSaved(hadithText);

  const handleToggleSave = () => {
    if (isSaved) {
      unsaveHadith(hadithText);
    } else {
      saveHadith(hadithText);
    }
  };

  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col", className)}>
      <CardContent className="p-6 flex-grow">
        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{hadithText}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleSave}
          disabled={!isLoaded}
          aria-label={isSaved ? 'Unsave Hadith' : 'Save Hadith'}
          className="text-primary hover:text-primary/80"
        >
          <Bookmark className={cn("mr-2 h-5 w-5 transition-colors", isSaved ? "fill-primary" : "fill-none")} />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      </CardFooter>
    </Card>
  );
}


'use client';

import type { HadithObject } from '@/ai/flows/semantic-hadith-search';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, BookOpen } from 'lucide-react';
import { useSavedHadiths } from '@/hooks/use-saved-hadiths';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface HadithCardProps {
  hadith: HadithObject;
  className?: string;
  style?: React.CSSProperties;
}

export function HadithCard({ hadith, className, style }: HadithCardProps) {
  const { saveHadith, unsaveHadith, isHadithSaved, isLoaded } = useSavedHadiths();
  const isSaved = isLoaded && isHadithSaved(hadith);

  const handleToggleSave = () => {
    if (isSaved) {
      unsaveHadith(hadith);
    } else {
      saveHadith(hadith);
    }
  };

  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col", className)} style={style}>
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-semibold text-primary flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            {hadith.source}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">{hadith.reference}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{hadith.hadithText}</p>
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

import Link from 'next/link';
import { BookOpenText, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <BookOpenText className="h-7 w-7" />
          <h1 className="text-2xl font-headline font-semibold">Tafheem-e-Sunnah</h1>
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/saved" className="flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              Saved Hadiths
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

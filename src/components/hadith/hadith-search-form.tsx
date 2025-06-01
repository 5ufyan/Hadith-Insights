'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface HadithSearchFormProps {
  initialQuery?: string;
  isSearching?: boolean;
}

export function HadithSearchForm({ initialQuery = '', isSearching = false }: HadithSearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialQuery || searchParams.get('query') || '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?query=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/'); // Clear search if term is empty
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-8 p-4 bg-card rounded-lg shadow-md">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Enter your query for semantic Hadith search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 text-base"
          aria-label="Search Hadiths"
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>
      <Button type="submit" disabled={isSearching} className="min-w-[100px]">
        {isSearching ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
        ) : (
          'Search'
        )}
      </Button>
    </form>
  );
}

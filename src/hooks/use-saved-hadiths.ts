
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { HadithObject } from '@/ai/flows/semantic-hadith-search';

const SAVED_HADITHS_KEY = 'hadithInsights_savedHadiths_v2'; // Changed key to avoid conflicts with old structure

export type SavedHadith = HadithObject;

export function useSavedHadiths() {
  const [savedHadiths, setSavedHadiths] = useState<SavedHadith[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const items = localStorage.getItem(SAVED_HADITHS_KEY);
        if (items) {
          const parsedItems = JSON.parse(items) as SavedHadith[];
          // Basic validation for the structure of saved items
          if (Array.isArray(parsedItems) && parsedItems.every(item => 
            typeof item === 'object' && item !== null &&
            'hadithText' in item && 'source' in item && 'reference' in item
          )) {
            setSavedHadiths(parsedItems);
          } else {
            // Clear invalid data
            localStorage.removeItem(SAVED_HADITHS_KEY);
            setSavedHadiths([]);
          }
        }
      } catch (error) {
        console.error("Error loading saved Hadiths from localStorage", error);
        setSavedHadiths([]);
         toast({
          title: "Error",
          description: "Could not load saved Hadiths.",
          variant: "destructive",
        });
      }
      setIsLoaded(true);
    }
  }, [toast]);

  const saveHadith = useCallback((hadith: SavedHadith) => {
    setSavedHadiths(prev => {
      if (prev.some(h => h.hadithText === hadith.hadithText && h.reference === hadith.reference)) return prev;
      const newSaved = [hadith, ...prev]; 
      try {
        localStorage.setItem(SAVED_HADITHS_KEY, JSON.stringify(newSaved));
        toast({
          title: "Hadith Saved",
          description: "The Hadith has been added to your collection.",
        });
      } catch (error) {
        console.error("Error saving Hadith to localStorage", error);
        toast({
          title: "Error",
          description: "Could not save the Hadith.",
          variant: "destructive",
        });
      }
      return newSaved;
    });
  }, [toast]);

  const unsaveHadith = useCallback((hadith: SavedHadith) => {
    setSavedHadiths(prev => {
      const newSaved = prev.filter(h => !(h.hadithText === hadith.hadithText && h.reference === hadith.reference));
      try {
        localStorage.setItem(SAVED_HADITHS_KEY, JSON.stringify(newSaved));
         toast({
          title: "Hadith Unsaved",
          description: "The Hadith has been removed from your collection.",
        });
      } catch (error) {
        console.error("Error unsaving Hadith from localStorage", error);
        toast({
          title: "Error",
          description: "Could not unsave the Hadith.",
          variant: "destructive",
        });
      }
      return newSaved;
    });
  }, [toast]);

  const isHadithSaved = useCallback((hadith: SavedHadith) => {
    return savedHadiths.some(h => h.hadithText === hadith.hadithText && h.reference === hadith.reference);
  }, [savedHadiths]);

  return { savedHadiths, saveHadith, unsaveHadith, isHadithSaved, isLoaded };
}

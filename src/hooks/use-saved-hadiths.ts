'use client';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

const SAVED_HADITHS_KEY = 'hadithInsights_savedHadiths';

export function useSavedHadiths() {
  const [savedHadiths, setSavedHadiths] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const items = localStorage.getItem(SAVED_HADITHS_KEY);
        if (items) {
          setSavedHadiths(JSON.parse(items));
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

  const saveHadith = useCallback((hadith: string) => {
    setSavedHadiths(prev => {
      if (prev.includes(hadith)) return prev;
      const newSaved = [hadith, ...prev]; // Add to the beginning
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

  const unsaveHadith = useCallback((hadith: string) => {
    setSavedHadiths(prev => {
      const newSaved = prev.filter(h => h !== hadith);
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

  const isHadithSaved = useCallback((hadith: string) => {
    return savedHadiths.includes(hadith);
  }, [savedHadiths]);

  return { savedHadiths, saveHadith, unsaveHadith, isHadithSaved, isLoaded };
}

'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';

// These are dummy options. In a real scenario, they would come from your data source.
const dummyNarrators = ["Abu Huraira", "Aisha bint Abi Bakr", "Abdullah ibn Umar", "Anas ibn Malik"];
const dummyTopics = ["Faith (Iman)", "Prayer (Salat)", "Fasting (Sawm)", "Charity (Zakat)", "Pilgrimage (Hajj)"];

export function HadithFilters() {
  // In a real application, you would manage filter state here,
  // e.g., using useState, and pass it to the parent or use a global state solution.
  // const [selectedNarrator, setSelectedNarrator] = useState<string | undefined>();
  // const [selectedTopic, setSelectedTopic] = useState<string | undefined>();

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-headline flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          Filter Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="narrator-filter" className="text-sm font-medium text-muted-foreground mb-2 block">
            Filter by Narrator
          </Label>
          <Select 
            // onValueChange={setSelectedNarrator} value={selectedNarrator}
          >
            <SelectTrigger id="narrator-filter" className="w-full">
              <SelectValue placeholder="Select a narrator" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Narrators</SelectLabel>
                {dummyNarrators.map(narrator => (
                  <SelectItem key={narrator} value={narrator}>
                    {narrator}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="topic-filter" className="text-sm font-medium text-muted-foreground mb-2 block">
            Filter by Topic
          </Label>
          <Select
            // onValueChange={setSelectedTopic} value={selectedTopic}
          >
            <SelectTrigger id="topic-filter" className="w-full">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Topics</SelectLabel>
                {dummyTopics.map(topic => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

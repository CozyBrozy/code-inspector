// src/hooks/useEntries.ts
import useSWR from 'swr';
import { listEntries } from '@/app/api/entries';
import type { FoodEntry } from '@/types/entry';

export function useEntries() {
  const { data, error, isLoading } = useSWR<FoodEntry[]>(
    ['entries', 0, 100],
    () => listEntries(0, 100)
  );
  return {
    entries: data,
    isLoading,
    isError: error,
  };
}

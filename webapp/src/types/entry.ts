// src/types/entry.ts
export interface FoodEntry {
  id: number;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export type FoodEntryCreate = Omit<FoodEntry, 'id'>;

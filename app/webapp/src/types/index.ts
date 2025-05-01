export interface Entry {
  id: number;
  meal_description: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  meal_time: string;
  created_at: string;
}

export interface EntryCreate {
  meal_description: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  meal_time: string;
} 
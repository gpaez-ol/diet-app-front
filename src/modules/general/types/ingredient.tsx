export interface Ingredient {
  id: string;
  name: string;
}

export interface MealIngredient {
  ingredientId: string;
  amount: number;
  name?: string;
  notes?: string;
}

export interface IngredientResponse {
  pagesNumber: number;
  pagination: [Ingredient];
}

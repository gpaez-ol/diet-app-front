export interface Ingredient {
  id: string;
  name: string;
}

export interface IngredientResponse {
  pagesNumber: number;
  pagination: [Ingredient];
}

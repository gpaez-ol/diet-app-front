import { MealIngredient } from "./ingredient";

export interface Meal {
  id?: string;
  name: string;
  kilocalories: number;
  preparation: string;
  ingredients: MealIngredient[];
  imageRef: string,
}

export interface MealResponse {
  pagesNumber: number;
  pagination: [Meal];
}

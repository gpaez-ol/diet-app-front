import { Ingredient, IngredientResponse } from "../types/ingredient";

import axios from "axios";
import { Meal, MealResponse } from "../types/meal";

export type Maybe<T> = T | null;

// INGREDIENTS

export const getIngredients = async (): Promise<Ingredient[]> => {
  const response = await axios.get(
    "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient?Page=1&PageSize=100"
  );
  const data = response.data as IngredientResponse;
  return data.pagination;
};

export const updateIngredient = async (
  id: string,
  newName: string
): Promise<string | null> => {
  try {
    await axios.put(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient/" +
        id,
      { name: newName }
    );
    return id;
  } catch (e) {
    return null;
  }
};

// MEALS

export const getMeals = async (): Promise<Meal[]> => {
  const response = await axios.get(
    "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/meal?Page=1&PageSize=100"
  );
  const data = response.data as MealResponse;
  return data.pagination;
};

export const updateMeal = async (
  id: string,
  newMeal: Partial<Meal>
): Promise<string | null> => {
  delete newMeal.id;
  try {
    await axios.put(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/meal/" + id,
      { ...newMeal }
    );
    return id;
  } catch (e) {
    return null;
  }
};

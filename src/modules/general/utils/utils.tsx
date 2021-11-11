import { Ingredient, IngredientResponse } from "../types/ingredient";

import axios from "axios";
import { Meal, MealResponse } from "../types/meal";

export type Maybe<T> = T | null;

// INGREDIENTS

export const getIngredient = async (
  ingredientId: string
): Promise<Ingredient> => {
  const response = await axios.get(
    "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient/" +
      ingredientId
  );
  return response.data;
};

export const getIngredients = async (): Promise<Ingredient[]> => {
  const response = await axios.get(
    "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient?Page=1&PageSize=100"
  );
  const data = response.data as IngredientResponse;
  return data.pagination;
};

export const updateIngredient = async (
  id: string,
  newIngredient: Partial<Ingredient>
): Promise<boolean> => {
  try {
    await axios.put(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient/" +
        id,
      { name: newIngredient.name }
    );
    return true;
  } catch (e) {
    return false;
  }
};

export const createIngredient = async (
  newIngredient: Partial<Ingredient>
): Promise<boolean> => {
  try {
    await axios.post(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient",
      { name: newIngredient.name }
    );
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteIngredient = async (
  ingredientId: string
): Promise<boolean> => {
  try {
    await axios.delete(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient/" +
        ingredientId
    );
    return true;
  } catch (e) {
    return false;
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
): Promise<boolean> => {
  delete newMeal.id;
  newMeal.mealIngredients?.filter((ing) => delete ing.name);
  try {
    await axios.put(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/meal/" + id,
      { ...newMeal }
    );
    return true;
  } catch (e) {
    return false;
  }
};

export const createMeal = async (newMeal: Partial<Meal>): Promise<boolean> => {
  delete newMeal.id;
  newMeal.mealIngredients?.filter((ing) => delete ing.name);
  try {
    await axios.post(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/meal",
      { ...newMeal }
    );
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteMeal = async (mealId: string): Promise<boolean> => {
  try {
    await axios.delete(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/meal/" +
        mealId
    );
    return true;
  } catch (e) {
    return false;
  }
};

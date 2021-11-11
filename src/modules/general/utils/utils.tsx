import { Ingredient, IngredientResponse } from "../types/ingredient";

import axios from "axios";
import { Meal, MealResponse } from "../types/meal";
import { Diet, DietResponse, Diet_all } from "../types/diet";
import {
  DietCategory,
  DietCategoryResponse,
} from "../../browse/types/DietCategory";

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

// DIETS

export const getDiets = async (): Promise<Diet_all[]> => {
  const response = await axios.get(
    "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/diet?Page=1&PageSize=100"
  );
  const data = response.data as DietResponse;
  return data.pagination;
};

export const getDiet = async (dietId: string): Promise<Diet> => {
  const response = await axios.get(
    "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/diet/" + dietId
  );
  return response.data;
};

export const updateDiet = async (
  id: string,
  newDiet: Partial<Diet>
): Promise<boolean> => {
  delete newDiet.id;
  delete newDiet.imageRef;
  const categoryIds = newDiet.categories?.map((cat) => cat.id);
  delete newDiet.categories;
  const dietMeals = newDiet.meals?.map((meal, index) => {
    return {
      id: meal.id,
      mealNumber: index,
    };
  });
  delete newDiet.meals;
  try {
    await axios.put(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/diet/" + id,
      { ...newDiet, categoryIds, dietMeals }
    );
    return true;
  } catch (e) {
    return false;
  }
};

export const createDiet = async (newDiet: Partial<Diet>): Promise<boolean> => {
  delete newDiet.id;
  delete newDiet.imageRef;
  const categoryIds = newDiet.categories?.map((cat) => cat.id);
  delete newDiet.categories;
  const dietMeals = newDiet.meals?.map((meal, index) => {
    return {
      id: meal.id,
      mealNumber: index,
    };
  });
  delete newDiet.meals;
  try {
    await axios.post(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/diet",
      { ...newDiet, categoryIds, dietMeals }
    );
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteDiet = async (dietId: string): Promise<boolean> => {
  try {
    await axios.delete(
      "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/diet/" +
        dietId
    );
    return true;
  } catch (e) {
    return false;
  }
};

// CATEGORIES

export const getCategories = async (): Promise<DietCategory[]> => {
  const response = await axios.get(
    "http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/category?Page=1&PageSize=100"
  );
  const data = response.data as DietCategoryResponse;
  return data.pagination;
};

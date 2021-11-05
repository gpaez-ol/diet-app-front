import { Ingredient, IngredientResponse } from "../types/ingredient";

import axios from "axios";

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

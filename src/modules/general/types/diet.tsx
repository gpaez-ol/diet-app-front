import { DietCategory } from "../../browse/types/DietCategory";
import { Meal } from "./meal";

export interface Diet {
  id: string;
  name: string;
  imageRef: string;
  description: string;
  categories: DietCategory[];
  meals: Meal[];
  type?: number;
}

export interface Diet_all {
  id: string;
  name: string;
  imageRef: string;
  categoryIds: string[];
}

export interface DietResponse {
  pagesNumber: number;
  pagination: Diet_all[];
}

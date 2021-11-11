import { DietCategory } from "../../types/DietCategory";

export default interface SerchBarProps {
  updateDietNameSearch(newDietNameSearch: string): void;
  updateDietCategoriesSearch(newDietCategoriesSearch: DietCategory[]): void;
}

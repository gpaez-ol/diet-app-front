export interface DietCategory {
  id: string;
  name: string;
  description: string;
}

export interface DietCategoryResponse {
  pagesNumber: number;
  pagination: DietCategory[];
}

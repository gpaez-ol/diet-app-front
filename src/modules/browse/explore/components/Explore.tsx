import { useState, useEffect } from "react";
import DietsList from "../../explore/components/DietsList";
import { DietCategory } from "../../types/DietCategory";
import { URLs } from "../../../general/utils/urls";

export default function Browse() {
  const [dietCategories, setDietCategories] = useState<DietCategory[]>([]);

  useEffect(() => {
    fetch(URLs.category + "?Page=1&PageSize=100")
      .then((response) => response.json())
      .then((data) => {
        setDietCategories(data.pagination);
      });
  }, []);

  return (
    <>
      <h2>...or Explore Diets by Category!</h2>
      {dietCategories.map((dietCategory) => {
        return (
          <div key={dietCategory.id}>
            <DietsList {...dietCategory} />
          </div>
        );
      })}
    </>
  );
}

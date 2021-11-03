import React from "react";
import DietsList from "../../explore/components/DietsList";
import DietCategory from "../../types/DietCategory";

export default function Browse() {
  let dietCategories: DietCategory[] = [
    { name: "Weight loss" },
    { name: "Muscle building" },
    { name: "Detox" },
  ];
  return (
    <>
    <h2>...or Explore Diets by Category!</h2>
      {dietCategories.map((dietCategory) => {
        return <DietsList {...dietCategory} />;
      })}
    </>
  );
}

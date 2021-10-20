import { Container } from "@mui/material";
import React from "react";
import DietPagination from "./DietPagination";
import DietsList from "./DietsList";
import DietCategory from "./interfaces/DietCategory";

export default function Browse() {
  let dietCategories: DietCategory[] = [
    { name: "Weight loss" },
    { name: "Muscle building" },
    { name: "Detox" },
  ];

  return (
    <Container maxWidth="xl">
      <h1>Browse Diets</h1>
      {dietCategories.map((dietCategory) => {
        return <DietsList {...dietCategory} />;
      })}
      <DietPagination />
    </Container>
  );
}

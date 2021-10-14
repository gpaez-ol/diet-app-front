import { Container } from "@mui/material";
import React from "react";
import DietPagination from "./DietPagination";
import DietsList from "./DietsList";
import { DietsListProps } from "./Types";

export default function Browse() {
  let dietCategories: DietsListProps[] = [
    { categoryName: "Weight loss" },
    { categoryName: "Muscle building" },
    { categoryName: "Detox" },
  ];

  return (
    <Container maxWidth="lg">
      <h1>Browse Diets</h1>
      {dietCategories.map((dietCategory) => {
        return <DietsList {...dietCategory} />;
      })}
      <DietPagination />
    </Container>
  );
}

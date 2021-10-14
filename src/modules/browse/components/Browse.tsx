import { Container } from "@mui/material";
import React from "react";
import DietPagination from "./DietPagination";
import DietsList from "./DietsList";

export default function Browse() {
  return (
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <h1>Browse Diets</h1>
      <DietsList />
      <DietPagination />
    </Container>
  );
}

import { Container } from "@mui/material";
import React from "react";
import DietPagination from "./DietPagination";

export default function Browse() {
  return (
    <Container maxWidth="lg">
      <h1>You're in Browse</h1>
      <DietPagination />
    </Container>
  );
}

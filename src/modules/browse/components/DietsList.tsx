import { Container } from "@mui/material";
import React from "react";
import DietCard from "./DietCard";

export default function DietsList() {
  let diets: string[] = ["1dieta", "2dieta"];
  return (
    <Container>
      <h2>Some category</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {diets.map((diet) => {
        return <DietCard />;
      })}
      </div>
    </Container>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DietCard from "../../../general/components/DietCard";
import Diet from "../../../general/interfaces/Diet";
import SearchResultProps from "../interfaces/SearchResultProps";

export default function SearchResults(props: SearchResultProps) {
  const diets: Diet[] = [
    {
      name: "diet1",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet2",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet3",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet4",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet5",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet6",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet7",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet8",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet9",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet10",
      description: "Some nice description for a diet. blah blah banana banana",
    },
  ];

  return (
    <>
      <p>
        You are searching for: {props.dietNameSearch} and categories:{" "}
        {props.dietCategoriesSearch.length}
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            {diets.map((diet) => {
              return (
                <Grid item xs={12} sm={4} md={3}>
                  <DietCard {...diet} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DietCard from "../../../general/components/DietCard";
import Diet from "../../../general/interfaces/Diet";
import DietInfoCard from "../../components/DietInfoCard";
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDiet, setActiveDiet] = useState<Diet>({} as Diet);

  const handleDialogOpen = (diet: Diet) => {
    setIsDialogOpen(true);
    setActiveDiet(diet);
  };

  const [searchResults, setSearchResults] = useState<Diet[]>([]);

  useEffect(() => {
    let result = diets.filter((diet) =>
      diet.name.includes(props.dietNameSearch)
    );
    setSearchResults(result);
  }, [props.dietNameSearch, props.dietCategoriesSearch]);

  return (
    <>
      <p>
        You are searching for: {props.dietNameSearch} and categories:{" "}
        {props.dietCategoriesSearch.length}
      </p>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <DietInfoCard {...activeDiet} />
      </Dialog>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            {searchResults.map((diet) => {
              return (
                <Grid item xs={12} sm={4} md={3}>
                  <div onClick={() => handleDialogOpen(diet)}>
                    <DietCard {...diet} />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </>
  );
}

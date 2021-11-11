import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { Diet } from "../../general/types/diet";
import { URLs } from "../../general/utils/urls";
import MealCard from "./MealCard";
import MealInfoCard from "./MealInfoCard";

export default function DietPage() {
  const dietId = useLocation().pathname.split("/")[2];

  const [diet, setDiet] = useState<Diet>();

  useEffect(() => {
    fetch(URLs.diet + `/${dietId}`)
      .then((response) => response.json())
      .then((data) => {
        data.id = dietId;
        setDiet(data);
      });
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeMealId, setActiveMealId] = useState<string>("");

  const handleDialogOpen = (mealId: string) => {
    setIsDialogOpen(true);
    setActiveMealId(mealId);
  };

  return (
    <>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <MealInfoCard {...{ mealId: activeMealId }} />
      </Dialog>
      <Container maxWidth="xl">
        <CardMedia component="img" height="194" image={diet?.imageRef} />
        <Typography variant="h2" component="div">
          {diet?.name}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1}>
            {diet?.categories.map((category) => {
              return (
                <Tooltip key={category.id} title={category.description} arrow>
                  <Chip label={category.name} variant="outlined" />
                </Tooltip>
              );
            })}
          </Stack>
        </Box>

        <Typography variant="body1" gutterBottom>
          {diet?.description}
        </Typography>
        <Typography variant="h4" gutterBottom component="div">
          Diet meals
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              {diet?.meals.map((meal, index) => {
                return (
                  <Grid key={index} item xs={12} sm={4} md={3}>
                    <div onClick={() => handleDialogOpen(meal.id!)}>
                      <MealCard {...meal} />
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      </Container>
    </>
  );
}

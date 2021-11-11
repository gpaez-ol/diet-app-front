import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Diet from "../../general/interfaces/Diet";
import MealsList from "./MealsList";
import { Routes } from "../../general/utils/routes";

export default function DietInfoCard(diet: Diet) {
  return (
    <Card style={{ overflow: "auto" }}>
      <CardMedia component="img" height="140" image={diet.imageRef} />
      <CardContent>
        <Stack spacing={2} direction="row">
          <Button size="small" href={Routes.diets + `/${diet.id}`}>
            View more
          </Button>

          <Button size="small" color="secondary">
            Add to "My Diet"
          </Button>
        </Stack>

        <Typography gutterBottom variant="h4" component="div">
          {diet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {diet.description}
        </Typography>
        <Box sx={{ mb: 1 }}>
        <Typography variant="h6" component="div">
          Diet categories
        </Typography>
        <Stack direction="row" spacing={1}>
          {diet.categories.map((category) => {
            return (
              <Tooltip key={category.id} title={category.description} arrow>
                  <Chip label={category.name} variant="outlined" />
                </Tooltip>
            );
          })}
        </Stack>
        </Box>
        <Typography variant="h6" component="div">
          Meals in this diet
        </Typography>
        <MealsList {...diet} />
      </CardContent>
    </Card>
  );
}

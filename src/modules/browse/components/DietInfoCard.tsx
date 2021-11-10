import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Diet from "../../general/interfaces/Diet";
import MealsList from "./MealsList";

export default function DietInfoCard(diet: Diet) {
  return (
    <Card style={{ overflow: "auto" }}>
      <CardMedia component="img" height="140" image={diet.imageRef} />
      <CardContent>
        <Stack spacing={2} direction="row">
          <Button size="small">View more</Button>
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
        <Typography variant="h6" component="div">
          Diet categories
        </Typography>
        <Stack direction="row" spacing={1}>
          {diet.categories.map((category) => {
            return <Chip label={category} variant="outlined" />;
          })}
        </Stack>
        <Typography variant="h6" component="div">
          Meals in this diet
        </Typography>
        <MealsList {...diet} />
      </CardContent>
    </Card>
  );
}

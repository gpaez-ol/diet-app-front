import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Meal } from "../../general/types/meal";

export default function MealCard(meal: Meal) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{ margin: "10px" }}>
      <CardHeader title={meal.name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {meal.kilocalories} kilocalories
        </Typography>
      </CardContent>
      <CardActions>
        <Button> See more </Button>
      </CardActions>
    </Card>
  );
}

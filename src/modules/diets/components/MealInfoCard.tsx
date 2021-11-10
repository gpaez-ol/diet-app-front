import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Meal } from "../../general/types/meal";
import { URLs } from "../../general/utils/urls";

export default function MealInfoCard(props: { mealId: string }) {
  const [meal, setMeal] = useState<Meal>();

  useEffect(() => {
    fetch(URLs.meal + `/${props.mealId}`)
      .then((response) => response.json())
      .then((data) => {
        data.id = props.mealId;
        data.ingredients = data.mealIngredients;
        setMeal(data);
      });
  }, []);

  return (
    <Card style={{ overflow: "auto" }}>
      <CardMedia component="img" height="140" image={meal?.imageRef} />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {meal?.name}
        </Typography>
        <Typography variant="h6" component="div">
          Preparation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {meal?.preparation}
        </Typography>
        <Typography variant="h6" component="div">
          Ingredients
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {meal?.ingredients.map((ingredient, index) => {
            const primaryText = `${ingredient.amount} x ${ingredient.name}`;
            return (
              <ListItem key={ingredient.ingredientId}>
                <ListItemAvatar>
                  <Avatar>{index + 1}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={primaryText}
                  secondary={ingredient.notes}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { getMeals, Maybe } from "../../../general/utils/utils";
import AddIcon from "@mui/icons-material/Add";
import { Meal } from "../../../general/types/meal";

interface MealSelectorProps {
  onSelectMeal: (meal: Meal) => void;
}

export const MealSelector = (props: MealSelectorProps) => {
  const [meals, setMeals] = React.useState<Maybe<Meal[]>>(null);

  const loadMeals = async () => {
    const meals = await getMeals();
    setMeals(meals);
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const handleSelectMeal = (meal: Meal) => {
    props.onSelectMeal(meal);
  };

  return (
    <>
      <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
        <Typography variant="h5" sx={{ marginBottom: "16px" }}>
          Meals
        </Typography>
        <List>
          {meals &&
            meals.map((meal, index) => {
              return (
                <ListItem
                  key={`meal-${index}-id`}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleSelectMeal(meal)}
                    >
                      <AddIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={meal.name} />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </>
  );
};

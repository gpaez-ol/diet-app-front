import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {Diet} from "../types/diet";

export default function MealsList(diet: Diet) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {diet.meals.map((meal, index) => {
        const caloriesMsg = meal.kilocalories + " kilocalories";
        return (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{index + 1}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={meal.name} secondary={caloriesMsg} />
          </ListItem>
        );
      })}
    </List>
  );
}

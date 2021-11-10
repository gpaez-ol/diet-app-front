import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Ingredient, MealIngredient } from "../../../general/types/ingredient";
import { getIngredients, Maybe } from "../../../general/utils/utils";
import AddIcon from "@mui/icons-material/Add";

interface IngredientSelectorProps {
  onSelectIngredient: (ingredient: MealIngredient) => void;
}

const addIngredientModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const IngredientSelector = (props: IngredientSelectorProps) => {
  const [ingredients, setIngredients] =
    React.useState<Maybe<Ingredient[]>>(null);
  const [addingIngredient, setAddingIngredient] =
    React.useState<Maybe<MealIngredient>>(null);

  const loadIngredients = async () => {
    const ingredients = await getIngredients();
    setIngredients(ingredients);
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  const handleSelectIngredient = (ingredient: Ingredient) => {
    const formattedIngredient: MealIngredient = {
      ingredientId: ingredient.id,
      name: ingredient.name,
      amount: 0,
      notes: "",
    };
    setAddingIngredient(formattedIngredient);
    // props.onSelectIngredient(ingredient);
  };

  return (
    <>
      <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
        <Typography variant="h5" sx={{ marginBottom: "16px" }}>
          Ingredients
        </Typography>
        <List>
          {ingredients &&
            ingredients.map((ingredient, index) => {
              return (
                <ListItem
                  key={`ingredient-${index}-id`}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleSelectIngredient(ingredient)}
                    >
                      <AddIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={ingredient.name} />
                </ListItem>
              );
            })}
        </List>
      </Box>
      <Modal
        open={Boolean(addingIngredient)}
        onClose={() => {
          setAddingIngredient(null);
        }}
        aria-labelledby="add-ingredient-modal"
      >
        <>
          {addingIngredient && (
            <Box sx={addIngredientModalStyle}>
              <Typography variant="h5" style={{ marginBottom: 16 }}>
                {addingIngredient.name}
              </Typography>
              <Box>
                <TextField
                  type="number"
                  label="Quantity"
                  required
                  sx={{
                    width: "100%",
                    margin: "8px 0px 8px 0px",
                    boxSizing: "border-box",
                  }}
                  onChange={(event) => {
                    setAddingIngredient({
                      ...addingIngredient,
                      amount: Number(event.target.value),
                    });
                  }}
                />
                <TextField
                  type="text"
                  label="Notes"
                  sx={{
                    width: "100%",
                    margin: "8px 0px 8px 0px",
                    boxSizing: "border-box",
                  }}
                  onChange={(event) => {
                    setAddingIngredient({
                      ...addingIngredient,
                      notes: event.target.value,
                    });
                  }}
                />
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-end",
                  display: "flex",
                  marginTop: "16px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ alignSelf: "flex-end" }}
                  onClick={() => {
                    props.onSelectIngredient(addingIngredient);
                  }}
                  disabled={!addingIngredient.amount}
                >
                  Add
                </Button>
              </Box>
            </Box>
          )}
        </>
      </Modal>
    </>
  );
};

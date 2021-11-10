import React, { useEffect } from "react";
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
import { Ingredient } from "../../../general/types/ingredient";
import { getIngredients, updateIngredient } from "../../../general/utils/utils";
import EditIcon from "@mui/icons-material/Edit";

const editIngredientModalStyle = {
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

export default function Ingredients() {
  const [ingredients, setIngredients] = React.useState<
    Ingredient[] | undefined
  >(undefined);
  const [editIngredient, setEditIngredient] = React.useState<Ingredient | null>(
    null
  );
  const [ingredientNewName, setIngredientNewName] = React.useState<
    string | null
  >(null);

  const loadIngredients = async () => {
    const ingredients = await getIngredients();
    setIngredients(ingredients);
  };

  useEffect(() => {
    loadIngredients();
  });

  const handleIngredientSave = async () => {
    if (!editIngredient || !ingredientNewName) {
      return;
    }
    const ingredientId = await updateIngredient(
      editIngredient.id,
      ingredientNewName
    );

    if (ingredientId) {
      setEditIngredient(null);
      setIngredientNewName(null);
    } else {
      alert("Couldn't save ingredient. Please try again later.");
    }
  };

  return (
    <>
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
                    onClick={() => setEditIngredient(ingredient)}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={ingredient.name} />
              </ListItem>
            );
          })}
      </List>
      <Modal
        open={Boolean(editIngredient)}
        onClose={() => setEditIngredient(null)}
        aria-labelledby="edit-ingredient-modal"
      >
        <Box sx={editIngredientModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editIngredient?.name}
          </Typography>
          <Typography id="modal-modal-subtitle" variant="subtitle2">
            {editIngredient?.id}
          </Typography>
          <TextField
            id="edit-ingredient-name-input"
            label="New name"
            variant="outlined"
            required
            type="text"
            sx={{
              width: "100%",
              margin: "16px 0px 16px 0px",
              boxSizing: "border-box",
            }}
            value={ingredientNewName}
            onChange={(event) => setIngredientNewName(event.target.value)}
          />
          <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
            <Button
              variant="contained"
              sx={{ alignSelf: "flex-end" }}
              onClick={handleIngredientSave}
              disabled={!ingredientNewName}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

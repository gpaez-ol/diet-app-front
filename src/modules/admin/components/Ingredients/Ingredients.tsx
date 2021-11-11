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
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
  Maybe,
  updateIngredient,
} from "../../../general/utils/utils";
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
  const [newIngredient, setNewIngredient] =
    React.useState<Maybe<Partial<Ingredient>>>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const loadIngredients = async () => {
    const ingredients = await getIngredients();
    setIngredients(ingredients);
  };

  const isIngredientComplete = (ingredient: Partial<Ingredient>) => {
    return ingredient.name;
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  const handleDeleteIngredient = async () => {
    if (!newIngredient || !newIngredient.id) {
      return;
    }

    const success = await deleteIngredient(newIngredient.id);

    if (success) {
      setIsEditing(false);
      setNewIngredient(null);
      window.location.reload();
    } else {
      alert("Couldn't delete ingredient. Please try again later.");
    }
  };

  const handleIngredientSave = async () => {
    if (!newIngredient || !isIngredientComplete(newIngredient)) {
      return;
    }

    if (isEditing) {
      if (!newIngredient.id) {
        return;
      }

      const success = await updateIngredient(newIngredient.id, newIngredient);

      if (success) {
        setIsEditing(false);
        setNewIngredient(null);
        window.location.reload();
      } else {
        alert("Couldn't save ingredient. Please try again later.");
      }
    } else {
      const success = await createIngredient(newIngredient);

      if (success) {
        setNewIngredient(null);
        window.location.reload();
      } else {
        alert("Couldn't save ingredient. Please try again later.");
      }
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() =>
            setNewIngredient({
              name: "",
            })
          }
        >
          New ingredient
        </Button>
      </Box>
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
                    onClick={() => {
                      setIsEditing(true);
                      setNewIngredient(ingredient);
                    }}
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
        open={Boolean(newIngredient)}
        onClose={() => {
          setIsEditing(false);
          setNewIngredient(null);
        }}
        aria-labelledby="edit-ingredient-modal"
      >
        <Box sx={editIngredientModalStyle}>
          <div style={{ marginBottom: 16 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {newIngredient?.name}
            </Typography>
            <Typography id="modal-modal-subtitle" variant="subtitle2">
              {newIngredient?.id}
            </Typography>
          </div>
          <TextField
            id="edit-ingredient-name-input"
            label="Name"
            variant="outlined"
            required
            type="text"
            sx={{
              width: "100%",
              margin: "16px 0px 16px 0px",
              boxSizing: "border-box",
            }}
            value={newIngredient?.name}
            onChange={(event) =>
              setNewIngredient({
                ...newIngredient,
                name: event.target.value,
              })
            }
          />
          <Box
            sx={{
              justifyContent: "flex-end",
              display: "flex",
              marginTop: "16px",
            }}
          >
            {isEditing && (
              <Button
                variant="contained"
                color="error"
                sx={{ marginRight: "8px" }}
                onClick={handleDeleteIngredient}
              >
                Delete
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleIngredientSave}
              disabled={!newIngredient?.name}
            >
              {isEditing ? "Save" : "Create"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

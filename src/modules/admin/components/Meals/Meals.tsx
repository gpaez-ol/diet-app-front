import React, { useEffect } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Meal } from "../../../general/types/meal";
import {
  createMeal,
  deleteMeal,
  getIngredient,
  getMeals,
  Maybe,
  updateMeal,
} from "../../../general/utils/utils";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IngredientSelector } from "./IngredientSelector";
import { MealIngredient } from "../../../general/types/ingredient";

const editMealModalStyle = {
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

export default function Meals() {
  const [meals, setMeals] = React.useState<Maybe<Meal[]>>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [newMeal, setNewMeal] = React.useState<Maybe<Partial<Meal>>>(null);
  const [isAddingIngredient, setIsAddingIngredient] = React.useState(false);
  const [currentMealIngredients, setCurrentMealIngredients] =
    React.useState<Maybe<MealIngredient[]>>(null);
  const [isFetching, setIsFetching] = React.useState(false);

  const loadMeals = async () => {
    const meals = await getMeals();
    setMeals(meals);
  };

  const fetchIngredientsNames = async () => {
    if (newMeal && currentMealIngredients) {
      setIsFetching(true);
      Promise.all(
        currentMealIngredients.map(async (currentIngredient) => {
          let ingredient = await getIngredient(currentIngredient.ingredientId);
          return {
            ...currentIngredient,
            name: ingredient.name,
          };
        })
      ).then((newIngredients) => {
        if (newIngredients) {
          setCurrentMealIngredients(newIngredients);
          setIsFetching(false);
        }
      });
    }
  };

  useEffect(() => {
    !isFetching && fetchIngredientsNames();
  }, [currentMealIngredients]);

  useEffect(() => {
    loadMeals();
  }, []);

  const isMealComplete = (meal: Partial<Meal>) => {
    return (
      meal.name &&
      meal.kilocalories &&
      meal.preparation &&
      meal.mealIngredients &&
      meal.mealIngredients.length > 0
    );
  };

  const handleDeleteMeal = async () => {
    if (!newMeal || !newMeal.id) {
      return;
    }

    const success = await deleteMeal(newMeal.id);

    if (success) {
      setIsEditing(false);
      setNewMeal(null);
      window.location.reload();
    } else {
      alert("Couldn't delete meal. Please try again later.");
    }
  };

  const handleMealSave = async () => {
    if (!newMeal || !isMealComplete(newMeal)) {
      alert("Please fill out all of the required fields.");
      return;
    }

    if (isEditing) {
      if (!newMeal.id) {
        return;
      }

      const success = await updateMeal(newMeal.id, newMeal);

      if (success) {
        setIsEditing(false);
        setNewMeal(null);
        window.location.reload();
      } else {
        alert("Couldn't save meal. Please try again later.");
      }
    } else {
      const success = await createMeal(newMeal);
      if (success) {
        setNewMeal(null);
        window.location.reload();
      } else {
        alert("Couldn't create meal. Please try again later.");
      }
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentMealIngredients(null);
            setNewMeal({
              name: "",
            });
          }}
        >
          New meal
        </Button>
      </Box>
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
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentMealIngredients(meal.mealIngredients);
                      setNewMeal(meal);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={meal.name}
                  secondary={meal.kilocalories + " kcal"}
                />
              </ListItem>
            );
          })}
      </List>
      <Modal
        open={Boolean(newMeal)}
        onClose={() => {
          setIsEditing(false);
          setNewMeal(null);
          setCurrentMealIngredients(null);
        }}
        aria-labelledby="meal-modal"
      >
        <Box
          sx={editMealModalStyle}
          style={{ maxHeight: 600, overflowY: "auto" }}
        >
          <div style={{ marginBottom: 16 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {newMeal?.name}
            </Typography>
            <Typography id="modal-modal-subtitle" variant="subtitle2">
              {newMeal?.id}
            </Typography>
          </div>
          <TextField
            id="meal-name-input"
            label="Name"
            variant="outlined"
            required
            type="text"
            sx={{
              width: "100%",
              margin: "8px 0px 8px 0px",
              boxSizing: "border-box",
            }}
            value={newMeal?.name}
            onChange={(event) =>
              setNewMeal({
                ...newMeal,
                name: event.target.value,
              })
            }
          />
          <TextField
            id="meal-kcals-input"
            label="Kilocalories"
            variant="outlined"
            required
            type="number"
            sx={{
              width: "100%",
              margin: "8px 0px 8px 0px",
              boxSizing: "border-box",
            }}
            value={newMeal?.kilocalories}
            onChange={(event) =>
              setNewMeal({
                ...newMeal,
                kilocalories: Number(event.target.value),
              })
            }
          />
          <TextField
            id="meal-preparation-input"
            label="Preparation"
            variant="outlined"
            required
            type="text"
            sx={{
              width: "100%",
              margin: "8px 0px 8px 0px",
              boxSizing: "border-box",
            }}
            value={newMeal?.preparation}
            onChange={(event) =>
              setNewMeal({
                ...newMeal,
                preparation: event.target.value,
              })
            }
          />
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Ingredients</Typography>
              <IconButton onClick={() => setIsAddingIngredient(true)}>
                <AddIcon />
              </IconButton>
            </Box>
            <List dense>
              {newMeal &&
                currentMealIngredients &&
                currentMealIngredients.map((ing, index) => {
                  return (
                    <ListItem
                      key={`ing-${index}-id`}
                      dense
                      secondaryAction={
                        <ListItemButton
                          onClick={() => {
                            let filteredItems = currentMealIngredients!.filter(
                              (currentIng) =>
                                ing.ingredientId !== currentIng.ingredientId
                            );
                            setCurrentMealIngredients(filteredItems);
                            setNewMeal({
                              ...newMeal,
                              mealIngredients: filteredItems!,
                            });
                          }}
                        >
                          <DeleteIcon />
                        </ListItemButton>
                      }
                    >
                      <ListItemText
                        primary={ing.name}
                        secondary={
                          ing.amount + (ing.notes ? " · " + ing.notes : "")
                        }
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Box>
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
                onClick={handleDeleteMeal}
              >
                Delete
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ alignSelf: "flex-end" }}
              onClick={handleMealSave}
              disabled={!newMeal?.name}
            >
              {isEditing ? "Save" : "Create"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={isAddingIngredient}
        onClose={() => {
          setIsAddingIngredient(false);
        }}
        aria-labelledby="add-ingredient-modal"
      >
        <Box sx={editMealModalStyle}>
          <IngredientSelector
            onSelectIngredient={(ingredient) => {
              let currentIngredients = currentMealIngredients;
              if (currentIngredients) {
                currentIngredients.push(ingredient);
              } else {
                currentIngredients = [ingredient];
              }
              setCurrentMealIngredients(currentIngredients);
              setNewMeal({
                ...newMeal,
                mealIngredients: currentIngredients!,
              });
              setIsAddingIngredient(false);
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

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
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect } from "react";
import { Diet, Diet_all } from "../../../general/types/diet";
import {
  createDiet,
  deleteDiet,
  getDiet,
  getDiets,
  Maybe,
  updateDiet,
} from "../../../general/utils/utils";
import { CategorySelector } from "./CategoySelector";
import { MealSelector } from "./MealSelector";

const editDietModalStyle = {
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

export default function Diets() {
  const [diets, setDiets] = React.useState<Maybe<Diet_all[]>>(null);
  const [newDiet, setNewDiet] = React.useState<Maybe<Partial<Diet>>>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isAddingCategory, setIsAddingCategory] = React.useState(false);
  const [isAddingMeal, setIsAddingMeal] = React.useState(false);

  const loadDiets = async () => {
    const diets = await getDiets();
    setDiets(diets);
  };

  useEffect(() => {
    loadDiets();
  }, []);

  const fetchDiet = async (id: string) => {
    const diet = await getDiet(id);
    if (diet) {
      setNewDiet({ ...diet, id });
    }
  };

  const isDietComplete = (diet: Partial<Diet>) => {
    return (
      diet.name &&
      diet.description &&
      diet.imageRef &&
      diet.categories &&
      diet.categories.length > 0 &&
      diet.meals &&
      diet.meals.length > 0
    );
  };

  const handleDeleteDiet = async () => {
    if (!newDiet || !newDiet.id) {
      return;
    }
    const success = await deleteDiet(newDiet.id);
    if (success) {
      setIsEditing(false);
      setNewDiet(null);
      window.location.reload();
    } else {
      alert("Couldn't delete diet. Please try again later.");
    }
  };

  const handleDietSave = async () => {
    if (!newDiet || !isDietComplete(newDiet)) {
      alert("Please fill out all of the required fields.");
      return;
    }

    if (isEditing) {
      if (!newDiet.id) {
        return;
      }

      const success = await updateDiet(newDiet.id, newDiet);

      if (success) {
        setIsEditing(false);
        setNewDiet(null);
        window.location.reload();
      } else {
        alert("Couldn't save diet. Please try again later.");
      }
    } else {
      const success = await createDiet(newDiet);
      if (success) {
        setNewDiet(null);
        window.location.reload();
      } else {
        alert("Couldn't create diet. Please try again later.");
      }
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => {
            setNewDiet({
              name: "",
              imageRef: "missing",
            });
          }}
        >
          New diet
        </Button>
      </Box>
      <List>
        {diets &&
          diets.map((diet, index) => {
            return (
              <ListItem
                key={`diet-${index}-id`}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      setIsEditing(true);
                      fetchDiet(diet.id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={diet.name} />
              </ListItem>
            );
          })}
      </List>
      <Modal
        open={Boolean(newDiet)}
        onClose={() => {
          setIsEditing(false);
          setNewDiet(null);
        }}
        aria-labelledby="diet-modal"
      >
        <Box
          sx={editDietModalStyle}
          style={{ maxHeight: 600, overflowY: "auto" }}
        >
          <div style={{ marginBottom: 16 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {newDiet?.name}
            </Typography>
            <Typography id="modal-modal-subtitle" variant="subtitle2">
              {newDiet?.id}
            </Typography>
          </div>
          <TextField
            id="diet-name-input"
            label="Name"
            variant="outlined"
            required
            type="text"
            sx={{
              width: "100%",
              margin: "8px 0px 8px 0px",
              boxSizing: "border-box",
            }}
            value={newDiet?.name}
            onChange={(event) =>
              setNewDiet({
                ...newDiet,
                name: event.target.value,
              })
            }
          />
          <TextField
            id="diet-description-input"
            label="Description"
            variant="outlined"
            required
            type="text"
            sx={{
              width: "100%",
              margin: "8px 0px 8px 0px",
              boxSizing: "border-box",
            }}
            value={newDiet?.description}
            onChange={(event) =>
              setNewDiet({
                ...newDiet,
                description: event.target.value,
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
              <Typography>Categories</Typography>
              <IconButton onClick={() => setIsAddingCategory(true)}>
                <AddIcon />
              </IconButton>
            </Box>
            <List dense>
              {newDiet &&
                newDiet.categories &&
                newDiet.categories.map((category, index) => {
                  return (
                    <ListItem
                      key={`category-${index}-id`}
                      dense
                      secondaryAction={
                        <ListItemButton
                          onClick={() => {
                            let filteredItems = newDiet.categories!.filter(
                              (currentCategory) =>
                                category.id !== currentCategory.id
                            );
                            setNewDiet({
                              ...newDiet,
                              categories: filteredItems!,
                            });
                          }}
                        >
                          <DeleteIcon />
                        </ListItemButton>
                      }
                    >
                      <ListItemText primary={category.name} />
                    </ListItem>
                  );
                })}
            </List>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Meals</Typography>
              <IconButton onClick={() => setIsAddingMeal(true)}>
                <AddIcon />
              </IconButton>
            </Box>
            <List dense>
              {newDiet &&
                newDiet.meals &&
                newDiet.meals.map((meal, index) => {
                  return (
                    <ListItem
                      key={`meal-${index}-id`}
                      dense
                      secondaryAction={
                        <ListItemButton
                          onClick={() => {
                            const formattedMeals = newDiet.meals?.filter(
                              (meal, currentIndex) => index !== currentIndex
                            );
                            setNewDiet({ ...newDiet, meals: formattedMeals });
                          }}
                        >
                          <DeleteIcon />
                        </ListItemButton>
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
                onClick={handleDeleteDiet}
              >
                Delete
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ alignSelf: "flex-end" }}
              onClick={handleDietSave}
              disabled={!newDiet?.name}
            >
              {isEditing ? "Save" : "Create"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={isAddingCategory}
        onClose={() => {
          setIsAddingCategory(false);
        }}
        aria-labelledby="add-category-modal"
      >
        <Box sx={editDietModalStyle}>
          <CategorySelector
            onSelectCategory={(category) => {
              let currentCategories = newDiet?.categories;
              if (currentCategories) {
                currentCategories.push(category);
              } else {
                currentCategories = [category];
              }
              setNewDiet({
                ...newDiet,
                categories: currentCategories!,
              });
              setIsAddingCategory(false);
            }}
          />
        </Box>
      </Modal>
      <Modal
        open={isAddingMeal}
        onClose={() => {
          setIsAddingMeal(false);
        }}
        aria-labelledby="add-meal-modal"
      >
        <Box sx={editDietModalStyle}>
          <MealSelector
            onSelectMeal={(meal) => {
              let currentMeals = newDiet?.meals;
              if (currentMeals) {
                currentMeals.push(meal);
              } else {
                currentMeals = [meal];
              }
              setNewDiet({
                ...newDiet,
                meals: currentMeals!,
              });
              setIsAddingMeal(false);
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

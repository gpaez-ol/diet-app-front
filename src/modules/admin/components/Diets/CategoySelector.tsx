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
import { getCategories, Maybe } from "../../../general/utils/utils";
import AddIcon from "@mui/icons-material/Add";
import { DietCategory } from "../../../browse/types/DietCategory";

interface CategorySelectorProps {
  onSelectCategory: (category: DietCategory) => void;
}

export const CategorySelector = (props: CategorySelectorProps) => {
  const [categories, setCategories] =
    React.useState<Maybe<DietCategory[]>>(null);

  const loadCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSelectCategory = (category: DietCategory) => {
    props.onSelectCategory(category);
  };

  return (
    <>
      <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
        <Typography variant="h5" sx={{ marginBottom: "16px" }}>
          Categories
        </Typography>
        <List>
          {categories &&
            categories.map((category, index) => {
              return (
                <ListItem
                  key={`category-${index}-id`}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleSelectCategory(category)}
                    >
                      <AddIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </>
  );
};

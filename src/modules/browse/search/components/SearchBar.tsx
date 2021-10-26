import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Grid from "@mui/material/Grid";
import SearchBarProps from "../interfaces/SearchBarProps";
import DietCategory from "../../types/DietCategory";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SearchBar(props: SearchBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <TextField
            fullWidth
            label="Diet name"
            color="primary"
            onChange={(event) => {
              props.updateDietNameSearch(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Autocomplete
            multiple
            id="checkboxes-categories-serach"
            options={dietCategories}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                placeholder="Weight loss, Detox, etc."
              />
            )}
            onChange={(event, value) => props.updateDietCategoriesSearch(value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

let dietCategories: DietCategory[] = [
  { name: "Weight loss" },
  { name: "Muscle building" },
  { name: "Detox" },
];

import React from "react";
import { Container, Box, Tabs, Tab, Typography } from "@mui/material";
import Ingredients from "./Ingredients/Ingredients";
import Meals from "./Meals/Meals";
import Diets from "./Diets/Diets";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Configurator() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <h1>Configurator</h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Ingredients" {...a11yProps(0)} />
            <Tab label="Meals" {...a11yProps(1)} />
            <Tab label="Diets" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Ingredients />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Meals />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Diets />
        </TabPanel>
      </Box>
    </Container>
  );
}

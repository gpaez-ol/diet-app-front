import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export function NavTabs() {
  return (
    <Box sx={{ width: "100%" }}>
      <Button title="Dashboard" href="/" color="primary">Dashboard</Button>
      <Button title="Browse" href="/browse" color="primary">Browse</Button>
    </Box>
  );
}

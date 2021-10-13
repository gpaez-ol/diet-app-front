import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { NavTabs } from "./Tabs";
import AccountMenu from "../../account/components/AccountMenu";
import { AccountMenuProps } from "../../../App";

export default function CustomAppBar(props: AccountMenuProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <NavTabs />
          {props.user.id !== "" ? (
            <AccountMenu {...props} />
          ) : (
            <Button color="primary" onClick={props.updateUser}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

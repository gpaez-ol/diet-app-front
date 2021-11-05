import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import NavTabs from "./Tabs";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { User } from "../../general/types/user";
import AccountMenu from "./AccountMenu";

function isUser(user: any): user is User {
  return user.avatar && user.firstName && user.lastName && user.type;
}

export default function CustomAppBar() {
  const browserHistory = useHistory();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (isUser(parsedUser)) {
        setUser(parsedUser);
      }
    }
  }, [setUser]);

  const handleOnLoginClick = () => {
    browserHistory.push("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <NavTabs userType={user?.type} />
          {user ? (
            <AccountMenu {...user} />
          ) : (
            <Button color="primary" onClick={handleOnLoginClick}>
              {user ? "Account" : "Login"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

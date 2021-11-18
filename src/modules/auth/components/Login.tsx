import { Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { User } from "../../general/types/user";
import { Routes } from "../../general/utils/routes";
import LoginForm from "./LoginForm";

export default function Login() {
  const browserHistory = useHistory();

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (!localStorageUser) {
      return;
    }
    const user = JSON.parse(localStorageUser) as User;
    if (user) {
      if (user.type === "Customer") {
        browserHistory.push(Routes.customerDashboard);
      } else {
        browserHistory.push(Routes.adminConfigurator);
      }
    }
  });

  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      <Container maxWidth="md">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <LoginForm />
            <div style={{ padding: 16 }}>
              <Typography textAlign="center">
                Don't have an account yet?
              </Typography>
              <Typography textAlign="center">
                Sign up <a href={Routes.signup}>here</a> or continue as a{" "}
                <a href={Routes.customerBrowse}>guest</a>.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

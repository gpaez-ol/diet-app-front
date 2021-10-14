import { Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router";
import LoginForm from "./LoginForm";

export default function Login() {
  const browserHistory = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      browserHistory.push("/");
    }
  });

  return (
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
        </Grid>
      </Grid>
    </Container>
  );
}

import { Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router";
import SignupForm from "./SignupForm";

export default function Signup() {
  const browserHistory = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      browserHistory.push("/");
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
            <SignupForm />
            <div style={{ padding: 16 }}>
              <Typography textAlign="center">
                Already have an account?
              </Typography>
              <Typography textAlign="center">
                Log in <a href="/login">here</a>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

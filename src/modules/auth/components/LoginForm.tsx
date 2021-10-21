import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { emailRegex } from "../utils/regex";
import { URLs } from "../../general/utils/urls";
import { useHistory } from "react-router";

export default function LoginForm() {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const browserHistory = useHistory();

  const validateEmail = (email: string) => {
    const isEmailValid = email.match(emailRegex);
    setEmail(isEmailValid ? email : undefined);
  };

  const validatePassword = (password: string) => {
    const isPasswordValid = password.length <= 24; // password.length >= 8 &&
    setPassword(isPasswordValid ? password : undefined);
  };

  const attemptLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    fetch(URLs.login, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "string") {
          alert("Error. Usuario inválido.");
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          browserHistory.push("/");
        }
      });
  };

  return (
    <Card>
      <CardContent sx={{ boxSizing: "border-box", width: 450 }}>
        <div style={{ marginBottom: "16px" }}>
          <Typography color="text.primary" variant="h5" textAlign="center">
            Welcome to AlgoFit!
          </Typography>
          <Typography
            color="text.secondary"
            variant="subtitle1"
            textAlign="center"
          >
            Please enter your credentials
          </Typography>
        </div>
        <TextField
          id="login-email-input"
          label="Email"
          variant="outlined"
          required
          type="email"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={email}
          onChange={(event) => validateEmail(event.target.value)}
        />
        <TextField
          id="login-password-input"
          label="Password"
          variant="outlined"
          required
          type="password"
          sx={{ width: "100%" }}
          value={password}
          onChange={(event) => validatePassword(event.target.value)}
        />
      </CardContent>
      <CardActions
        sx={{ justifyContent: "flex-end", padding: "0px 16px 16px 16px" }}
      >
        <Button
          size="large"
          variant="contained"
          disabled={!(email && password)}
          onClick={attemptLogin}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
}

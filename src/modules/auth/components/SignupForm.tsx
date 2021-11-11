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
import { Routes } from "../../general/utils/routes";

export default function SignupForm() {
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [confirmEmail, setConfirmEmail] = useState<string | undefined>(
    undefined
  );
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
    undefined
  );
  const browserHistory = useHistory();

  const validateEmail = (email: string) => {
    const isEmailValid = email.match(emailRegex);
    setEmail(isEmailValid ? email : undefined);
  };

  const validatePassword = (password: string) => {
    const isPasswordValid = password.length <= 24;
    setPassword(isPasswordValid ? password : undefined);
  };

  const attemptSignup = () => {
    if (email !== confirmEmail) {
      alert("Email doesn't match");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        email,
        confirmEmail,
        password,
        confirmPassword,
      }),
    };

    fetch(URLs.signup, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "string") {
          alert("Error. Usuario ya existe.");
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          if (data.type === "Customer") {
            browserHistory.push(Routes.customerDashboard);
          } else {
            browserHistory.push(Routes.adminConfigurator);
          }
        }
      })
      .catch(() => {
        alert("Error. Usuario ya existe.");
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
            You'll be ready in just a minute
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            id="signup-first-name-input"
            label="First name"
            variant="outlined"
            required
            type="text"
            sx={{
              width: "100%",
              marginBottom: "8px",
              boxSizing: "border-box",
              marginRight: "4px",
            }}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            id="signup-last-name-input"
            label="Last name"
            variant="outlined"
            required
            type="text"
            sx={{
              width: "100%",
              marginBottom: "8px",
              boxSizing: "border-box",
              marginLeft: "4px",
            }}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <TextField
          id="signup-phone-input"
          label="Phone"
          variant="outlined"
          required
          type="tel"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <TextField
          id="signup-email-input"
          label="Email"
          variant="outlined"
          required
          type="email"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={email}
          onChange={(event) => validateEmail(event.target.value)}
        />
        <TextField
          id="signup-confirm-email-input"
          label="Confirm email"
          variant="outlined"
          required
          type="email"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={confirmEmail}
          onChange={(event) => setConfirmEmail(event.target.value)}
        />
        <TextField
          id="signup-password-input"
          label="Password"
          variant="outlined"
          required
          type="password"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={password}
          onChange={(event) => validatePassword(event.target.value)}
        />
        <TextField
          id="signup-confirm-password-input"
          label="Confirm password"
          variant="outlined"
          required
          type="password"
          sx={{ width: "100%" }}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </CardContent>
      <CardActions
        sx={{ justifyContent: "flex-end", padding: "0px 16px 16px 16px" }}
      >
        <Button
          size="large"
          variant="contained"
          disabled={
            !(
              email &&
              confirmEmail &&
              password &&
              confirmPassword &&
              firstName &&
              lastName &&
              phone
            )
          }
          onClick={attemptSignup}
        >
          Signup
        </Button>
      </CardActions>
    </Card>
  );
}

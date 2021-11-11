import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { URLs } from "../../general/utils/urls";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface AddBiometricProps {
  close: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddBiometric(props: AddBiometricProps) {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [fatIndex, setFatIndex] = useState<number>(0);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const addBiometric = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({weight, height, fatIndex})
    };
    let userId = JSON.parse(localStorage.getItem("user")!).id;

    fetch(`${URLs.biometric}/${userId}`, requestOptions)
      .then((response) => {
        if(response.ok) {
          props.close();
        } else {
          setErrorOpen(true);
        }
      });
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ boxSizing: "border-box" }}>
        <div style={{ marginBottom: "16px" }}>
          <Typography color="text.primary" variant="h5" textAlign="center">
            Add Biometric
          </Typography>
        </div>
        <TextField
          id="login-email-input"
          label="Weight"
          variant="outlined"
          required
          type="number"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value || '0'))}
        />
        <TextField
          id="login-password-input"
          label="Height"
          variant="outlined"
          required
          type="number"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value || '0'))}
        />
        <TextField
          id="login-password-input"
          label="Fat Index"
          variant="outlined"
          required
          type="number"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={fatIndex}
          onChange={(e) => setFatIndex(parseInt(e.target.value || '0'))}
        />
      </CardContent>
      <CardActions
        sx={{ justifyContent: "flex-end", padding: "0px 16px 16px 16px" }}
      >
        <Button
          size="large"
          variant="contained"
          disabled={!(weight && height && fatIndex)}
          onClick={addBiometric}
        >
          Add
        </Button>
      </CardActions>
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
          Hubo un error :( Por favor intentalo de nuevo
        </Alert>
      </Snackbar>
    </Card>
  );
}

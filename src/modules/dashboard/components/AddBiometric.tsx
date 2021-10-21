import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { URLs } from "../../general/utils/urls";

export default function AddBiometric() {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [fatIndex, setFatIndex] = useState<number>(0);

  const addBiometric = () => {
    /*const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({weight, height, fatIndex}),
    };
    let userId = JSON.parse(localStorage.getItem("user")!).id;

    fetch(`${URLs.biometric}/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
    });*/
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
          onChange={(e) => setWeight(parseInt(e.target.value))}
        />
        <TextField
          id="login-password-input"
          label="Height"
          variant="outlined"
          required
          type="number"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
        <TextField
          id="login-password-input"
          label="Fat Index"
          variant="outlined"
          required
          type="number"
          sx={{ width: "100%", marginBottom: "8px", boxSizing: "border-box" }}
          value={fatIndex}
          onChange={(e) => setFatIndex(parseInt(e.target.value))}
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
    </Card>
  );
}

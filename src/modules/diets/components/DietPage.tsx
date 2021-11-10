import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Diet from "../../general/interfaces/Diet";
import { URLs } from "../../general/utils/urls";

export default function DietPage() {
  const dietId = useLocation().pathname.split("/")[2];

  const [diet, setDiet] = useState<Diet>();

  useEffect(() => {
    fetch(URLs.diet + `/${dietId}`)
      .then((response) => response.json())
      .then((data) => {
        data.id = dietId;
        setDiet(data);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <CardMedia component="img" height="194" image={diet?.imageRef} />
      <Typography variant="h2" component="div">
        {diet?.name}
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          {diet?.categories.map((category) => {
            return (
              <Chip
                key={category.id}
                label={category.name}
                variant="outlined"
              />
            );
          })}
        </Stack>
      </Box>

      <Typography variant="body1" gutterBottom>
        {diet?.description}
      </Typography>
      <Typography variant="h4" gutterBottom component="div">
        Diet meals
      </Typography>
    </Container>
  );
}

import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Diet from "../../general/interfaces/Diet";
import { URLs } from "../../general/utils/urls";
import { Category } from "../../general/types/Category";

export default function DietPage() {
  const dietId = useLocation().pathname.split("/")[2];

  const [diet, setDiet] = useState<Diet>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchAPI() {
      let response = await fetch(URLs.diet + `/${dietId}`);
      let data = await response.json();
      data.id = dietId;
      setDiet(data);
      let catArr: Category[] = [];
      for (const categoryId of data.categories) {
        const response = await fetch(URLs.category + `/${categoryId}`);
        const data = await response.json();
        catArr.push(data);
      }
      setCategories(catArr);
    }
    fetchAPI();
  }, []);

  return (
    <Container maxWidth="xl">
      <CardMedia component="img" height="194" image={diet?.imageRef} />
      <Typography variant="h2" gutterBottom component="div">
        {diet?.name}
      </Typography>
      <Stack direction="row" spacing={1}>
        {categories.map((category) => {
          return <Chip label={category.name} variant="outlined" />;
        })}
      </Stack>
      <Typography variant="body1" gutterBottom>
        {diet?.description}
      </Typography>
    </Container>
  );
}

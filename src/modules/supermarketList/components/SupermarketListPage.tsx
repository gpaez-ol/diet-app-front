import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CardMedia, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { URLs } from "../../general/utils/urls";
import { User } from "../../general/types/user";
import SupermarketIngredient from "../interfaces/SupermarketIngredient";
import IngredientCard from "./IngredientCard";

function isUser(user: any): user is User {
  return user.avatar && user.firstName && user.lastName && user.type;
}

export default function SupermarketListPage() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [ingredients, setIngredients] = useState<SupermarketIngredient[]>();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (isUser(parsedUser)) {
        fetch(URLs.user + `/${parsedUser.id}`)
          .then((response) => response.json())
          .then((data) => {
            data.id = parsedUser.id;
            setUser(data);
            fetch(URLs.supermarketList + `/${data.id}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setIngredients(data);
              });
          });
      }
    }
  }, [setUser]);

  return (
    <Container maxWidth="xl">
      <CardMedia
        component="img"
        height="194"
        image="https://theplanetapp.com/wp-content/uploads/2020/09/sustainable-supermarket-theplanetapp-scaled.jpg"
      />
      <Typography variant="h2" component="div">
        Supermarket list
      </Typography>
      <Typography variant="body1" gutterBottom>
        Buy these ingredients for your meals this week!
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            {ingredients?.map((ingredient) => {
              return (
                <Grid key={ingredient.id} item xs={12} sm={4} md={3}>
                  <IngredientCard {...ingredient} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </Container>
  );
}

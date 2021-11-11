import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Diet from "../../general/interfaces/Diet";
import { URLs } from "../../general/utils/urls";
import { User } from "../../general/types/user";
import MealCard from "./MealCard";
import MealInfoCard from "./MealInfoCard";

function isUser(user: any): user is User {
  return user.avatar && user.firstName && user.lastName && user.type;
}

export default function DietPage() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (isUser(parsedUser)) {
        fetch(URLs.user + `/${parsedUser.id}`)
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
          });
      }
    }
  }, [setUser]);

  const handleAddDietClick = () => {
    let localUser: User = user!;
    localUser.dietId = diet!.id;
    fetch(URLs.diet + `/${diet!.id}/user/${user?.id}`, {
      method: "PUT",
    });
    setUser({ ...localUser });
  };

  const getAddDietButton = () => {
    if (user !== undefined) {
      if (user.dietId !== diet?.id) {
        return (
          <Button size="small" color="secondary" onClick={handleAddDietClick}>
            Add to "My Diet"
          </Button>
        );
      } else {
        return (
          <Button variant="contained" color="success">
            This is your Diet!
          </Button>
        );
      }
    } else {
      return (
        <Tooltip title={"Log in to add a diet"} arrow>
          <span>
            <Button disabled>Add to "My Diet"</Button>
          </span>
        </Tooltip>
      );
    }
  };

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeMealId, setActiveMealId] = useState<string>("");

  const handleDialogOpen = (mealId: string) => {
    setIsDialogOpen(true);
    setActiveMealId(mealId);
  };

  return (
    <>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <MealInfoCard {...{ mealId: activeMealId }} />
      </Dialog>
      <Container maxWidth="xl">
        <CardMedia component="img" height="194" image={diet?.imageRef} />
        <Box sx={{ mb: 1, mt: 1 }}>{getAddDietButton()}</Box>

        <Typography variant="h2" component="div">
          {diet?.name}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1}>
            {diet?.categories.map((category) => {
              return (
                <Tooltip key={category.id} title={category.description} arrow>
                  <Chip label={category.name} variant="outlined" />
                </Tooltip>
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              {diet?.meals.map((meal, index) => {
                return (
                  <Grid key={index} item xs={12} sm={4} md={3}>
                    <div onClick={() => handleDialogOpen(meal.id)}>
                      <MealCard {...meal} />
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      </Container>
    </>
  );
}

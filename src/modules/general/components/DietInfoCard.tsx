import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Diet from "../../general/interfaces/Diet";
import MealsList from "./MealsList";
import { Routes } from "../../general/utils/routes";
import { User } from "../../general/types/user";
import { URLs } from "../../general/utils/urls";

function isUser(user: any): user is User {
  return user.avatar && user.firstName && user.lastName && user.type;
}

export default function DietInfoCard(diet: Diet) {
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
    localUser.dietId = diet.id;
    fetch(URLs.diet + `/${diet.id}/user/${user?.id}`, {
      method: "PUT",
    });
    setUser({ ...localUser });
    localStorage.setItem("user", JSON.stringify(localUser));
  };

  const getAddDietButton = () => {
    if (user !== undefined) {
      if (user.dietId !== diet.id) {
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

  return (
    <Card style={{ overflow: "auto" }}>
      <CardMedia component="img" height="140" image={diet.imageRef} />
      <CardContent>
        <Stack spacing={2} direction="row">
          <Button size="small" href={Routes.diets + `/${diet.id}`}>
            View more
          </Button>
          {getAddDietButton()}
        </Stack>

        <Typography gutterBottom variant="h4" component="div">
          {diet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {diet.description}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" component="div">
            Diet categories
          </Typography>
          <Stack direction="row" spacing={1}>
            {diet.categories.map((category) => {
              return (
                <Tooltip key={category.id} title={category.description} arrow>
                  <Chip label={category.name} variant="outlined" />
                </Tooltip>
              );
            })}
          </Stack>
        </Box>
        <Typography variant="h6" component="div">
          Meals in this diet
        </Typography>
        <MealsList {...diet} />
      </CardContent>
    </Card>
  );
}

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SupermarketIngredient from "../interfaces/SupermarketIngredient";

export default function IngredientCard(ingredient: SupermarketIngredient) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{ margin: "10px" }}>
      <CardHeader title={ingredient.name} />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Buy {ingredient.amount}
        </Typography>
      </CardContent>
    </Card>
  );
}

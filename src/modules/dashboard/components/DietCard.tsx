import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Diet } from './Dashboard';

export default function DietCard(diet: Diet) {

  return (
    <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{margin: '10px'}}>
      <CardHeader
        title={diet.title}
      />
      <CardMedia
        component="img"
        height="150"
        image="/static/images/cards/paella.jpg"
        alt={diet.img}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {diet.text}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
import React from 'react';
// Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
// Types
import { Character } from './DietsList';


type Props = {
  character: Character;
};

const CharacterCard: React.FC<Props> = ({ character }) => {

  return (
    <Card >
      <CardMedia  image={character.img_url} />
      <CardContent>
        <Typography gutterBottom variant='h5'>
          Name: {character.name}
        </Typography>
        <Typography gutterBottom color='textSecondary'>
          Hair: {character.hair}
          <br />
          Origin: {character.origin}
          <br />
          Species: {character.species}
          <br />
          Status: {character.status}
          <br />
          Alias:
          <br />
        </Typography>
        {character.alias.map((alias: any) => (
          <Chip key={alias} style={{ margin: 3 }} size='small' label={alias} />
        ))}
        <Typography color='textSecondary'>Abilities:</Typography>
        {character.abilities.map((ability: any) => (
          <Chip
            key={ability}
            style={{ margin: 3 }}
            size='small'
            label={ability}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CharacterCard;

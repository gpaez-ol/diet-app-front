import { Container } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DietCard from "./DietCard";
import Slider from './Slider';
import { DietsListProps } from "./Types";
import CharacterCard from './CharacterCard';

 // Types
 export type Character = {
  abilities: string[];
  alias: string[];
  gender: string;
  hair: string;
  id: number;
  img_url: string;
  name: string;
  origin: string;
  species: string;
  status: string;
};

export default function DietsList(props: DietsListProps) {
  const SliderProps = {
    zoomFactor: 30, // How much the image should zoom on hover in percent
    slideMargin: 10, // Margin on each side of slides
    maxVisibleSlides: 5,
    pageTransition: 500 // Transition when flipping pages
  };

 

const [data, setData] = useState<Character[]>([]);

const [isDialogOpen, setIsDialogOpen] = useState(false);
const [activeCharacter, setActiveCharacter] = useState<Character>(
  {} as Character
);

const handleDialogOpen = (character: Character) => {
  setIsDialogOpen(true);
  setActiveCharacter(character);
};

useEffect(() => {
  const getData = async () => {
    const data = await (
      await fetch('https://finalspaceapi.com/api/v0/character/')
    ).json();
    setData(data);
  };

  getData();
}, []);
  
  if (data.length < 1) return <div>Loading ...</div>;
  return (
    <Container>
      <h2>{props.categoryName}</h2>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <CharacterCard character={activeCharacter} />
      </Dialog>
      <Slider {...SliderProps}>
        {data.map(character => (
          <div key={character.id} onClick={() => handleDialogOpen(character)}>
            <img src={character.img_url} alt='character' />
          </div>
        ))}
      </Slider>
    </Container>
  );
}

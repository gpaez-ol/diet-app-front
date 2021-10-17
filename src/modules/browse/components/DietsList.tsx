import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Slider from "./Slider";
import CharacterCard from "./CharacterCard";
import DietCategory from "./interfaces/DietCategory";
import DietCard from "../../general/components/DietCard";
import Diet from "../../general/interfaces/Diet";

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

export default function DietsList(props: DietCategory) {
  const SliderProps = {
    zoomFactor: 30, // How much the image should zoom on hover in percent
    slideMargin: 10, // Margin on each side of slides
    maxVisibleSlides: 5,
    pageTransition: 500, // Transition when flipping pages
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
        await fetch("https://finalspaceapi.com/api/v0/character/")
      ).json();
      setData(data);
    };

    getData();
  }, []);

  if (data.length < 1) return <div>Loading ...</div>;

  const diets: Diet[] = [
    { name: "diet1", description: "desc1" },
    { name: "diet2", description: "desc1" },
    { name: "diet3", description: "desc1" },
    { name: "diet4", description: "desc1" },
    { name: "diet5", description: "desc1" },
    { name: "diet6", description: "desc1" },
    { name: "diet7", description: "desc1" },
    { name: "diet8", description: "desc1" },
    { name: "diet9", description: "desc1" },
    { name: "diet10", description: "desc1" },
  ];

  return (
    <Container>
      <h2>{props.name}</h2>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <CharacterCard character={activeCharacter} />
      </Dialog>
      <Slider {...SliderProps}>
        {diets.map((diet) => (
          <DietCard {...diet} />
        ))}
      </Slider>
    </Container>
  );
}
